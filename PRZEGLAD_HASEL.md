# Przegląd bazy haseł — balans i plan rozbudowy

Stan: 15 kategorii / 540 haseł, 194 pary Undercover, 84 pary pytań (2026-10-23).
**Wdrożone 2026-10-23:** pkt 2–3 (zamiany skojarzeń), pkt 4–5 (pary Undercover i pytania; Kręgle/Bilard zamienione ostatecznie na Bilard/Piłkarzyki), pkt 7 (5 nowych kategorii po 36 haseł; „Sala weselna” została w Miejscach). Niewdrożone: pkt 6 (mechanika — wymaga kodu). Stan po zmianach: 20 kategorii / 720 haseł, 224 pary Undercover, 99 par pytań.

---

## 1. Jak to robią inne gry (i co z tego wynika dla nas)

| Gra | Jak dobiera hasła / wskazówki | Lekcja dla nas |
|---|---|---|
| **The Chameleon** (Big Potato) | Karta tematu z siatką 16 haseł. Kameleon widzi całą siatkę, ale nie wie, które hasło jest prawdziwe. Po złapaniu ma ostatnią szansę zgadnąć. | Impostor ma znać **sąsiedztwo**, a nie **adres**. Wskazówka powinna zawężać do kilku–kilkunastu kandydatów, a nie do jednego. |
| **Spyfall** | Każdy gracz ma listę wszystkich możliwych lokacji; szpieg nie wie, która jest właściwa. | To samo: uczciwa szansa na zgadnięcie bierze się z ograniczonej puli kandydatów, nie z podpowiedzi wprost. |
| **Imposter (gameonfamily)** | Listy podzielone na łatwe / średnie / trudne. Test dobrego hasła: da się je opisać na **8 różnych sposobów** (wygląd, część, miejsce, działanie, materiał…). Dobre hasło ma **„bliskiego kuzyna”** (Pizza ↔ Calzone), na którym impostor może blefować. | Odrzucać hasła zbyt ogólne („rzecz”) i zbyt niszowe. Pary Undercover = właśnie „bliscy kuzyni”. |
| **imposter.app** (porady) | Wybierać najpopularniejsze hasła w kategorii; niszowe hasła psują rundę. | Hasło musi znać każdy przy stole — w razie wątpliwości wylatuje. |
| **Undercover** (aplikacja i badania nad tą grą) | Pary „podobne, ale różne” (Kawa ↔ Herbata). Badacze testowali pary pod kątem podobieństwa i tego, czy da się je opisać; najlepiej działają **zwykłe, konkretne** słowa; filtrują pary, które dają jednostronne zwycięstwa. | Pary oceniać pod kątem: ta sama kategoria, wspólne 70–80% cech, różnica w 1–2 cechach, oba słowa równie znane. |

### Zasady balansu, które proponuję przyjąć (do dopisania w CLAUDE.md)

**Hasło**
1. Zna je każdy dorosły Polak z grupy 20–35 lat (bez specjalistycznej wiedzy).
2. Da się o nim powiedzieć ≥ 8 różnych skojarzeń — inaczej 2. tura dogrywki „wysycha”.
3. Ma w bazie albo w głowie graczy co najmniej 3–4 „kuzynów” (rzeczy, z którymi można je pomylić).

**Skojarzenie (wskazówka dla impostora)**
1. **Test 3 sekund**: jeśli połowa grupy zgadłaby hasło z samego skojarzenia w 3 sekundy — za mocne.
2. **Test sąsiedztwa**: skojarzenie powinno pasować do co najmniej 3–5 innych możliwych haseł.
3. **Zakazane**: imiona i nazwiska postaci, stolice, cytaty i hasła reklamowe, tytuły dzieł, nazwy własne jednoznacznie przypisane do hasła, ten sam rdzeń co hasło, synonimy.
4. **Za słabe**: związek, który zna tylko autor (np. siedziba studia, rodzinna miejscowość).
5. Wszystkie 3 skojarzenia mają być na **podobnym poziomie** — tryb Normalny losuje jedno z trzech, więc jedno „mocne” w trójce = co trzecia runda za łatwa.
6. Wspólne skojarzenia między hasłami (np. „Wigilia” przy Pierogach i Barszczu) są **dobre**, bo dają impostorowi kilka tropów naraz.

