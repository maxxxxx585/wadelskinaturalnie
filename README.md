# wadelskinaturalnie.pl — nowa struktura (multi-page)

## Co się zmieniło
Strona z jednej długiej strony z sekcjami (`#metody`, `#opinie` itd.) została rozbita na osobne podstrony, każda z własnym adresem URL, tytułem i meta-opisem (lepsze SEO, łatwiejsze linkowanie, szybsze ładowanie pojedynczej podstrony):

```
index.html            → strona główna (hero + filozofia + kafelki-skróty do wszystkich podstron)
metody.html           → 5 metod naturopatii
dolegliwosci.html     → komu mogę pomóc
proces.html           → jak wygląda konsultacja
gwarancja.html        → gwarancja efektów + cennik
dowody.html           → NOWA sekcja: dowody w badaniach krwi (patrz niżej)
o-mnie.html           → o mnie
opinie.html           → opinie / screenshoty
wiedza.html           → lista artykułów (dawna sekcja #blog)
faq.html              → pytania i odpowiedzi
kontakt.html          → kontakt

blog/                 → Twoje 3 istniejące artykuły, bez zmian w treści — tylko link
                        „Wróć do bloga" przekierowano na wiedza.html zamiast index.html#blog

assets/style.css       → wspólny plik CSS dla wszystkich podstron (Twój oryginalny design 1:1 + style dla nowej sekcji Dowody)
assets/script.js        → wspólny plik JS (nawigacja, cząsteczki, tilt, FAQ accordion — zabezpieczony,
                           żeby nie wysypywał się na podstronach bez hero-canvas)
```

Nawigacja (górne menu + menu mobilne) jest identyczna na każdej podstronie i podświetla aktywną stronę na złoto.

## 🔴 KRYTYCZNE: dlaczego zdjęcia się nie wyświetlają
Sprawdziłem Twoją stronę na żywo — **wszystkie pliki w folderze `images/` zwracają błąd 404** (np. `https://wadelskinaturalnie.pl/images/maks-naturopata.webp` nie istnieje na serwerze), mimo że kod HTML poprawnie się do nich odwołuje. To nie jest błąd w kodzie strony — to znaczy, że same pliki graficzne nie trafiły na GitHub Pages. Najczęstsze przyczyny:

1. **Folder `images/` nie został wypchnięty (`git push`) do repozytorium** — sprawdź na github.com w swoim repo, czy folder `images/` w ogóle tam jest i czy zawiera pliki (nie tylko lokalnie na dysku).
2. **Wielkość liter się nie zgadza** — GitHub Pages (Linux) rozróżnia wielkość liter, Windows/Mac — nie. Jeśli plik lokalnie nazywa się np. `Logo.webp`, a w kodzie jest `logo.webp`, lokalnie zadziała, na GitHub Pages — nie.
3. **`.gitignore` przypadkiem wyklucza obrazy** (np. wpis `*.webp` albo `images/`).
4. Upewnij się też, że w ustawieniach repo (Settings → Pages) publikowana jest właściwa gałąź/folder.

**Jak sprawdzić szybko:** wejdź na `https://wadelskinaturalnie.pl/images/logo.webp` bezpośrednio w przeglądarce. Jeśli widzisz błąd 404 — problem jest po stronie repozytorium, nie kodu. Ja użyłem dokładnie tych samych ścieżek (`images/...`) w nowych podstronach, więc gdy naprawisz folder `images/` w repo, obrazy pojawią się wszędzie naraz — na stronie głównej i na wszystkich podstronach.

## ✅ Sekcja Dowody (dowody.html) — zdjęcia już wgrane
Wgrałem przesłane przez Ciebie 4 zdjęcia wyników do `images/` (skompresowane do `.webp`, żeby nie obciążały strony) i podpiąłem je w `dowody.html`:

- `badanie-bilirubina-przed.webp` / `badanie-bilirubina-po.webp` — 1,46 mg/dl → 0,87 mg/dl
- `badanie-kreatynina-przed.webp` / `badanie-kreatynina-po.webp` — kreatynina 2,04 → 1,06 mg/dl, GFR 27,4 → 56 ml/min/1,73m²

**Zanim to opublikujesz, sprawdź jeszcze raz sam:**
1. Czy na zdjęciach faktycznie nic nie identyfikuje pacjentów — na zdjęciach papierowych część danych (PESEL, imię i nazwisko) jest już zaczerniona przez Ciebie, ale sprawdź też kody kreskowe/numery na dokumentach (np. numer księgi rejestrowej, kod kreskowy) — teoretycznie mogą być powiązane z inną dokumentacją placówki.
2. Czy masz od tych dwóch osób wyraźną zgodę na publikację ich (nawet zanonimizowanych) wyników badań w celach marketingowych na Twojej stronie — to dane o zdrowiu w rozumieniu RODO, więc to prawnie na Tobie jako administratorze danych.

Opisy przypadków celowo mówią o *zaobserwowanej poprawie w trakcie konsultacji*, a nie że to Ty „wyleczyłeś" wątrobę czy nerki — jako naturopata (nie lekarz) nie możesz reklamować się jako ktoś, kto leczy lub diagnozuje choroby, a inne równoległe czynniki (np. leczenie lekarskie) mogły też mieć wpływ na wynik. Polecam zostawić tę ostrożniejszą formułę.


## Wdrożenie (GitHub Pages)
1. Skopiuj zawartość tego folderu (bez `build/`, to tylko mój generator) do swojego repozytorium, **zachowując istniejący folder `images/`** z Twoimi prawdziwymi plikami graficznymi (nie nadpisuj pustym folderem z tej paczki).
2. Commit + push.
3. Sprawdź `https://wadelskinaturalnie.pl/` oraz kilka podstron, np. `/metody.html`, `/dowody.html`.

## Co zostało bez zmian
Treści, kolorystyka, fonty, animacje (liście, cząsteczki, tilt 3D), gwarancja 350 zł, dane kontaktowe, linki social media, JSON-LD schema na stronie głównej i FAQ — wszystko przeniesione 1:1, tylko rozbite na podstrony.
