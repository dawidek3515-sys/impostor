// Modyfikator „2 impostorów”: w części rund drugi impostor z tą samą wskazówką. Obaj nie wiedzą o sobie
// ani o tym, czy w tej rundzie jest ich dwóch — wychodzi to dopiero na odsłonięciu.
export const SZANSA_DRUGIEGO = 0.25;

export default {
  id: 'dwoch',
  nazwa: 'Może 2 impostorów',
  ikona: '👥',
  opis: 'W co czwartej rundzie (losowo) jest drugi impostor z tą samą wskazówką. Nikt nie wie, czy jest jeden, czy dwóch. Punkty liczone osobno.',
  minGraczy: 5,

  zastosuj(runda, { n }) {
    if (n < 5 || runda.impostorzy.length !== 1) return;
    if (Math.random() >= SZANSA_DRUGIEGO) return;
    let drugi;
    do drugi = Math.floor(Math.random() * n); while (drugi === runda.impostorzy[0]);
    runda.impostorzy.push(drugi);
  },
};