Dzięki temu poziomy trudności same się układają: **Łatwy** (kategoria + skojarzenie) zawęża do 1–3 haseł, **Normalny** (samo skojarzenie) do kilku–kilkunastu, **Trudny** (sama kategoria) do całej kategorii.

---

## 2. Diagnoza naszej bazy

**Główny problem: wiele skojarzeń to „adres”, a nie „sąsiedztwo”.** Najczęściej to imiona postaci (Simba, Gargamel, Geralt), stolice (Seul, Budapeszt), cytaty (Hakuna Matata, Bazinga) i rozpoznawalne znaki firmowe (Big Mac, Just Do It). Impostor, który dostaje „Gargamel”, w sekundę wie, że hasło to Smerfy — wtedy blef jest trywialny, a opcja „Impostor zgadł hasło” (+2) to darmowe punkty.

| Kategoria | Ocena | Odsetek haseł z co najmniej 1 zbyt mocnym skojarzeniem | Uwagi |
|---|---|---|---|
| Przedmioty | ✅ bardzo dobra | ~5% | Wzorcowa — opisy cech i sytuacji. |
| Czynności | ✅ bardzo dobra | ~5% | Świetne codzienne skojarzenia („kto dziś?”, „siadanie na wieku”). |
| Zawody | ✅ dobra | ~10% | 2 skojarzenia z tym samym rdzeniem co hasło. |
| Miejsca | ✅ dobra | ~15% | „Wesele” to nie miejsce (do przeniesienia albo zmiany na „Sala weselna”). |
| Jedzenie | ✅ dobra | ~15% | Dużo dobrych wspólnych skojarzeń. |
| Zwierzęta | ✅ dobra | ~10% | |
| Sport | 🟡 średnia | ~40% | Jeden błąd merytoryczny, kilka terminów fachowych. |
| Muzyka | 🟡 średnia | ~35% | Artyści dostają tytuły piosenek. |
| Impreza 18+ | 🟡 średnia | ~20% | Trzy hasła z „kac” w jednej kategorii. |
| Marki | 🔴 słaba | ~55% | Slogany i flagowe produkty. |
| Kraje | 🔴 słaba | ~65% | Stolice i najsłynniejsze zabytki. |
| Sławni ludzie | 🔴 słaba | ~55% | Dzieła i imiona partnerów. |
| Polska popkultura | 🔴 słaba | ~65% | Nazwiska prowadzących i postaci. |
| Filmy i seriale | 🔴 bardzo słaba | ~75% | Imiona bohaterów, cytaty. |
| Bajki | 🔴 bardzo słaba | ~75% | Prawie każda bajka ma imię postaci. |

### Błędy techniczne / merytoryczne (do poprawy na pewno)

| Hasło | Problem | Zamiana |
|---|---|---|
| Golf | „melonik” — to kapelusz, nie ma związku z golfem | → „kij” |
| Scooby-Doo | „Scooby chrupki” zawiera hasło | → „furgonetka” |
| Gumisie | „sok z gumijagód” — ten sam rdzeń | → „magiczny napój” |
| Kolęda | „kolędnicy” — ten sam rdzeń | → „śpiewnik” |
| Disco polo | „Polo TV” — zawiera hasło | → „remiza” |
| Kucharz | „kuchnia” — ten sam rdzeń | → „nóż” |
| Taksówkarz | „taksometr” — ten sam rdzeń | → „nocny kurs” |
| Bilard | „bila” — ten sam rdzeń | → „zielone sukno” |
| Jazda samochodem | „prawo jazdy” — ten sam rdzeń | → „parkowanie” |
| Żółw | „Wojownicze Żółwie Ninja” — zawiera hasło | → „długowieczność” |
| Eurowizja | „Europa” — ten sam rdzeń | → „głosowanie” |
| Pan Tadeusz | „Litwo” — pierwsze słowo utworu, zdradza wszystko | → „lektura” |
| Prezerwatywa | „gumka” — synonim | → „ostrożność” |
| Iga Świątek | „Raszyn” — zbyt niszowe | → „Paryż” |
| Reksio | „Bielsko-Biała” — zbyt niszowe | → „szczeka zamiast mówić” |
| Dawid Podsiadło | „Dąbrowa Górnicza” — zbyt niszowe | → „X Factor” |
| Wioślarstwo | „osada” — termin fachowy | → „drużyna” |
| Piłka ręczna | „obrotowy”, „koło” — terminy fachowe | → „bramkarz”, „hala” |

