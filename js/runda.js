// Tworzenie rundy (tryb + modyfikatory) i punktacja.
import { MODY } from './modyfikatory/index.js';

export const WYNIKI = {
  zlapany: { ikona: '🎯', nazwa: 'Złapany', punkty: '+1 dla każdego gracza', opis: 'Złapaliście impostora' },
  przetrwal: { ikona: '😎', nazwa: 'Przetrwał', punkty: '+2 dla impostora', opis: 'Impostor przetrwał głosowanie' },
  zgadl: { ikona: '🧠', nazwa: 'Zgadł hasło', punkty: '+2 dla impostora', opis: 'Złapany, ale w ostatniej szansie zgadł hasło' },
};

export function nowaRunda({ tryb, ust, pule, n, startujacy }) {
  const dane = tryb.losuj(pule, ust);
  if (!dane) return null;
  const runda = {
    tryb: tryb.id,
    dane,
    impostorzy: [Math.floor(Math.random() * n)],
    chaos: null,          // null | 'brak' | 'wszyscy'
    startujacy,
    tura: 1,
    startTury: startujacy,
    rozliczona: false,
  };
  for (const mod of MODY) if (ust.mody[mod.id]) mod.zastosuj(runda, { n, tryb, ust });
  return runda;
}

// Zwraca { imie: zdobyte punkty }.
export function punktuj(runda, wybory, gracze) {
  const delta = {};
  const dodaj = (imie, ile) => { delta[imie] = (delta[imie] ?? 0) + ile; };
  if (runda.chaos) {
    gracze.forEach(g => dodaj(g.imie, 1));   // +1 dla każdego za przetrwanie chaosu
    return delta;
  }
  for (const i of runda.impostorzy) {
    if (wybory[i] === 'zlapany') {
      gracze.forEach((g, j) => { if (!runda.impostorzy.includes(j)) dodaj(g.imie, 1); });
    } else {
      dodaj(gracze[i].imie, 2);   // przetrwał albo zgadł hasło
    }
  }
  return delta;
}
