# Jak wrzucić Impostora na iPhone'a (GitHub Pages)

Gra to zwykła strona internetowa, która po dodaniu do ekranu początkowego działa jak aplikacja, także offline.
Hostujemy ją za darmo na GitHub Pages. Całość zajmuje ok. 15 minut i nie trzeba nic instalować.

---

## Krok 1. Konto na GitHubie

1. Wejdź na **github.com** i kliknij **Sign up** (jeśli nie masz konta).
2. Zapamiętaj swój **login** — będzie częścią adresu gry, np. `dawid123.github.io/impostor`.

## Krok 2. Nowe repozytorium

1. Po zalogowaniu kliknij **+** (prawy górny róg) → **New repository**.
2. **Repository name:** `impostor`
3. Zaznacz **Public** (darmowe GitHub Pages działa tylko dla publicznych repozytoriów).
4. Kliknij **Create repository**.

## Krok 3. Wgranie plików

Najprościej przez przeglądarkę na komputerze:

1. Na stronie nowego repozytorium kliknij link **uploading an existing file**.
2. Przeciągnij do okna te pliki i foldery z folderu projektu:
   - `index.html`
   - `sw.js`
   - `manifest.webmanifest`
   - folder `css`
   - folder `js`
   - folder `dane`
   - folder `ikony`
   - (opcjonalnie `CLAUDE.md` i `WDROZENIE.md`)

   **Nie wgrywaj** `apka.zip` ani folderu `apka`.
3. Poczekaj, aż wszystkie pliki się załadują, i kliknij zielony przycisk **Commit changes**.

> Alternatywa dla Maca (jest tam git) — w Terminalu, w folderze projektu:
> ```bash
> git init
> git add index.html sw.js manifest.webmanifest css js dane ikony CLAUDE.md WDROZENIE.md
> git commit -m "Impostor v1"
> git branch -M main
> git remote add origin https://github.com/TWOJ-LOGIN/impostor.git
> git push -u origin main
> ```

## Krok 4. Włączenie GitHub Pages

1. W repozytorium wejdź w **Settings** → w menu po lewej **Pages**.
2. **Source:** `Deploy from a branch`.
3. **Branch:** `main`, folder `/ (root)` → **Save**.
4. Odczekaj 1–2 minuty i odśwież stronę ustawień. U góry pojawi się adres, np.
   `https://TWOJ-LOGIN.github.io/impostor/`

## Krok 5. Instalacja na iPhonie

1. Otwórz ten adres w **Safari** (nie w Chrome — tylko Safari umie dodać aplikację na ekran).
2. Poczekaj, aż gra się załaduje (przy pierwszym uruchomieniu potrzebny jest internet — wtedy hasła zapisują się w telefonie).
3. Stuknij **Udostępnij** (kwadrat ze strzałką) → przewiń w dół → **Dodaj do ekranu początkowego** → **Dodaj**.
4. Na ekranie pojawi się ikona **Impostor**. Od teraz uruchamiaj grę z ikony — działa bez internetu.

Każdy znajomy może zrobić to samo na swoim telefonie, ale do gry wystarczy jeden.

---

## Aktualizacje (nowe hasła, poprawki)

1. Na github.com otwórz plik do zmiany (np. `dane/hasla/jedzenie.json`) i kliknij ✏️ (Edit).
2. Wprowadź zmiany → **Commit changes**.
3. **Ważne:** otwórz też `sw.js`, kliknij ✏️ i podbij numer wersji w linii
   `const WERSJA = 'impostor-v1';` → np. `'impostor-v2'` → **Commit changes**.
   Bez tego telefony zostaną przy starej kopii.
4. Po ok. minucie: na iPhonie całkiem zamknij grę (przesuń w górę w przełączniku aplikacji) i otwórz ją ponownie, najlepiej z internetem. Czasem trzeba to zrobić dwa razy.

### Nowa kategoria haseł
1. Dodaj plik `dane/hasla/nazwa.json` (w GitHubie: **Add file → Create new file**) w takim samym formacie jak inne kategorie.
2. Dopisz `"nazwa"` do listy w `dane/hasla/index.json`.
3. Podbij wersję w `sw.js`.

### Własne hasła „Nasze” na stałe
Hasła dodane w aplikacji są tylko w tym telefonie i znikną przy czyszczeniu danych Safari.
Żeby je zachować: w grze **Ustawienia → Dodaj własne hasła „Nasze” → Eksportuj**, a potem
zapisz skopiowany tekst jako nowy plik kategorii (np. `dane/hasla/ekipa.json`, zmień w nim `"nazwa"` na np. `"Ekipa"`)
i dopisz go do `index.json` jak wyżej.

---

## Dobrze wiedzieć

- **Dźwięk końca czasu** nie zagra, gdy iPhone ma włączony przełącznik wyciszenia — wtedy zostaje miganie ekranu.
- **Wibracje** nie działają w Safari na iOS (ograniczenie Apple).
- Gracze, punkty i ustawienia zapisują się w telefonie. Jeśli zamkniesz grę w trakcie rundy, ta runda przepada (punkty zostają) — po ponownym otwarciu kliknij „Graj dalej”.