---

## 3. Propozycje zamiany skojarzeń (kategorie 🔴 i 🟡)

Format: `hasło: stare → nowe`. Pozostałe skojarzenia hasła zostają bez zmian.

### Bajki
- Kopciuszek: pantofelek → bal
- Królewna Śnieżka: krasnoludki → jabłko · zatrute jabłko → las · lustereczko → macocha
- Śpiąca Królewna: wrzeciono → klątwa · sto lat snu → zamek
- Jaś i Małgosia: piernikowa chatka → słodycze · okruszki → rodzeństwo
- Pinokio: rosnący nos → nos · Dżeppetto → drewno
- Mała Syrenka: Ariel → morze
- Piotruś Pan: Nibylandia → latanie · Dzwoneczek → wróżka · Kapitan Hak → piraci
- Kubuś Puchatek: Prosiaczek → przyjaciele · Stumilowy Las → las
- Smerfy: Gargamel → czarodziej
- Myszka Miki: Minnie → czerwone spodenki
- Scooby-Doo: Kudłaty → pies
- Aladyn: lampa → pustynia · dżin → życzenia · latający dywan → małpka
- Mulan: Mushu → smok
- Brzydkie kaczątko: łabędź → staw
- Pszczółka Maja: Gucio → owady
- Muminki: Dolina → Finlandia · Mała Mi → białe stworki · Buka → sen zimowy
- Bob Budowniczy: „Damy radę!” → budowa
- Świnka Peppa: George → rodzina
- Psi Patrol: Ryder → ratunek
- Gumisie: książę Igthorn → zamek
- Smok Wawelski: owca z siarką → owca
- Pan Twardowski: karczma Rzym → pakt
- Baba Jaga: kurza nóżka → czarownica
- Królowa Śniegu: Kaj → lustro · Gerda → przyjaźń
- Alicja w Krainie Czarów: biały królik → królik · Kapelusznik → herbatka · królowa kier → karty
- Tabaluga: Arktos → zielony
- Księga dżungli: Mowgli → chłopiec · Baloo → niedźwiedź · Shere Khan → tygrys

### Filmy i seriale
- Titanic: DiCaprio → miłość · góra lodowa → zimna woda
- Harry Potter: Hogwart → szkoła
- Gwiezdne wojny: miecz świetlny → kosmos · Moc → ojciec · Vader → maska
- Władca Pierścieni: hobbit → elfy · Mordor → Nowa Zelandia · Gollum → wędrówka
- Shrek: ogr → zielony
- Król Lew: Simba → sawanna · Hakuna Matata → zemsta · Skaza → ojciec
- Gra o tron: Westeros → zamki · Winter is coming → zima
- Przyjaciele: Central Perk → kawiarnia · Ross → Nowy Jork
- Breaking Bad: Heisenberg → pustynia · nauczyciel chemii → chemia
- Stranger Things: Demogorgon → rowery · Eleven → dzieciaki
- Matrix: Neo → okulary przeciwsłoneczne · czerwona pigułka → wybór · zielony kod → symulacja
- Jurassic Park: dinozaury → naukowcy
- Avengers: Thanos → drużyna · tarcza → bohaterowie
- Piraci z Karaibów: Jack Sparrow → rum · Czarna Perła → statek
- Szczęki: rekin → lato
- Forrest Gump: pudełko czekoladek → ławka
- Kraina lodu: Elsa → siostry · Mam tę moc → piosenka · bałwan Olaf → bałwan
- Toy Story: Buzz → pokój dziecka
- Ojciec chrzestny: propozycja nie do odrzucenia → rodzina
- Dom z papieru: Profesor → Hiszpania
- Squid Game: dalgona → gry z dzieciństwa
- Wiedźmin: Geralt → potwory · Płotka → koń · Ciri → medalion
- The Office: Michael Scott → szef
- Simpsonowie: Springfield → elektrownia
- Teoria wielkiego podrywu: Sheldon → nerdzi · Bazinga → komiksy
- Batman: Gotham → noc · Joker → miliarder
- Spider-Man: Peter Parker → nastolatek · ciocia May → Nowy Jork
- James Bond: 007 → agent · Aston Martin → gadżety
- Barbie: Ken → plastik
- Oppenheimer: Los Alamos → naukowiec

