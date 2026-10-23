// Modyfikator „2 impostorów”: drugi impostor z tą samą wskazówką. Obaj nie wiedzą o sobie.
export default {
  id: 'dwoch',
  nazwa: '2 impostorów',
  ikona: '👥',
  opis: 'Dwóch impostorów z tą samą wskazówką. Nie wiedzą o sobie, punkty liczone osobno.',
  minGraczy: 5,

  zastosuj(runda, { n }) {
    if (n < 5 || runda.impostorzy.length !== 1) return;
    let drugi;
    do drugi = Math.floor(Math.random() * n); while (drugi === runda.impostorzy[0]);
    runda.impostorzy.push(drugi);
  },
};
