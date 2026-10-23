// Zapis w localStorage telefonu. Każdy odczyt/zapis w try/catch —
// w trybie prywatnym albo przy pełnej pamięci Safari potrafi rzucić wyjątkiem.
const PREFIKS = 'impostor.';

export function wczytaj(klucz, domyslne) {
  try {
    const tekst = localStorage.getItem(PREFIKS + klucz);
    return tekst == null ? domyslne : JSON.parse(tekst);
  } catch {
    return domyslne;
  }
}

export function zapisz(klucz, wartosc) {
  try {
    localStorage.setItem(PREFIKS + klucz, JSON.stringify(wartosc));
  } catch {
    // brak miejsca / tryb prywatny — gra działa dalej, tylko bez zapamiętania
  }
}