### Polska popkultura
- Świat według Kiepskich: Ferdek → piwo
- Miś: Ochódzki → PRL
- Seksmisja: Maks i Albert → kobiety
- Chłopaki nie płaczą: Bolec → kultowe cytaty
- Ranczo: Wilkowyje → wieś
- M jak miłość: Mostowiak → rodzina · Grabina → TVP2
- Familiada: Strasburger → suchary · 100 osób → ankieta
- Rolnik szuka żony: Marta Manowska → TVP
- Jaka to melodia: Janowski → piosenki
- Taniec z gwiazdami: kryształowa kula → jury
- Czterej pancerni i pies: Szarik → pies · Rudy → wojna
- Stawka większa niż życie: Kloss → agent · Brunner → Niemcy
- Kogel-mogel: Kasia Solska → Warszawa · Wolańska → komedia
- Doda: Virgin → Opole
- Zenek Martyniuk: Przez twe oczy zielone → wesele · Akcent → festyn
- Krzysztof Krawczyk: Parostatek → lata 70.
- Maryla Rodowicz: Małgośka → fryzura
- Sanatorium miłości: Ciechocinek → uzdrowisko
- Top Model: Joanna Krupa → modelki
- Kuchenne rewolucje: Gessler → krzyk
- Ekipa Friza: Wersow → influencerzy
- Kabaret: Ani Mru-Mru → żarty
- Klan: Lubiczowie → TVP1
- 1670: Adamczycha → komedia
- Pan Tadeusz: Soplicowo → szlachta
- Krzyżacy: Zbyszko → rycerze
- WOŚP: Owsiak → zbiórka

### Sławni ludzie
- Robert Lewandowski: Anna → kadra
- Iga Świątek: Roland Garros → kort
- Maria Skłodowska-Curie: rad → chemia
- Fryderyk Chopin: Żelazowa Wola → lotnisko
- Jan Paweł II: kremówki → Watykan
- Albert Einstein: E=mc² → fizyka · względność → geniusz
- Leonardo da Vinci: Mona Lisa → Włochy
- Napoleon: Waterloo → niski wzrost
- Michael Jackson: moonwalk → taniec · Thriller → pop
- Cristiano Ronaldo: Siuuu → cieszynka · Madera → mięśnie
- Kim Kardashian: Kanye → rodzina
- Królowa Elżbieta II: corgi → psy · Buckingham → Londyn
- William Szekspir: Hamlet → teatr · Romeo → tragedia · być albo nie być → Anglia
- Freddie Mercury: Queen → zespół · Bohemian Rhapsody → Zanzibar
- Mozart: Requiem → peruka · Salzburg → Austria
- Bill Gates: Microsoft → komputery · Windows → bogactwo
- Andrzej Sapkowski: Wiedźmin → książki
- Jan Matejko: Bitwa pod Grunwaldem → obrazy
- Krzysztof Kolumb: 1492 → statek
- Barack Obama: Yes we can → prezydent · Michelle → pierwszy
- Brad Pitt: Angelina → przystojny

