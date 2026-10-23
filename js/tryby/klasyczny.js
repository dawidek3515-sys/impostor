// Tryb Klasyczny: gracze widzą hasło, impostor wie, kim jest, i dostaje wskazówkę.
const TRUDNOSCI = [
  { v: 'latwy', n: 'Łatwy', d: 'Impostor widzi kategorię i jedno skojarzenie.' },
  { v: 'normalny', n: 'Normalny', d: 'Impostor widzi jedno skojarzenie.' },
  { v: 'trudny', n: 'Trudny', d: 'Impostor widzi tylko kategorię.' },
  { v: 'hardcore', n: 'Hardcore', d: 'Impostor nie dostaje żadnej wskazówki.' },
];

function wskazowka(haslo, trudnosc) {
  const sk = haslo.skojarzenia?.length ? haslo.skojarzenia[Math.floor(Math.random() * haslo.skojarzenia.length)] : null;
  const kat = `Kategoria: ${haslo.kategoria}`;
  if (trudnosc === 'latwy') return sk ? `${kat} · skojarzenie: ${sk}` : kat;
  if (trudnosc === 'normalny') return sk ? `Skojarzenie: ${sk}` : kat;
  if (trudnosc === 'trudny') return kat;
  return null;
}

export default {
  id: 'klasyczny',
  nazwa: 'Klasyczny',
  ikona: '🕵️',
  opis: 'Impostor wie, że nim jest, i dostaje wskazówkę. Reszta zna hasło.',
  instrukcja: 'Każdy po kolei mówi jedno skojarzenie z hasłem.',
  uzywaKategorii: true,
  chaosWszyscy: true,
  wyniki: ['zlapany', 'przetrwal', 'zgadl'],
  opcje: [{ klucz: 'trudnosc', nazwa: 'Wskazówka dla impostora', wartosci: TRUDNOSCI }],

  losuj(pule, ust) {
    const h = pule.losujHaslo();
    if (!h) return null;
    // wskazówka losowana raz na rundę — przy 2 impostorach obaj widzą tę samą
    return { haslo: h.haslo, kategoria: h.kategoria, wskazowka: wskazowka(h, ust.trudnosc), wyczerpane: h.wyczerpane };
  },

  karta(dane, czyImpostor) {
    if (czyImpostor) return { imp: true, tekst: 'JESTEŚ IMPOSTOREM', pod: dane.wskazowka ?? 'Brak wskazówki — słuchaj uważnie!' };
    return { etykieta: 'Hasło', tekst: dane.haslo };
  },

  naStol: () => null,

  odslona: dane => [
    { etykieta: 'Hasło', tekst: dane.haslo },
    { etykieta: 'Wskazówka impostora', tekst: dane.wskazowka ?? 'brak (Hardcore)', male: true },
  ],
};
