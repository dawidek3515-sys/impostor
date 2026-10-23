// Szablony ekranów (wygląd „Stół”). Każda funkcja zwraca HTML; akcje oznaczone data-a obsługuje app.js.
import { S, pkt, MIN_GRACZY, MAX_GRACZY } from './stan.js';
import { TRYBY, tryb } from './tryby/index.js';
import { MODY } from './modyfikatory/index.js';
import { WYNIKI } from './runda.js';
import * as dane from './dane.js';

export const TIMERY = [{ v: 1, n: '1 min' }, { v: 2, n: '2 min' }, { v: 3, n: '3 min' }, { v: 5, n: '5 min' }, { v: 0, n: 'Bez timera' }];
export const CELE = [{ v: 5, n: 'do 5 pkt' }, { v: 10, n: 'do 10 pkt' }, { v: 15, n: 'do 15 pkt' }, { v: 0, n: 'bez końca' }];

const LOGO = `<svg class="logo" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 3C17 3 9 16 9 31v28h46V31C55 16 47 3 32 3z" fill="#9d8bff" stroke="#2b2140" stroke-width="3"/><path d="M32 14c-9 0-15 8-15 19s6 20 15 20 15-9 15-20-6-19-15-19z" fill="#2b2140"/><text x="32" y="45" text-anchor="middle" font-size="26" font-weight="800" fill="#ffd43b" font-family="system-ui,sans-serif">?</text></svg>`;

/* ---------- pomocnicze ---------- */
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const n = () => S.gracze.length;
const imie = i => esc(S.gracze[i].imie);
const kolor = i => S.gracze[i].kolor;
const on = warunek => (warunek ? 'on' : '');
export const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const inicjal = i => esc([...S.gracze[i].imie][0]?.toUpperCase() ?? '?');
const awatar = i => `<span class="av" style="--c:${kolor(i)}">${inicjal(i)}</span>`;
const pill = i => `<b class="imie-pill" style="--c:${kolor(i)}">${imie(i)}</b>`;
const lacz = lista => (lista.length > 1 ? `${lista.slice(0, -1).join(', ')} i ${lista.at(-1)}` : lista[0] ?? '');

export function zwyciezcy() {
  const cel = S.ust.cel;
  const top = Math.max(0, ...S.gracze.map(g => pkt(g.imie)));
  return cel && top >= cel ? S.gracze.filter(g => pkt(g.imie) === top) : [];
}

function podsumowanie() {
  const t = tryb(S.ust.tryb);
  const opcjaTrybu = t.opcje.map(o => o.wartosci.find(w => w.v === S.ust[o.klucz])?.n);
  const mody = MODY.filter(m => S.ust.mody[m.id] && n() >= m.minGraczy).map(m => m.nazwa);
  const kat = t.uzywaKategorii ? [`${dane.kategorie().filter(k => dane.czyWlaczona(k, S.ust) && k.hasla.length).length} kategorii`] : [];
  return [t.nazwa, ...opcjaTrybu, ...mody, S.ust.timer ? `${S.ust.timer} min` : 'bez timera', S.ust.cel ? `do ${S.ust.cel} pkt` : 'bez końca', ...kat].filter(Boolean);
}

const kroki = k => `<div class="kroki">${['Gracze', 'Ustawienia', 'Gra'].map((s, j) => `<span class="${on(j + 1 <= k)}"><b>${j + 1}</b>${s}</span>`).join('<i></i>')}</div>`;