### Kraje (zasada: bez stolic i najsłynniejszego zabytku)
- Włochy: but na mapie → kształt · Rzym → pizza
- Francja: wieża → sery
- Hiszpania: corrida → upał
- Niemcy: Berlin → piwo
- Wielka Brytania: Big Ben → deszcz
- USA: Statua Wolności → burgery
- Japonia: Tokio → anime
- Chiny: Pekin → ryż · mur → tłumy
- Egipt: piramidy → pustynia · faraon → wakacje zimą
- Grecja: Ateny → wyspy
- Rosja: Kreml → zima
- Brazylia: samba → piłka nożna
- Meksyk: sombrero → ostre jedzenie
- Australia: kangury → daleko · opera w Sydney → pająki
- Kanada: syrop klonowy → klon
- Indie: Tadż Mahal → przyprawy
- Turcja: Stambuł → kebab
- Norwegia: fiordy → drogo
- Szwecja: IKEA → Skandynawia · ABBA → meble · Volvo → blondyni
- Czechy: Praga → piwo
- Węgry: Budapeszt → termy
- Chorwacja: Split → wakacje autem
- Portugalia: Lizbona → ocean
- Irlandia: św. Patryk → zieleń
- Szkocja: dudy → whisky · Loch Ness → potwór
- Islandia: Björk → zimno
- Argentyna: Buenos Aires → steki
- Kuba: Hawana → rewolucja
- Tajlandia: Bangkok → słonie
- Korea Południowa: Seul → seriale
- Kenia: Nairobi → sawanna
- Watykan: papież → mały · Gwardia Szwajcarska → pielgrzymi
- Ukraina: Kijów → sąsiad · Dniepr → barszcz
- Maroko: Marrakesz → Afryka

### Marki
- Coca-Cola: świąteczna ciężarówka → święta
- McDonald's: Big Mac → frytki · Happy Meal → zabawka · złote łuki → drive
- Apple: iPhone → drogo · Steve Jobs → minimalizm
- Nike: Just Do It → buty · Air Jordan → sport
- Adidas: trzy paski → Niemcy
- IKEA: kluczyk imbusowy → instrukcja
- Allegro: Smart → zakupy
- Tesla: Musk → ładowanie
- Google: Gmail → pytania
- Facebook: Zuckerberg → rodzice
- Red Bull: skrzydła → Formuła 1
- Samsung: Galaxy → telefon
- Fiat 126p: maluch → mały
- Disney: Myszka Miki → bajki
- PlayStation: Sony → gry
- Wedel: ptasie mleczko → słodycze
- Starbucks: syrena → drogo · frappuccino → kawa
- Rolex: korona → bogactwo
- KFC: pułkownik → kurczak
- LOT: Okęcie → podróż

### Muzyka
- The Beatles: Lennon → lata 60.
- Queen: We Will Rock You → stadion · Freddie → Wielka Brytania
- Elvis Presley: król rocka → Las Vegas · Graceland → grzywka
- Madonna: Like a Prayer → skandale
- Ed Sheeran: Shape of You → Anglia
- Dawid Podsiadło: Małomiasteczkowy → trasa
- Sanah: Szampan → poezja
- Reggae: Bob Marley → luz
- Disco: Bee Gees → brokat

### Sport
- Skoki narciarskie: Małysz → wiatr · telemark → narty
- Kolarstwo: Tour de France → pod górę · żółta koszulka → obcisły strój
- Formuła 1: pit stop → opony
- Żużel: Gollob → hałas
- Badminton: lotka → ogródek
- Bilard: łuza → pub
- Hokej: krążek → kij
- Szachy: goniec → strategia
- MMA: KSW → Pudzian
- Tenis: Wimbledon → truskawki
- Joga: pies z głową w dół → rozciąganie
- Maraton: 42 kilometry → wytrzymałość

