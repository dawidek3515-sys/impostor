// Sterowanie grą: przejścia między ekranami, akcje z przycisków, timer, przytrzymanie karty.
import { S, zapiszStan, pkt, wolnyKolor, MIN_GRACZY, MAX_GRACZY } from './stan.js';
import * as E from './ekrany.js';
import * as dane from './dane.js';
import { tryb } from './tryby/index.js';
import { nowaRunda, punktuj } from './runda.js';
import { odblokujDzwiek, alarm } from './dzwiek.js';

const app = document.getElementById('app');
const EKRANY = {
  gracze: E.gracze, ustawienia: E.ustawienia, nasze: E.nasze,
  rozdanie: E.rozdanie, gra: E.gra, odslona: E.odslona, wynik: E.wynik,
  tabela: E.tabela, zwyciezca: E.zwyciezca,
};
const WYMAGA_RUNDY = ['rozdanie', 'gra', 'odslona', 'wynik'];

/* ---------- render ---------- */

function render(zachowajPrzewiniecie = false) {
  const y = window.scrollY;
  if (WYMAGA_RUNDY.includes(S.ekran) && !S.runda) S.ekran = 'gracze';
  app.innerHTML = S.ladowanie || S.blad ? E.ladowanie() : EKRANY[S.ekran]();
  window.scrollTo(0, zachowajPrzewiniecie ? y : 0);
}

function idz(ekran) {
  if (S.ekran === 'gra' && ekran !== 'gra') { zatrzymajZegar(); zwolnijEkran(); }
  if (ekran === 'zwyciezca') { S.gra.trwa = false; zapiszStan(); }
  if (ekran !== 'nasze') { S.importuj = false; S.eksportTekst = null; }
  S.ekran = ekran;
  render();
}

let toastTimer;
function toast(tekst) {
  const el = document.getElementById('toast');
  el.textContent = tekst;
  el.classList.add('widoczny');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('widoczny'), 2800);
}

/* ---------- runda ---------- */

const pule = () => ({
  losujHaslo: () => dane.losujHaslo(S.ust),
  losujPare: dane.losujPare,
  losujPytania: dane.losujPytania,
});

function rozpocznijRunde() {
  const n = S.gracze.length;
  if (n < MIN_GRACZY) return;
  // ktoś już dobił do celu (np. po korekcie albo zmianie celu w ustawieniach) — koniec gry
  if (S.gra.nrRundy > 0 && E.zwyciezcy().length) return idz('zwyciezca');
  // 1. runda: losowo, potem po kolei — każdy po razie zaczyna
  const startujacy = S.gra.nrRundy === 0 ? Math.floor(Math.random() * n) : (S.gra.startujacy + 1) % n;
  const runda = nowaRunda({ tryb: tryb(S.ust.tryb), ust: S.ust, pule: pule(), n, startujacy });
  if (!runda) { toast('Brak haseł — włącz jakąś kategorię.'); return; }
  if (runda.dane.wyczerpane) toast('Wszystkie hasła już były — tasujemy od nowa 🔄');

  S.gra = { trwa: true, nrRundy: S.gra.nrRundy + 1, startujacy };
  zapiszStan();
  Object.assign(S, { runda, odkryty: 0, widzial: false, wybory: {}, delta: {}, pokazPytanie: false });
  idz('rozdanie');
}

function nowaGra() {
  if (S.gra.trwa && !confirm('Zacząć nową grę? Punkty wszystkich graczy zostaną wyzerowane.')) return;
  S.punkty = {};
  S.gra = { trwa: false, nrRundy: 0, startujacy: 0 };
  rozpocznijRunde();
}

function rozlicz(delta) {
  if (S.runda.rozliczona) return;
  S.runda.rozliczona = true;
  for (const [imie, ile] of Object.entries(delta)) S.punkty[imie] = pkt(imie) + ile;
  S.delta = delta;
  zapiszStan();
  idz('tabela');
}

/* ---------- zegar ---------- */