// Stół z pionkami. Kolejność przy stole = kolejność podawania telefonu (zgodnie z ruchem wskazówek).
function stol({ teraz = -1, widzieli = -1, srodek = '', usun = false, impostorzy = null, korona = [], mikrofon = -1, maly = false } = {}) {
  const pionki = S.gracze.map((g, j) => {
    const kat = ((-90 + (360 * j) / n()) * Math.PI) / 180;
    const imp = impostorzy?.includes(j);
    const klasy = [j === teraz && 'teraz', j < widzieli && 'widzial', impostorzy && !imp && 'przygaszony', imp && 'impostor'].filter(Boolean).join(' ');
    const nad = korona.includes(j) ? '👑' : j === mikrofon ? '🎤' : '';
    return `<div class="pionek ${klasy}" style="left:${50 + 40 * Math.cos(kat)}%;top:${50 + 40 * Math.sin(kat)}%">
      ${nad ? `<span class="nad">${nad}</span>` : ''}
      ${imp ? `<span class="av">${LOGO}</span>` : awatar(j)}
      <span class="imie">${imie(j)}</span>
      ${usun ? `<button class="usun" data-a="usunGracza" data-i="${j}" aria-label="Usuń gracza ${imie(j)}">✕</button>` : ''}
    </div>`;
  }).join('');
  return `<div class="stol ${maly ? 'maly' : ''}"><div class="blat">${srodek}</div>${pionki}</div>`;
}

const listaHasel = pozycje => `<div class="hasla">${pozycje.map(p => `<small>${esc(p.etykieta)}</small><b class="${p.male ? 'male' : ''}">${esc(p.tekst)}</b>`).join('<hr>')}</div>`;

/* ---------- ekrany ---------- */

export function ladowanie() {
  return `<div class="ekran ladowanie">
    <div class="logo-duze">${LOGO}</div>
    ${S.blad
      ? `<p>Nie udało się wczytać haseł.</p><p class="notka">Przy pierwszym uruchomieniu potrzebny jest internet.</p><button class="btn" data-a="ponowLadowanie">Spróbuj ponownie</button>`
      : '<p>Tasujemy hasła…</p>'}
  </div>`;
}

export function gracze() {
  const zaMalo = n() < MIN_GRACZY;
  const pelno = n() >= MAX_GRACZY;
  return `<div class="ekran">
    <div class="marka">${LOGO}Impostor</div>
    ${kroki(1)}
    <h1 class="tytul">Kto siada do stołu?</h1>
    ${stol({ usun: true, srodek: n() ? `<b>${n()}</b><small>${zaMalo ? `min. ${MIN_GRACZY}` : `z ${MAX_GRACZY} miejsc`}</small>` : '<span class="duza-ikona">🪑</span><small>dodaj graczy</small>' })}
    <form class="dodaj" data-form="gracz">
      <input name="imie" placeholder="${pelno ? `Stół pełny (maks. ${MAX_GRACZY})` : 'Imię gracza'}" maxlength="14" autocomplete="off" autocapitalize="words" enterkeyhint="done" aria-label="Imię gracza" ${pelno ? 'disabled' : ''}>
      <button ${pelno ? 'disabled' : ''}>Dodaj</button>
    </form>
    <p class="notka">Dodawajcie się w kolejności, w jakiej siedzicie — tak będzie wędrował telefon.</p>
    <div class="rosnie"></div>
    ${S.gra.trwa
      ? `<button class="btn" data-a="nastepnaRunda" ${zaMalo ? 'disabled' : ''}>Graj dalej — punkty zostają →</button>
         <button class="btn jasny" data-a="idz" data-e="ustawienia">⚙️ Ustawienia / nowa gra</button>`
      : `<button class="btn" data-a="idz" data-e="ustawienia" ${zaMalo ? 'disabled' : ''}>Dalej →</button>`}
  </div>`;
}