### Drobne poprawki w pozostałych kategoriach
- Kościół: msza → niedziela · Cmentarz: znicze → cisza · Więzienie: cela → ucieczka · Dworzec: peron → walizki · Sejm: posłowie → kłótnie
- Miejsca → „Wesele” zamienić na **„Sala weselna”** albo przenieść do nowej kategorii „Święta i okazje”.
- Impreza 18+: hasła „Kac”, „Kac moralny” i „Kac Vegas” w jednej kategorii — zostawić „Kac” i „Kac Vegas”, a „Kac moralny” zamienić na nowe hasło (np. „Pijany SMS”: telefon, rano, wstyd).

---

## 4. Undercover — ocena par

Dobra para = ta sama kategoria, ~70–80% cech wspólnych, różnica w 1–2 cechach, oba słowa równie znane. Większość z 194 par spełnia te warunki. Do poprawy:

**Za blisko (praktycznie to samo — nikt nie znajdzie impostora, a impostor nie zorientuje się, że jest inny):**
Krokodyl/Aligator, Żaba/Ropucha, Szampan/Prosecco, Pączek/Donut, Masło/Margaryna, Spanie/Drzemka, Góra/Wzgórze, Rzeka/Strumień, Królik/Zając, Fryzjer/Barber, Kościół/Kaplica, Pianino/Keyboard.
→ Nie wyrzucać, tylko oznaczyć jako **trudne** (patrz pkt 6).

**Za daleko (impostor od razu słyszy, że mówi o czymś innym):**
Zegarek/Bransoletka, Szalik/Krawat, Szczoteczka do zębów/Grzebień, Aktor/Piosenkarz, Most/Tunel, Wyspa/Półwysep.
→ Zamienić na: Zegarek/Budzik, Szalik/Komin, Szczoteczka do zębów/Nić dentystyczna, Aktor/Kabareciarz, Most/Kładka, Wyspa/Plaża.

**Nierówna znajomość słów (jedno dużo mniej znane):**
Owca/Alpaka, Ping-pong/Squash, Gwiezdne wojny/Star Trek, Rzutki/Łucznictwo.
→ Zamienić na: Owca/Koza (Krowa/Koza już jest, więc Krowa/Bawół), Ping-pong/Badminton (Tenis/Badminton → Tenis/Squash), Gwiezdne wojny/Avengers, Rzutki/Kręgle (Kręgle/Bilard → Bilard/Snooker).

**Brakuje par z kategorii popkultura / internet / ludzie.** Propozycje nowych par (~30):
Batman/Zorro · Harry Potter/Opowieści z Narnii · Shrek/Król Lew · Wiedźmin/Gra o tron · Polsat/TVN · Messenger/WhatsApp · Uber/Bolt · Allegro/OLX · Spotify/Radio · Kopernik/Galileusz · Iga Świątek/Agnieszka Radwańska · Doda/Edyta Górniak · Ślub/Pogrzeb · Halloween/Bal przebierańców · Mundial/Olimpiada · Pączek/Faworki · Bigos/Gulasz · Sernik/Tiramisu · Choinka/Palma wielkanocna · Ksiądz/Sędzia · Sędzia piłkarski/Policjant drogowy · Dentysta/Fryzjer · Kominiarz/Dekarz · Zoo/Akwarium · Cyrk/Wesołe miasteczko · Sauna/Solarium · Tinder/Randka w ciemno · Studniówka/Wesele · Matura/Sesja · Kac/Jet lag

---

## 5. Pytania — ocena par

Pary są w większości bardzo dobre: ten sam typ odpowiedzi, podobny zakres liczb, ciekawe napięcie (np. „Kim chciałeś zostać jako dziecko?” ↔ „Jaki zawód jest najbardziej przereklamowany?”).

