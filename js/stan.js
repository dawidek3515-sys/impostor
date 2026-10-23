// Cały stan gry w jednym obiekcie. Trwałe części (gracze, punkty, ustawienia, przebieg gry)
// zapisujemy w localStorage, chwilowe (bieżąca runda, zegar) żyją tylko w pamięci.
import { wczytaj, zapisz } from './magazyn.js';

export const KOLORY = ['#ff5a5f', '#ffb400', '#00c2a8', '#9d8bff', '#ff7ab6', '#4db5ff', '#8bc34a', '#ff8a3d'];
export const MIN_GRACZY = 3;
export const MAX_GRACZY = 8;

const DOMYSLNE_USTAWIENIA = {
  tryb: 'klasyczny',
  trudnosc: 'normalny',
  mody: { dwoch: false, chaos: false },
  timer: 2,   // minuty, 0 = bez timera
  cel: 10,    // punkty, 0 = bez końca
  kat: {},    // id kategorii -> true/false; brak wpisu = domyślnie (18+ wyłączone)
};

const ust = wczytaj('ustawienia', {});

export const S = {
  gracze: wczytaj('gracze', []),          // [{ imie, kolor }]
  punkty: wczytaj('punkty', {}),          // imie -> punkty
  ust: { ...DOMYSLNE_USTAWIENIA, ...ust, mody: { ...DOMYSLNE_USTAWIENIA.mody, ...ust.mody }, kat: { ...ust.kat } },
  gra: { trwa: false, nrRundy: 0, startujacy: 0, ...wczytaj('gra', {}) },

  // chwilowe
  ekran: 'gracze',
  ladowanie: true,
  blad: null,
  runda: null,
  odkryty: 0,          // indeks gracza, który teraz ogląda swoją rolę
  widzial: false,      // czy obecny gracz już przytrzymał kartę
  wybory: {},          // indeks impostora -> wynik („Co się stało?”)
  delta: {},           // imie -> punkty zdobyte w ostatniej rundzie
  zegar: null,         // { pozostalo, koniec, pauza, skonczony }
  pokazPytanie: false,
  importuj: false,
  eksportTekst: null,
};

export function zapiszStan() {
  zapisz('gracze', S.gracze);
  zapisz('punkty', S.punkty);
  zapisz('ustawienia', S.ust);
  zapisz('gra', S.gra);
}

export const pkt = imie => S.punkty[imie] ?? 0;

export function wolnyKolor() {
  const zajete = new Set(S.gracze.map(g => g.kolor));
  return KOLORY.find(k => !zajete.has(k)) ?? KOLORY[S.gracze.length % KOLORY.length];
}
