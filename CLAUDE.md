# Impostor — gra imprezowa na iPhone'a

Gra w „impostora” dla 3–8 znajomych grających na **jednym telefonie** (podajecie go sobie w kółko).
Wszystkie teksty w aplikacji po polsku. Właściciel: Dawid.

Ten plik jest źródłem prawdy o projekcie. Przy każdej zmianie ustaleń — zaktualizuj go.

---

## Technologia i hosting

- **PWA w czystym HTML/CSS/JS** — bez frameworków i bez kroku budowania (na Macu nie ma Node.js ani Xcode; jest tylko git).
- Działa **offline** (service worker + manifest), uruchamiana z ikony na ekranie początkowym.
- Hosting: **GitHub Pages** (darmowy, trwały). Instalacja na iPhonie: Safari → Udostępnij → „Dodaj do ekranu początkowego”.
  - Repozytorium: https://github.com/dawidek3515-sys/impostor (gałąź `main`, Pages z `/ (root)`).
  - Adres gry: **https://dawidek3515-sys.github.io/impostor/**
- Stan gry (gracze, punkty, ustawienia, własne hasła, historia wylosowanych haseł) trzymany w `localStorage` telefonu.
- Wibracje NIE działają w Safari na iOS — sygnały tylko dźwiękiem i animacją.
- Wszystkie odczyty/zapisy `localStorage` w try/catch.

## Wygląd

- **Jasny i kolorowy, w stylu gry planszowej** (żywe kolory, zaokrąglone karty, duże przyciski i litery — wygodne do podawania telefonu).
- Nazwa pod ikoną: **„Impostor”**. Ikona: postać w kapturze ze znakiem zapytania.
- Projektowane pod pionowy ekran iPhone'a, obsługa safe-area (notch / pasek home).
- Czcionka systemowa zaokrąglona (`ui-rounded` = SF Pro Rounded na iPhonie) — działa offline, bez pobierania fontów.
- **Wybrany kierunek: wariant C „Stół”** (prototyp z trzema wariantami został usunięty po zbudowaniu v1). Na czym polega:
  - Gracze to kolorowe pionki z inicjałem, ustawione dookoła drewnianego stołu. Kolejność przy stole jest kolejnością podawania telefonu.
  - U góry pasek kroków: ① Gracze → ② Ustawienia → ③ Gra.
  - Ustawienia na jednym przewijanym ekranie. U góry przyklejone podsumowanie („Klasyczny · Normalny · 2 min · do 10 pkt”), niżej opcje jako przyciski-chipy, a kategorie jako lista z ptaszkami.
  - Rozdanie ról: stół z podświetlonym pionkiem osoby, która teraz trzyma telefon, i ✓ przy tych, którzy już widzieli swoją rolę. Pod spodem żółta klapka, która podjeżdża do góry, kiedy się ją przytrzyma.
  - Timer pokazuje się na środku stołu, nad pionkiem startującego jest 🎤, a pod stołem kolejność mówienia i pasek czasu.
  - Odsłonięcie: pionek impostora dostaje kaptur, reszta pionków jest przygaszona.
  - „Co się stało?”: trzy kwadratowe kafelki.
  - Wyniki to wyścig: każdy pionek ma swój tor do mety 🏁, a obok przyciski +/−.

---

## Zasady gry

### Gracze
- 3–8 graczy. Imiona wpisywane raz i zapamiętywane między grami.
- Między rundami można dodać/usunąć gracza bez kasowania punktów.

### Start gry
- Na początku gry ustala się cel: **do 5 / 10 / 15 pkt** albo **bez końca**. Po osiągnięciu celu — ekran zwycięzcy.
- Kto zaczyna: w pierwszej rundzie **losowo**, potem **po kolei** (rotacja, żeby każdy zaczynał). Impostor **może** zaczynać.

### Tryby główne (wybierany jeden)
1. **Klasyczny** — gracze widzą hasło; impostor widzi „JESTEŚ IMPOSTOREM” + wskazówkę.
   Poziomy trudności wskazówki:
   - Łatwy: kategoria + skojarzenie
   - **Normalny (domyślny)**: jedno skojarzenie
   - Trudny: sama kategoria
   - Hardcore: brak wskazówki
2. **Undercover** — impostor dostaje **podobne hasło** (np. Pizza ↔ Zapiekanka), bez wskazówki, i nie wie, że jest impostorem. Na odsłonięciu widać oba hasła.
3. **Pytania** — gracze dostają pytanie, impostor inne (dobrane tak, by odpowiedzi brzmiały podobnie). Odpowiedzi mówione na głos po kolei. Potem na ekranie dyskusji pokazuje się pytanie graczy.