export function ustawienia() {
  const t = tryb(S.ust.tryb);
  const kat = dane.kategorie();
  const wlaczone = kat.filter(k => dane.czyWlaczona(k, S.ust) && k.hasla.length);
  const brakHasel = t.uzywaKategorii && !wlaczone.length;
  const zaMalo = n() < MIN_GRACZY;
  const chipy = (klucz, lista) => `<div class="chipy">${lista.map(o => `<button class="${on(S.ust[klucz] === o.v)}" data-a="ustaw" data-k="${klucz}" data-v="${o.v}">${o.n}</button>`).join('')}</div>`;

  return `<div class="ekran">
    <div class="podsumowanie"><small>WASZA GRA</small><div>${podsumowanie().map(s => `<span>${esc(s)}</span>`).join('')}</div></div>
    <button class="wstecz" data-a="idz" data-e="gracze">← Gracze</button>
    ${kroki(2)}

    <section><h3>Tryb</h3>
      <div class="chipy">${TRYBY.map(x => `<button class="${on(x.id === t.id)}" data-a="ustaw" data-k="tryb" data-v="${x.id}">${x.ikona} ${x.nazwa}</button>`).join('')}</div>
      <p class="opis">${t.opis}</p>
    </section>

    ${t.opcje.map(o => `<section><h3>${o.nazwa}</h3>${chipy(o.klucz, o.wartosci)}<p class="opis">${o.wartosci.find(w => w.v === S.ust[o.klucz])?.d ?? ''}</p></section>`).join('')}

    <section><h3>Modyfikatory</h3>
      <div class="chipy">${MODY.map(m => {
        const dostepny = n() >= m.minGraczy;
        return `<button class="${on(S.ust.mody[m.id] && dostepny)}" data-a="modyfikator" data-k="${m.id}" ${dostepny ? '' : 'disabled'}>${m.ikona} ${m.nazwa}${dostepny ? '' : ` (od ${m.minGraczy} graczy)`}</button>`;
      }).join('')}</div>
      <p class="opis">${MODY.map(m => `<b>${m.nazwa}:</b> ${m.opis}`).join('<br>')}</p>
    </section>

    <section><h3>Timer dyskusji</h3>${chipy('timer', TIMERY)}</section>
    <section><h3>Gramy</h3>${chipy('cel', CELE)}</section>

    ${t.uzywaKategorii
      ? `<section><h3>Kategorie (${wlaczone.length})</h3>
          <div class="lista-kat">${kat.map(k => {
            const wl = dane.czyWlaczona(k, S.ust);
            const puste = !k.hasla.length;
            return `<button class="${on(wl && !puste)}" data-a="kategoria" data-id="${k.id}" ${puste ? 'disabled' : ''}>${k.ikona}<span>${esc(k.nazwa)} <small>· ${puste ? 'pusto' : `${k.hasla.length} haseł`}${k.dorosle ? ' · 18+' : ''}</small></span><i>${wl && !puste ? '✓' : ''}</i></button>`;
          }).join('')}</div>
          <button class="link" data-a="idz" data-e="nasze">💬 Dodaj własne hasła „Nasze” ›</button>
          ${brakHasel ? '<p class="opis">Włącz przynajmniej jedną kategorię.</p>' : ''}
        </section>`
      : `<section><h3>Kategorie</h3><p class="opis">W trybie ${t.nazwa} losujemy ${t.id === 'pytania' ? 'pary pytań' : 'pary podobnych haseł'} — kategorie nie mają tu znaczenia.</p></section>`}

    <div class="dol">
      ${S.gra.trwa
        ? `<button class="btn" data-a="nastepnaRunda" ${zaMalo || brakHasel ? 'disabled' : ''}>Graj dalej — punkty zostają →</button>
           <button class="btn jasny" data-a="nowaGra" ${zaMalo || brakHasel ? 'disabled' : ''}>Nowa gra od zera</button>`
        : `<button class="btn" data-a="nowaGra" ${zaMalo || brakHasel ? 'disabled' : ''}>Rozdaj role 🎴</button>`}
    </div>
  </div>`;
}

