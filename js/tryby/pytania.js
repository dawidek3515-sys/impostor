// Tryb Pytania: gracze dostają jedno pytanie, impostor inne — dobrane tak, by odpowiedzi brzmiały podobnie.
export default {
  id: 'pytania',
  nazwa: 'Pytania',
  ikona: '❓',
  opis: 'Impostor dostaje inne pytanie niż reszta i o tym nie wie. Odpowiadacie na głos po kolei.',
  instrukcja: 'Każdy po kolei odpowiada na głos na swoje pytanie.',
  uzywaKategorii: false,
  chaosWszyscy: true,
  wyniki: ['zlapany', 'przetrwal'],
  opcje: [],

  losuj(pule) {
    const p = pule.losujPytania();
    return p ? { gracze: p.gracze, impostor: p.impostor, wyczerpane: p.wyczerpane } : null;
  },

  karta: (dane, czyImpostor) => ({
    etykieta: 'Twoje pytanie',
    tekst: czyImpostor ? dane.impostor : dane.gracze,
    pytanie: true,
    pod: 'Zapamiętaj je. Odpowiecie na głos po kolei.',
  }),

  // pytanie graczy pokazujemy dopiero, gdy wszyscy odpowiedzą
  naStol: dane => ({ przycisk: 'Wszyscy odpowiedzieli — pokaż pytanie graczy', etykieta: 'Pytanie graczy', tekst: dane.gracze }),

  odslona: dane => [
    { etykieta: 'Pytanie graczy', tekst: dane.gracze, male: true },
    { etykieta: 'Pytanie impostora', tekst: dane.impostor, male: true },
  ],
};