**Za blisko (ta sama odpowiedź u większości ludzi):**
- „Jaki jest twój ulubiony film?” ↔ „Jaki film widziałeś/aś najwięcej razy?” → impostor: „Jaki film ostatnio oglądałeś/aś w kinie?”
- „Czego najbardziej się boisz?” ↔ „Co najbardziej cię stresuje?” → impostor: „Czego najbardziej nie lubisz robić?”
- „Na czyj koncert poszedłbyś/poszłabyś jutro?” ↔ „Jakiego wykonawcy słuchasz najczęściej?” → impostor: „Jaki wykonawca jest przereklamowany?”

**Niedopasowany zakres liczb:**
- „Ile wydajesz na prezent dla przyjaciela?” (100–300 zł) ↔ „Ile kosztowały twoje najdroższe buty?” (300–1000 zł) → impostor: „Ile wydajesz miesięcznie na jedzenie na mieście?”

**Nowe pary (~15), w tym nowy typ „skala 1–10”, który daje dużo śmiechu:**
- Na ile (1–10) oceniasz swoje gotowanie? ↔ Na ile (1–10) oceniasz swój śpiew?
- Na ile (1–10) jesteś zazdrosny/a? ↔ Na ile (1–10) jesteś punktualny/a?
- Na ile (1–10) boisz się pająków? ↔ Na ile (1–10) boisz się dentysty?
- Kto z tej grupy byłby najlepszym szefem? ↔ Kto z tej grupy najszybciej wydałby wygraną w totka?
- Kto z tej grupy ma najdziwniejsze hobby? ↔ Kto z tej grupy pierwszy zasypia na imprezie?
- Kto z tej grupy wygrałby w „Milionerach”? ↔ Kto z tej grupy przeżyłby tydzień w lesie?
- Ile kosztuje dobre wesele (w tys. zł)? ↔ Ile kosztuje auto, którym chciał(a)byś jeździć (w tys. zł)?
- Ile lat ma twój telefon? ↔ Ile lat ma twoja najstarsza bluza?
- Ile minut wytrzymasz w zimnym morzu? ↔ Ile minut czekasz na spóźnialskiego, zanim pójdziesz?
- Ile razy dziennie jesz? ↔ Ile razy dziennie wychodzisz z domu?
- Jaka jest najgorsza praca na świecie? ↔ Jaką pracę wykonywałeś/aś najkrócej?
- Co zawsze bierzesz na wakacje? ↔ Czego ostatnio zapomniałeś/aś z domu?
- W jakim kraju jest najlepsze jedzenie? ↔ W jakim kraju chciał(a)byś pracować?
- Którego celebrytę chciał(a)byś mieć za sąsiada? ↔ Którego celebrytę zaprosił(a)byś na wesele?
- Jaki jest twój ulubiony emotikon? ↔ Jakim emotikonem najczęściej odpowiadasz mamie?

Zasada przy nowych pytaniach: unikać pytań tak/nie (za mało informacji) i pytań, na które ponad połowa ludzi odpowie identycznie.

---

## 6. Propozycje zmian w mechanice (opcjonalne, wymagają kodu)

1. **Trudność w trybie Undercover.** Dodać do par pole `"poziom": 1 | 2 | 3` (1 = wyraźna różnica, 2 = podobne, 3 = prawie identyczne) i opcję w ustawieniach. Dziś Undercover nie ma żadnego pokrętła trudności, a pary są bardzo różne.
2. **Nowy poziom wskazówki „Kameleon”** (z gry The Chameleon i z listy lokacji w Spyfall): zamiast skojarzenia impostor widzi **6–8 haseł z tej samej kategorii**, w tym prawdziwe. Daje uczciwą szansę na „Impostor zgadł hasło” bez podawania odpowiedzi na tacy. Pasowałby między Normalny a Trudny.
3. **Kategorie zamknięte a otwarte.** W Trudnym/Hardcore impostor łatwiej trafia w kategoriach o znanej puli (Kraje, Bajki, Sławni) niż w otwartych (Przedmioty, Czynności). Nie trzeba tego zmieniać — warto tylko wiedzieć przy dobieraniu kategorii na wieczór.

---

## 7. Plan rozbudowy treści