export function nasze() {
  const lista = dane.naszeHasla();
  return `<div class="ekran">
    <button class="wstecz" data-a="idz" data-e="ustawienia">← Ustawienia</button>
    <h1 class="tytul">Nasze hasła 💬</h1>
    <p class="notka lewo">Wasze własne hasła — wewnętrzne żarty, znajomi, miejsca. Trafiają do kategorii „Nasze”.</p>

    <form class="karta formularz" data-form="nasze">
      <label>Hasło<input name="haslo" maxlength="40" autocomplete="off" required></label>
      <label>Kategoria <small>— impostor może ją zobaczyć jako wskazówkę</small>
        <input name="kategoria" maxlength="30" autocomplete="off" list="lista-kategorii" placeholder="np. Ekipa">
        <datalist id="lista-kategorii">${dane.nazwyKategorii().map(k => `<option value="${esc(k)}">`).join('')}</datalist>
      </label>
      <label>Skojarzenie <small>— opcjonalnie</small><input name="skojarzenie" maxlength="30" autocomplete="off"></label>
      <button class="btn">Dodaj hasło</button>
    </form>

    <div class="karta">
      <h3 class="naglowek">Na liście: ${lista.length}</h3>
      ${lista.length
        ? `<div class="lista-nasze">${lista.map((h, i) => `<div><span>${esc(h.haslo)}<small>${esc([h.kategoria, h.skojarzenie].filter(Boolean).join(' · ') || 'bez kategorii')}</small></span><button data-a="usunNasze" data-i="${i}" aria-label="Usuń ${esc(h.haslo)}">✕</button></div>`).join('')}</div>`
        : '<p class="opis">Jeszcze nic tu nie ma.</p>'}
    </div>

    <div class="rzad">
      <button class="btn jasny" data-a="eksport" ${lista.length ? '' : 'disabled'}>📋 Eksportuj</button>
      <button class="btn jasny" data-a="pokazImport">📥 Importuj</button>
    </div>
    ${S.eksportTekst ? `<div class="karta formularz"><label>Skopiuj ręcznie:<textarea rows="6" readonly>${esc(S.eksportTekst)}</textarea></label></div>` : ''}
    ${S.importuj ? `<form class="karta formularz" data-form="import"><label>Wklej wyeksportowany JSON<textarea name="json" rows="6"></textarea></label><button class="btn">Wczytaj</button></form>` : ''}
    <p class="notka lewo">Eksport kopiuje listę jako JSON. Zapisz go w notatce albo jako plik w <b>dane/hasla/</b> — wtedy nic nie zniknie przy czyszczeniu Safari.</p>
  </div>`;
}

export function rozdanie() {
  const i = S.odkryty;
  const t = tryb(S.runda.tryb);
  const karta = t.karta(S.runda.dane, S.runda.impostorzy.includes(i));
  const ostatni = i === n() - 1;
  return `<div class="ekran bez-zaznaczania">
    <div class="gora"><span class="tura">Runda ${S.gra.nrRundy}</span><button class="link maly" data-a="przerwij">Przerwij rundę</button></div>
    ${stol({ maly: true, teraz: i, widzieli: i, srodek: '<span class="duza-ikona">📱</span>' })}
    <p class="podaj">Podaj telefon: ${pill(i)}</p>
    <div class="koperta" data-hold>
      <div class="wnetrze ${karta.imp ? 'imp' : ''}">
        ${karta.etykieta ? `<small class="r-etykieta">${esc(karta.etykieta)}</small>` : ''}
        ${karta.imp ? `<div class="r-kaptur">${LOGO}</div>` : ''}
        <div class="r-tekst ${karta.pytanie ? 'pytanie' : ''}">${esc(karta.tekst)}</div>
        ${karta.pod ? `<p class="r-pod">${esc(karta.pod)}</p>` : ''}
      </div>
      <div class="klapka"><span><span class="reka">✋</span>Przytrzymaj, żeby zobaczyć<small>puść — i karta się zasłoni</small></span></div>
    </div>
    <button class="btn" data-a="dalejRozdanie" ${S.widzial ? '' : 'disabled'}>${ostatni ? 'Wszyscy wiedzą — start! ⏱️' : `Dalej → ${imie(i + 1)}`}</button>
  </div>`;
}