### Modyfikatory (domyślnie WYŁĄCZONE, działają tylko gdy zaznaczone)
- **2 impostorów** — dostępne od 5 graczy. Obaj dostają tę samą wskazówkę, nie wiedzą o sobie, punkty liczone osobno dla każdego.
- **Chaos** — 10% szans na rundę chaosu:
  - „brak impostora” (wszyscy mają normalne hasło),
  - „wszyscy impostorami” (każdy widzi ekran impostora z tą samą wskazówką).
  - W trybie Undercover działa tylko „brak impostora”.
  - W rundzie chaosu ekran odsłonięcia pokazuje 🎲 CHAOS i **każdy dostaje +1 za przetrwanie**.

### Przebieg rundy
1. **Rozdanie ról**: ekran „Podaj telefon: *Imię*” → gracz **przytrzymuje palec** na karcie, żeby zobaczyć rolę (puszczenie = zasłonięcie) → „Dalej → *Następny*”.
2. **Ekran startującego** + opcjonalny **timer**: 1 / 2 / 3 / 5 min albo bez timera (domyślnie 2 min). **Timer rusza od razu po rozdaniu ról** — w tym czasie gracze mówią skojarzenia/odpowiedzi po kolei i dyskutują. Koniec czasu = dźwięk + miganie ekranu.
3. **Po dyskusji wybór**: „Pokaż impostora” albo **„Jeszcze jedna tura”** — gdy nie jesteście pewni, kto jest impostorem, gracie kolejną turę skojarzeń z **tym samym hasłem i tym samym impostorem** (bez nowego rozdania ról, bez punktów; timer startuje od nowa). Dogrywkę zaczyna **następna osoba przy stole**. Takich dogrywek może być dowolnie wiele.
   - W trybie Pytania pytanie graczy jest ukryte pod przyciskiem „Wszyscy odpowiedzieli — pokaż pytanie graczy” (żeby impostor nie zobaczył go przed odpowiedzią).
4. **Głosowanie na głos** (nie ma głosowania w aplikacji).
5. Przycisk **„Pokaż impostora”** → odsłonięcie: kto był impostorem + hasło (w Undercover oba hasła).
6. **„Co się stało?”** (przy 2 impostorach — osobno dla każdego):
   - Złapaliście impostora → **+1 dla każdego gracza** (nie-impostora)
   - Impostor przetrwał → **+2 dla impostora**
   - Impostor zgadł hasło (ostatnia szansa po złapaniu, na głos) → **+2 dla impostora** — tylko tryb Klasyczny
7. **Tabela wyników** z ręczną korektą +/− (np. za dobry blef).

- Przycisk „Przerwij rundę” na ekranie rozdania — runda przepada, nikt nie dostaje punktów.
- Zamknięcie aplikacji w trakcie rundy: runda przepada, punkty zostają (po otwarciu „Graj dalej”).
- Gdy ktoś osiągnie cel (także po korekcie albo zmianie celu), zamiast następnej rundy pokazuje się ekran zwycięzcy.

---

## Dane (baza haseł)

Struktura w projekcie:

```
dane/
  hasla/            # jeden plik JSON na kategorię
    jedzenie.json
    zwierzeta.json
    popkultura.json
    impreza18.json
    ...
  undercover.json   # pary podobnych haseł
  pytania.json      # pary pytań
```

Format kategorii (`dane/hasla/*.json`):

```json
{
  "nazwa": "Jedzenie",
  "ikona": "🍕",
  "dorosle": false,
  "hasla": [
    { "haslo": "Pizza", "skojarzenia": ["Neapol", "dostawa", "trójkąt"] }
  ]
}
```

- Hasło może mieć opcjonalne pole `"kategoria"` — nadpisuje nazwę kategorii we wskazówce (używane przez „Nasze”).
- Każde hasło ma 2–3 **starannie dobrane skojarzenia** — nie za oczywiste, nie z kosmosu.
- Stan v1: **15 kategorii, 540 haseł** (zwierzęta, jedzenie, miejsca, zawody, sport, filmy i seriale, polska popkultura, przedmioty, kraje, marki, czynności, sławni ludzie, bajki, muzyka, impreza 18+). Hasła nie powtarzają się między kategoriami.
- Kategoria **18+ (`"dorosle": true`) domyślnie wyłączona**. Kategorie włączane/wyłączane w ustawieniach (kategoria bez wpisu w ustawieniach = domyślnie włączona, chyba że 18+).
- `undercover.json`: tablica par (v1: **194**), np. `{ "a": "Pizza", "b": "Zapiekanka" }`. Która strona trafia do impostora — losowane.
- `pytania.json`: tablica par (v1: **84**), np. `{ "gracze": "Ile razy w tygodniu ćwiczysz?", "impostor": "Ile masz rodzeństwa?" }`. Odpowiedzi na oba pytania muszą być tego samego typu (liczba z podobnego zakresu, miejsce, osoba z grupy itd.).
- Lista plików kategorii: `dane/hasla/index.json` (`{ "kategorie": ["zwierzeta", ...] }`), bo GitHub Pages nie listuje katalogów — przy dodaniu nowej kategorii dopisz ją tam. Service worker sam bierze z niej listę plików do zapisania offline.
- Hasła, pary i pytania **nie powtarzają się**, dopóki pula się nie wyczerpie (historia w `localStorage`, potem komunikat „tasujemy od nowa”).
- **Własne hasła „Nasze”**: formularz w aplikacji (hasło, kategoria, opcjonalne skojarzenie), zapis w `localStorage`, widoczne jako kategoria „Nasze” 💬. Przycisk **„Eksportuj”** kopiuje JSON w formacie pliku kategorii (gdy schowek nie działa — pokazuje tekst do ręcznego skopiowania). Jest też **„Importuj”** (wklejenie wyeksportowanego JSON-a, bez duplikatów).

