// Baza haseł: wczytanie plików z dane/, własne hasła „Nasze” i losowanie bez powtórzeń.
import { wczytaj, zapisz } from './magazyn.js';

let wbudowane = [];   // [{ id, nazwa, ikona, dorosle, hasla: [{ haslo, skojarzenia }] }]
let pary = [];        // undercover: [{ a, b }]
let pytania = [];     // [{ gracze, impostor }]
let nasze = wczytaj('nasze', []);   // [{ haslo, kategoria, skojarzenie }]
const historia = { hasla: [], pary: [], pytania: [], ...wczytaj('historia', {}) };

const pobierz = async sciezka => {
  const odp = await fetch(sciezka);
  if (!odp.ok) throw new Error(`${sciezka}: ${odp.status}`);
  return odp.json();
};

export async function zaladuj() {
  const indeks = await pobierz('dane/hasla/index.json');
  wbudowane = await Promise.all(indeks.kategorie.map(async id => ({ id, ...(await pobierz(`dane/hasla/${id}.json`)) })));
  [pary, pytania] = await Promise.all([pobierz('dane/undercover.json'), pobierz('dane/pytania.json')]);
}

/* ---------- kategorie ---------- */

export const ID_NASZE = 'nasze';

export function kategorie() {
  const naszeKat = {
    id: ID_NASZE, nazwa: 'Nasze', ikona: '💬', dorosle: false,
    hasla: nasze.map(n => ({ haslo: n.haslo, skojarzenia: n.skojarzenie ? [n.skojarzenie] : [], kategoria: n.kategoria || 'Nasze' })),
  };
  return [...wbudowane, naszeKat];
}

export const czyWlaczona = (kat, ust) => ust.kat[kat.id] ?? !kat.dorosle;

/* ---------- losowanie bez powtórzeń ---------- */

const los = tablica => tablica[Math.floor(Math.random() * tablica.length)];

// Bierze element, którego nie ma jeszcze w historii. Gdy pula się wyczerpie — czyści jej historię i zaczyna od nowa.
function losujZPuli(pula, klucz, rodzaj) {
  if (!pula.length) return null;
  const uzyte = new Set(historia[rodzaj]);
  let wolne = pula.filter(x => !uzyte.has(klucz(x)));
  let wyczerpane = false;
  if (!wolne.length) {
    const kluczePuli = new Set(pula.map(klucz));
    historia[rodzaj] = historia[rodzaj].filter(k => !kluczePuli.has(k));
    wolne = pula;
    wyczerpane = true;
  }
  const wybrany = los(wolne);
  historia[rodzaj].push(klucz(wybrany));
  zapisz('historia', historia);
  return { ...wybrany, wyczerpane };
}

export function losujHaslo(ust) {
  const pula = kategorie()
    .filter(k => czyWlaczona(k, ust))
    .flatMap(k => k.hasla.map(h => ({ ...h, kategoria: h.kategoria || k.nazwa, katId: k.id })));
  return losujZPuli(pula, h => `${h.katId}|${h.haslo}`, 'hasla');
}

export const losujPare = () => losujZPuli(pary, p => `${p.a}|${p.b}`, 'pary');
export const losujPytania = () => losujZPuli(pytania, p => p.gracze, 'pytania');

/* ---------- własne hasła „Nasze” ---------- */

export const naszeHasla = () => nasze;
export const nazwyKategorii = () => wbudowane.map(k => k.nazwa);

const normalizuj = s => String(s ?? '').trim().replace(/\s+/g, ' ');

export function dodajNasze({ haslo, kategoria, skojarzenie }) {
  haslo = normalizuj(haslo);
  if (!haslo) return 'Wpisz hasło.';
  if (nasze.some(n => n.haslo.toLowerCase() === haslo.toLowerCase())) return 'To hasło już jest na liście.';
  nasze.push({ haslo, kategoria: normalizuj(kategoria), skojarzenie: normalizuj(skojarzenie) });
  zapisz('nasze', nasze);
  return null;
}

export function usunNasze(indeks) {
  nasze.splice(indeks, 1);
  zapisz('nasze', nasze);
}

// Eksport w formacie pliku kategorii — można go wkleić jako nowy plik w dane/hasla/.
export function eksportNasze() {
  return JSON.stringify({
    nazwa: 'Nasze',
    ikona: '💬',
    dorosle: false,
    hasla: nasze.map(n => ({ haslo: n.haslo, ...(n.kategoria ? { kategoria: n.kategoria } : {}), skojarzenia: n.skojarzenie ? [n.skojarzenie] : [] })),
  }, null, 2);
}

// Przyjmuje JSON z eksportu (albo samą tablicę haseł). Zwraca liczbę dodanych haseł.
export function importNasze(tekst) {
  const dane = JSON.parse(tekst);
  const lista = Array.isArray(dane) ? dane : dane.hasla;
  if (!Array.isArray(lista)) throw new Error('Brak listy haseł');
  let dodane = 0;
  for (const h of lista) {
    const blad = dodajNasze({
      haslo: typeof h === 'string' ? h : h.haslo,
      kategoria: h.kategoria,
      skojarzenie: h.skojarzenie ?? h.skojarzenia?.[0],
    });
    if (!blad) dodane++;
  }
  return dodane;
}