let tik = null;

function startZegara() {
  const sekundy = S.ust.timer * 60;
  S.zegar = { pozostalo: sekundy, koniec: Date.now() + sekundy * 1000, pauza: false, skonczony: false };
  clearInterval(tik);
  if (sekundy) tik = setInterval(tykniecie, 250);
}

function zatrzymajZegar() {
  clearInterval(tik);
  tik = null;
}

function tykniecie() {
  const z = S.zegar;
  if (!z || z.pauza || z.skonczony) return;
  const pozostalo = Math.max(0, Math.ceil((z.koniec - Date.now()) / 1000));
  if (pozostalo === z.pozostalo) return;
  z.pozostalo = pozostalo;
  if (pozostalo === 0) {
    z.skonczony = true;
    zatrzymajZegar();
    alarm();
    document.body.classList.add('miganie');
    setTimeout(() => document.body.classList.remove('miganie'), 2600);
    render(true);
    return;
  }
  // co sekundę zmieniamy tylko liczby — pełny render zgubiłby trwające dotknięcie przycisku
  const calosc = S.ust.timer * 60;
  app.querySelector('[data-zegar]')?.replaceChildren(E.fmt(pozostalo));
  const piasek = app.querySelector('[data-piasek]');
  if (piasek) piasek.style.width = `${(pozostalo / calosc) * 100}%`;
}

// ekran nie gaśnie w trakcie dyskusji (jeśli przeglądarka pozwala)
let blokadaEkranu = null;
async function trzymajEkran() {
  try { blokadaEkranu = await navigator.wakeLock?.request('screen'); } catch { blokadaEkranu = null; }
}
function zwolnijEkran() {
  blokadaEkranu?.release().catch(() => {});
  blokadaEkranu = null;
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && S.ekran === 'gra') trzymajEkran();
});

/* ---------- akcje ---------- */

const AKCJE = {
  idz: d => idz(d.e),
  ponowLadowanie: () => start(),

  usunGracza: d => {
    S.gracze.splice(Number(d.i), 1);
    S.runda = null;
    zapiszStan();
    render(true);
  },

  ustaw: d => {
    S.ust[d.k] = ['timer', 'cel'].includes(d.k) ? Number(d.v) : d.v;
    zapiszStan();
    render(true);
  },
  modyfikator: d => {
    S.ust.mody[d.k] = !S.ust.mody[d.k];
    zapiszStan();
    render(true);
  },
  kategoria: d => {
    const kat = dane.kategorie().find(k => k.id === d.id);
    S.ust.kat[d.id] = !dane.czyWlaczona(kat, S.ust);
    zapiszStan();
    render(true);
  },

  usunNasze: d => { dane.usunNasze(Number(d.i)); render(true); },
  pokazImport: () => { S.importuj = !S.importuj; S.eksportTekst = null; render(true); },
  eksport: async () => {
    const tekst = dane.eksportNasze();
    try {
      await navigator.clipboard.writeText(tekst);
      toast('Skopiowano! Wklej w notatce albo w pliku.');
    } catch {
      S.eksportTekst = tekst;
      render(true);
      toast('Zaznacz tekst poniżej i skopiuj ręcznie.');
    }
  },

  nowaGra,
  nastepnaRunda: rozpocznijRunde,
  przerwij: () => {
    if (!confirm('Przerwać rundę? Nikt nie dostanie punktów.')) return;
    S.runda = null;
    S.gra.nrRundy = Math.max(0, S.gra.nrRundy - 1);
    zapiszStan();
    idz(S.gra.nrRundy ? 'tabela' : 'gracze');
  },

  dalejRozdanie: () => {
    if (S.odkryty < S.gracze.length - 1) {
      S.odkryty++;
      S.widzial = false;
      render();
    } else {
      startZegara();
      trzymajEkran();
      idz('gra');
    }
  },

  pauza: () => {
    const z = S.zegar;
    if (z.pauza) z.koniec = Date.now() + z.pozostalo * 1000;
    z.pauza = !z.pauza;
    render(true);
  },
  pokazPytanie: () => { S.pokazPytanie = true; render(true); },
  kolejnaTura: () => {
    // to samo hasło i ten sam impostor, zaczyna następna osoba przy stole, timer od nowa
    S.runda.tura++;
    S.runda.startTury = (S.runda.startTury + 1) % S.gracze.length;
    startZegara();
    render();
    toast(`Tura ${S.runda.tura} — to samo hasło, jeszcze raz dookoła stołu`);
  },
  odslon: () => idz('odslona'),

  rozliczChaos: () => rozlicz(punktuj(S.runda, {}, S.gracze)),
  wynik: d => {
    S.wybory[Number(d.imp)] = d.w;
    render(true);
    if (S.runda.impostorzy.every(i => S.wybory[i])) setTimeout(() => rozlicz(punktuj(S.runda, S.wybory, S.gracze)), 300);
  },
  korekta: d => {
    const imie = S.gracze[Number(d.i)].imie;
    S.punkty[imie] = Math.max(0, pkt(imie) + Number(d.d));
    zapiszStan();
    render(true);
  },
};

