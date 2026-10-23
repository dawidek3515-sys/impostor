// Modyfikator „Chaos”: 10% szans na rundę bez impostora albo z samymi impostorami.
export const SZANSA_CHAOSU = 0.1;

export default {
  id: 'chaos',
  nazwa: 'Chaos',
  ikona: '🎲',
  opis: '10% szans na szaloną rundę: bez impostora albo wszyscy impostorami. Wtedy każdy dostaje +1 za przetrwanie.',
  minGraczy: 3,

  zastosuj(runda, { n, tryb }) {
    if (Math.random() >= SZANSA_CHAOSU) return;
    const wszyscy = tryb.chaosWszyscy && Math.random() < 0.5;
    runda.chaos = wszyscy ? 'wszyscy' : 'brak';
    runda.impostorzy = wszyscy ? [...Array(n).keys()] : [];
  },
};