export function gra() {
  const r = S.runda;
  const t = tryb(r.tryb);
  const z = S.zegar;
  const calosc = S.ust.timer * 60;
  const st = r.startTury % n();
  const kolejka = [...Array(n()).keys()].map(k => (st + k) % n());
  const stolik = t.naStol(r.dane);
  const srodek = calosc
    ? `<b data-zegar>${fmt(z.pozostalo)}</b><small data-zegar-opis>${z.skonczony ? 'czas minął!' : z.pauza ? 'pauza' : 'dyskusja'}</small>`
    : '<b>∞</b><small>bez timera</small>';

  return `<div class="ekran ${z.skonczony ? 'koniec-czasu' : ''}">
    <div class="gora"><span class="tura">Runda ${S.gra.nrRundy}${r.tura > 1 ? ` · tura ${r.tura}` : ''}</span></div>
    ${stol({ maly: true, mikrofon: st, teraz: st, srodek })}
    <p class="podaj">Zaczyna ${pill(st)}</p>
    <div class="kolejnosc">${kolejka.map((j, k) => `<span>${k ? '→ ' : ''}${imie(j)}</span>`).join('')}</div>
    <p class="notka">${t.instrukcja} Potem dyskusja i głosowanie na głos.</p>
    ${calosc ? `<div class="piasek"><i data-piasek style="width:${(z.pozostalo / calosc) * 100}%"></i></div>` : ''}
    ${stolik ? (S.pokazPytanie
      ? `<div class="karta">${listaHasel([{ etykieta: stolik.etykieta, tekst: stolik.tekst, male: true }])}</div>`
      : `<button class="btn jasny" data-a="pokazPytanie">${stolik.przycisk}</button>`) : ''}
    <div class="rosnie"></div>
    <div class="rzad">
      ${calosc ? `<button class="btn jasny" data-a="pauza" ${z.skonczony ? 'disabled' : ''}>${z.pauza ? '▶ Wznów' : '⏸ Pauza'}</button>` : ''}
      <button class="btn jasny" data-a="kolejnaTura">🔁 Jeszcze jedna tura</button>
    </div>
    <button class="btn czerwony" data-a="odslon">Pokaż impostora 👀</button>
  </div>`;
}

export function odslona() {
  const r = S.runda;
  const t = tryb(r.tryb);
  const imp = r.impostorzy;
  let tytul;
  let srodek;
  if (r.chaos === 'brak') { tytul = 'Nie było żadnego impostora!'; srodek = '<span class="duza-ikona">🎲</span>'; }
  else if (r.chaos === 'wszyscy') { tytul = 'Wszyscy byli impostorami!'; srodek = '<span class="duza-ikona">🎲</span>'; }
  else { tytul = imp.length > 1 ? `To byli: ${lacz(imp.map(imie))}!` : `To był(a) ${imie(imp[0])}!`; srodek = `<span class="duza-ikona">😱</span>`; }

  return `<div class="ekran">
    ${r.chaos ? '<div class="chaos-baner">🎲 CHAOS</div>' : ''}
    ${stol({ maly: true, impostorzy: r.chaos === 'brak' ? [] : imp, srodek })}
    <h1 class="tytul srodek">${tytul}</h1>
    <div class="karta">${listaHasel(t.odslona(r.dane))}</div>
    <div class="rosnie"></div>
    ${r.chaos
      ? '<button class="btn" data-a="rozliczChaos">+1 dla każdego — dalej →</button>'
      : '<button class="btn" data-a="idz" data-e="wynik">Co się stało? →</button>'}
  </div>`;
}