**Cel:** ~50 haseł na kategorię (teraz 36) + 5 nowych kategorii → ok. 1000 haseł; Undercover 194 → ~250 par z poziomami; Pytania 84 → ~120.

### Nowe kategorie — przykładowe hasła (już według zasad z pkt 1)

**⚽ Piłka nożna**
- Rzut karny: wapno, nerwy, jedenaście metrów
- Czerwona kartka: faul, prysznic, gwizdek
- Mundial: co cztery lata, flagi, faza grupowa
- Derby: sąsiedzi, emocje, jedno miasto
- Transfer: miliony, okno, plotki
- Spalony: linia, chorągiewka, VAR
- Szalik klubowy: trybuny, barwy, zima
- Ławka rezerwowych: czekanie, dres, rozgrzewka

**🎮 Gry komputerowe**
- Minecraft: kwadraty, kopanie, budowanie
- GTA: miasto, kradzież, misje
- Tetris: klocki, linie, przyspieszanie
- The Sims: domek, ludziki, kody na pieniądze
- Pokémon: łapanie, kieszeń, ewolucja
- Among Us: statek, zadania, głosowanie
- FIFA: pad, nowa wersja co roku, karty zawodników
- Wiedźmin 3: Polska, otwarty świat, gwint

**🎉 Święta i okazje**
- Śmigus-dyngus: woda, poniedziałek, wiadro
- Andrzejki: wosk, klucz, wróżby
- Prima aprilis: żart, kwiecień, naiwność
- Walentynki: serce, kwiaty, luty
- Mikołajki: but, grudzień, słodycze
- Komunia: rower, biały strój, maj
- Studniówka: polonez, sukienka, czerwona podwiązka
- Sala weselna: oczepiny, wujek, remiza

**🏫 Szkoła i studia**
- Wywiadówka: rodzice, oceny, stres
- Ściąga: piórnik, odwaga, kartkówka
- Wagary: park, wiosna, usprawiedliwienie
- Sesja: nieprzespane noce, notatki, kawa
- Wycieczka klasowa: autokar, pani, pamiątki
- Dziennik elektroniczny: powiadomienie, rodzice, uwaga
- Sklepik szkolny: drożdżówka, przerwa, kolejka
- Pokój nauczycielski: kawa, zakaz wstępu, plotki

**📱 Internet i życie online**
- Hasło do Wi-Fi: goście, router, naklejka
- Captcha: obrazki, robot, sygnalizacja świetlna
- Grupa rodzinna: ciocia, życzenia, obrazki z kawą
- Praca zdalna: kamera, wycisz mikrofon, piżama
- Unboxing: paczka, nożyczki, film
- Spam: skrzynka, wygrana, kliknij
- Mem: obrazek, napis, udostępnianie
- Zakupy na raty: kurier, później, przelew

---

## 8. Co dalej

Po akceptacji mogę:
1. Wprowadzić poprawki z pkt 2–3 do plików `dane/hasla/*.json` (bez zmian w kodzie).
2. Poprawić pary Undercover i pytania (pkt 4–5) i dopisać nowe.
3. Dodać nowe kategorie (pkt 7) — każda po ~36–50 haseł, dopisane do `dane/hasla/index.json`, podbita wersja w `sw.js`.
4. Osobno: mechanika z pkt 6 (poziomy Undercover, wskazówka „Kameleon”).

### Źródła
- [The Chameleon — Wikipedia](https://en.wikipedia.org/wiki/The_Chameleon_(party_game))
- [The Chameleon — recenzja Tabletop Gaming](https://www.tabletopgaming.co.uk/Reviews/the-chameleon-review)
- [How to Play the Imposter Game — gameonfamily](https://play.gameonfamily.com/imposter/how-to-play/)
- [Imposter game tips — imposter.app](https://imposter.app/imposter-game-tips/)
- [Undercover — bestpartygames](https://www.bestpartygames.net/games/undercover/undercover)
- [CoMet: Metaphor-Driven Covert Communication for Multi-Agent Language Games (arXiv)](https://arxiv.org/pdf/2505.18218)
