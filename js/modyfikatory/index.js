// Lista modyfikatorów (domyślnie wyłączone). Każdy ma ten sam kształt:
//   id, nazwa, ikona, opis, minGraczy
//   zastosuj(runda, { n, tryb, ust }) — zmienia runda.impostorzy / runda.chaos przy tworzeniu rundy
// Kolejność ma znaczenie: Chaos na końcu, bo nadpisuje wybór impostorów.
import dwoch from './dwoch.js';
import chaos from './chaos.js';

export const MODY = [dwoch, chaos];
