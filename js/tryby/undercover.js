// Tryb Undercover: impostor dostaje podobne hasło, bez wskazówki, i nie wie, że jest impostorem.
export default {
  id: 'undercover',
  nazwa: 'Undercover',
  ikona: '🎭',
  opis: 'Impostor dostaje podobne hasło (np. Pizza ↔ Zapiekanka) i nie wie, że jest impostorem.',
  instrukcja: 'Każdy po kolei mówi jedno skojarzenie ze swoim hasłem.',
  uzywaKategorii: false,
  chaosWszyscy: false,   // „wszyscy impostorami” nie ma tu sensu — zostaje tylko „brak impostora”
  wyniki: ['zlapany', 'przetrwal'],
  opcje: [],

  losuj(pule) {
    const p = pule.losujPare();
    if (!p) return null;
    const [gracze, impostor] = Math.random() < 0.5 ? [p.a, p.b] : [p.b, p.a];
    return { gracze, impostor, wyczerpane: p.wyczerpane };
  },

  // karta impostora wygląda tak samo jak pozostałe — inaczej by się domyślił
  karta: (dane, czyImpostor) => ({ etykieta: 'Twoje hasło', tekst: czyImpostor ? dane.impostor : dane.gracze }),

  naStol: () => null,

  odslona: dane => [
    { etykieta: 'Hasło graczy', tekst: dane.gracze },
    { etykieta: 'Hasło impostora', tekst: dane.impostor },
  ],
};