export function wynik() {
  const r = S.runda;
  const t = tryb(r.tryb);
  const dwoch = r.impostorzy.length > 1;
  return `<div class="ekran">
    <button class="wstecz" data-a="idz" data-e="odslona">← Odsłonięcie</button>
    <h1 class="tytul">Co się stało?</h1>
    ${r.impostorzy.map(i => `<section>
      <h3>${dwoch ? `Impostor: ${imie(i)}` : 'Wybierz jedno'}</h3>
      <div class="kostki">${t.wyniki.map(w => {
        const W = WYNIKI[w];
        return `<button class="${on(S.wybory[i] === w)}" data-a="wynik" data-imp="${i}" data-w="${w}" aria-label="${W.opis}"><b>${W.ikona}</b><strong>${W.nazwa}</strong><em>${W.punkty}</em></button>`;
      }).join('')}</div>
    </section>`).join('')}
    <p class="notka lewo">${t.wyniki.map(w => `<b>${WYNIKI[w].nazwa}</b> — ${WYNIKI[w].opis.toLowerCase()}`).join('<br>')}</p>
    ${dwoch ? '<p class="notka">Wybierz wynik dla każdego impostora osobno.</p>' : ''}
  </div>`;
}

export function tabela() {
  const cel = S.ust.cel;
  const max = cel || Math.max(5, ...S.gracze.map(g => pkt(g.imie))) + 2;
  const sa = zwyciezcy().length > 0;
  return `<div class="ekran">
    <h1 class="tytul">Wyścig ${cel ? `do ${cel} pkt` : 'bez końca'} 🏁</h1>
    <div class="wyscig">${S.gracze.map((g, i) => {
      const p = pkt(g.imie);
      const d = S.delta[g.imie];
      return `<div class="tor-wiersz">
        <button class="pm" data-a="korekta" data-i="${i}" data-d="-1" aria-label="Odejmij punkt: ${imie(i)}">−</button>
        <div class="tor"><span class="meta">🏁</span><div class="zeton" style="left:${2 + Math.min(1, p / max) * 50}%">${awatar(i)}<span>${imie(i)} · ${p}${d ? ` <b class="delta">+${d}</b>` : ''}</span></div></div>
        <button class="pm" data-a="korekta" data-i="${i}" data-d="1" aria-label="Dodaj punkt: ${imie(i)}">+</button>
      </div>`;
    }).join('')}</div>
    <p class="notka">+ / − to ręczna korekta, np. za świetny blef.</p>
    <div class="rosnie"></div>
    <div class="rzad">
      <button class="btn jasny" data-a="idz" data-e="gracze">👥 Gracze</button>
      <button class="btn jasny" data-a="idz" data-e="ustawienia">⚙️ Ustawienia</button>
    </div>
    ${sa
      ? '<button class="btn" data-a="idz" data-e="zwyciezca">Zobacz zwycięzcę 🏆</button>'
      : `<button class="btn" data-a="nastepnaRunda" ${n() < MIN_GRACZY ? 'disabled' : ''}>Następna runda →</button>`}
  </div>`;
}

export function zwyciezca() {
  const wygrani = zwyciezcy();
  const ranking = S.gracze.map((g, i) => ({ i, p: pkt(g.imie) })).sort((a, b) => b.p - a.p);
  const indeksy = wygrani.map(w => S.gracze.indexOf(w));
  return `<div class="ekran">
    ${stol({ korona: indeksy, srodek: '<span class="duza-ikona">🏆</span>' })}
    <h1 class="tytul srodek">Wygrywa ${lacz(indeksy.map(imie))}!</h1>
    <div class="karta ranking">${ranking.map((x, k) => `<div><span>${['🥇', '🥈', '🥉'][k] ?? `${k + 1}.`}</span>${awatar(x.i)}<span>${imie(x.i)}</span><span>${x.p}</span></div>`).join('')}</div>
    <div class="rosnie"></div>
    <button class="btn" data-a="nowaGra">Nowa gra 🎴</button>
    <button class="btn jasny" data-a="idz" data-e="gracze">👥 Zmień graczy / ustawienia</button>
  </div>`;
}