app.addEventListener('click', e => {
  const przycisk = e.target.closest('[data-a]');
  if (przycisk && !przycisk.disabled) AKCJE[przycisk.dataset.a]?.(przycisk.dataset);
});

/* ---------- formularze ---------- */

const FORMULARZE = {
  gracz: f => {
    const imie = f.imie.value.trim().replace(/\s+/g, ' ');
    if (!imie) return;
    if (S.gracze.length >= MAX_GRACZY) return toast(`Maksymalnie ${MAX_GRACZY} graczy.`);
    if (S.gracze.some(g => g.imie.toLowerCase() === imie.toLowerCase())) return toast('Ktoś o tym imieniu już siedzi przy stole.');
    S.gracze.push({ imie, kolor: wolnyKolor() });
    S.runda = null;
    zapiszStan();
    render(true);
    app.querySelector('input[name="imie"]')?.focus();
  },
  nasze: f => {
    const blad = dane.dodajNasze({ haslo: f.haslo.value, kategoria: f.kategoria.value, skojarzenie: f.skojarzenie.value });
    if (blad) return toast(blad);
    toast('Dodano!');
    render(true);
    app.querySelector('input[name="haslo"]')?.focus();
  },
  import: f => {
    try {
      const ile = dane.importNasze(f.json.value);
      S.importuj = false;
      render(true);
      toast(`Dodano nowych haseł: ${ile}`);
    } catch {
      toast('To nie wygląda na wyeksportowaną listę haseł.');
    }
  },
};

app.addEventListener('submit', e => {
  e.preventDefault();
  FORMULARZE[e.target.dataset.form]?.(e.target);
});

/* ---------- przytrzymanie karty: palec na klapce = podgląd, puszczenie = zasłonięcie ---------- */

app.addEventListener('pointerdown', e => {
  odblokujDzwiek();
  const klapka = e.target.closest('[data-hold]');
  if (!klapka) return;
  klapka.setPointerCapture?.(e.pointerId);
  klapka.classList.add('held');
  if (!S.widzial) {
    S.widzial = true;
    const dalej = app.querySelector('[data-a="dalejRozdanie"]');
    if (dalej) dalej.disabled = false;
  }
});
const zaslon = () => app.querySelectorAll('.held').forEach(el => el.classList.remove('held'));
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => app.addEventListener(t, zaslon));
window.addEventListener('blur', zaslon);
app.addEventListener('contextmenu', e => { if (e.target.closest('[data-hold]')) e.preventDefault(); });

/* ---------- start ---------- */

async function start() {
  S.ladowanie = true;
  S.blad = null;
  render();
  try {
    await dane.zaladuj();
  } catch (blad) {
    console.error(blad);
    S.blad = blad;
  }
  S.ladowanie = false;
  render();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

start();
