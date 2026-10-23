// Lista trybów. Każdy tryb to osobny moduł o tym samym kształcie:
//   id, nazwa, ikona, opis, instrukcja       — teksty do ustawień i ekranu gry
//   uzywaKategorii                           — czy w ustawieniach pokazać wybór kategorii
//   chaosWszyscy                             — czy Chaos może dać „wszyscy impostorami”
//   wyniki                                   — opcje „Co się stało?” (klucze z WYNIKI w runda.js)
//   opcje                                    — dodatkowe ustawienia trybu [{ klucz, nazwa, wartosci: [{ v, n, d }] }]
//   losuj(pule, ust)                         — dane rundy albo null, gdy nie ma z czego losować
//   karta(dane, czyImpostor)                 — co gracz widzi pod klapką { imp?, etykieta?, tekst, pod?, pytanie? }
//   naStol(dane)                             — opcjonalna treść odkrywana na ekranie gry (albo null)
//   odslona(dane)                            — co pokazać po odsłonięciu [{ etykieta, tekst, male? }]
// Nowy tryb = nowy plik + dopisanie go tutaj.
import klasyczny from './klasyczny.js';
import undercover from './undercover.js';
import pytania from './pytania.js';

export const TRYBY = [klasyczny, undercover, pytania];
export const tryb = id => TRYBY.find(t => t.id === id) ?? klasyczny;