### Jak rozbudowywać bazę
- Edytuj plik JSON na github.com (ikona ✏️) → po ~minucie zmiana jest na telefonie (pamiętaj o odświeżeniu cache service workera — podbij wersję w `sw.js`).
- Albo poproś Claude'a: „dodaj 50 haseł o piłce nożnej”.

---

## Architektura kodu

- Tryby i modyfikatory jako **osobne, wymienne moduły** z jednym wspólnym interfejsem (rozdanie ról, treść karty, ekran dyskusji, opcje „Co się stało?”, punktacja), żeby nowe tryby dodawać bez ruszania reszty.
- Przy każdej zmianie plików statycznych podbij wersję cache w service workerze (`WERSJA` w `sw.js`). Nowy plik JS/CSS dopisz też do listy `PLIKI` w `sw.js`.

```
index.html, manifest.webmanifest, sw.js
css/style.css            # cały wygląd „Stół”
js/app.js                # sterowanie: akcje przycisków, przejścia ekranów, timer, przytrzymanie karty
js/ekrany.js             # szablony HTML ekranów (gracze, ustawienia, nasze, rozdanie, gra, odslona, wynik, tabela, zwyciezca)
js/stan.js               # obiekt stanu S + zapis trwałych części
js/magazyn.js            # localStorage w try/catch (klucze z prefiksem „impostor.”)
js/dane.js               # wczytanie haseł, losowanie bez powtórzeń, „Nasze”
js/runda.js              # tworzenie rundy (tryb + modyfikatory) i punktacja
js/dzwiek.js             # dźwięk końca czasu (Web Audio, odblokowywany dotykiem)
js/tryby/                # klasyczny.js, undercover.js, pytania.js + index.js (opis interfejsu)
js/modyfikatory/         # dwoch.js, chaos.js + index.js (opis interfejsu)
ikony/                   # PNG: apple-touch-icon (180), 192, 512, 512 maskable
```

- Nowy tryb = nowy plik w `js/tryby/` + dopisanie w `js/tryby/index.js` (+ w `PLIKI` w `sw.js`). Interfejs opisany w komentarzu w `js/tryby/index.js`.
- Service worker: pliki aplikacji z pamięci (cache-first), pliki z `dane/` od razu z pamięci, a w tle dociągana świeższa wersja na następne uruchomienie.
- Do testów lokalnych potrzebny jest serwer (moduły ES i `fetch` nie działają z `file://`).
- Instrukcja wdrożenia dla Dawida: `WDROZENIE.md`.

---

## Zakres wersji 1

Ekran graczy, ustawienia (tryb, modyfikatory, kategorie, trudność, timer, cel punktowy), rozdanie ról z przytrzymaniem, rotacja startującego, timer, odsłonięcie, punktacja z korektą, własne hasła z eksportem, baza ~500 haseł / ~150 par undercover / ~80 par pytań, jasny planszówkowy wygląd, PWA offline, instrukcja wdrożenia na GitHub Pages krok po kroku.

**Status (2026-10-23): v1 zbudowana.** Przetestowana w przeglądarce (wszystkie tryby, 2 impostorów, chaos, dogrywka, timer, punktacja, zwycięzca, „Nasze”). Opublikowana na GitHub Pages — service worker się instaluje i zapisuje komplet plików (40) do pracy offline. Jeszcze NIE sprawdzone na prawdziwym iPhonie (przytrzymanie palcem, dźwięk, instalacja na ekranie, offline).

## Rozbudowa w przyszłości (NIE w v1)

- **Sekretne zadanie impostora** — np. „użyj w rundzie słowa *ziemniak*”, za dodatkowy punkt.
- **Tryb „Słowo po słowie”** — aplikacja pilnuje kolejki, każdy mówi jedno słowo w swojej turze.
- Kolejne kategorie haseł (np. piłka nożna, gry, wewnętrzne żarty ekipy).
