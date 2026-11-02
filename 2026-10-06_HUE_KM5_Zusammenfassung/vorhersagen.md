# Ausarbeitung KM5 Hausübungen 1–3: Vorhersagen & Konzepte

**Name:** Jonas  
**Klasse:** 3AHWII  
**Fach:** SWP (KM5 OOP-Fundament)  
**Datum:** 06.10.2026 (überarbeitet: 02.11.2026)

---

## 1. KM5-01 — Klasse, Instanz, Zustand

### Vorhersage 1a:
* **Frage:** `const c = a;` — Wie viele Konto-Objekte gibt es, wie viele Variablen? Gilt `c === a`?
* **Antwort:**  
  Es gibt **ein einziges Objekt** auf dem Heap und **zwei Variablen** (`a` und `c`) auf dem Stack, die beide dieselbe Speicheradresse referenzieren.  
  Ja, `c === a` ergibt `true`, da der strikte Gleichheitsoperator bei Objekten die **Referenzidentität** (Speicheradresse) vergleicht.

### Vorhersage 1b:
* **Frage:** Nach `a.einzahlen(100)`: Was liefert `c.kontostand` — 500 oder 600? Warum?
* **Antwort:**  
  `c.kontostand` liefert **600**. Da `a` und `c` auf dieselbe Instanz zeigen, mutiert die Methode `a.einzahlen()` den Zustand genau dieses einen geteilten Objekts (Referenzsemantik / Aliasing).

---

## 2. KM5-02 — Kapselung & Invarianten

### Vorhersage 2a:
* **Frage:** Bei welchem Feld schlägt `deno check` auf `k.kontostand = -1` fehl: `public` oder `private`? Was passiert jeweils zur Laufzeit?
* **Antwort:**  
  - Bei `private` bricht bereits der TypeScript-Compiler (`deno check`) zur **Entwicklungs-/Übersetzungszeit** mit einem Typprüfungsfehler ab (`Property 'kontostand' is private and only accessible within class 'Konto'`).
  - Bei `public` kompiliert der Code fehlerfrei; zur **Laufzeit** wird der ungültige negative Kontostand unbemerkt zugewiesen, was die Invariante bricht.

### Vorhersage 2b:
* **Frage:** Der Konstruktor wirft bei negativem Startwert. Wie viele Objekte existieren nach `new Konto(-5)` — null oder ein halbfertiges?
* **Antwort:**  
  Es existiert **kein (null) erreichbares Objekt**. Wenn der Konstruktor mit `throw new Error(...)` abbricht, wird die Objekterzeugung abgebrochen; die Referenz wird der Variablen gar nicht erst zugewiesen und ein halbfertiges/kaputtes Objekt gelangt nie in den Programmzustand (Fail-Fast).

---

## 3. KM5-03 — Interfaces als Vertrag

### Vorhersage 3a:
* **Frage:** Eine Klasse schreibt `implements Verzinsbar`, vergisst aber `jahresZins()`. Kompiliert das — und wo meckert TypeScript?
* **Antwort:**  
  Nein, der Code kompiliert nicht. TypeScript bricht bereits bei der Klassendeklaration ab mit der Fehlermeldung:  
  `Class 'Sparkonto' incorrectly implements interface 'Verzinsbar'. Property 'jahresZins' is missing in type 'Sparkonto' but required in type 'Verzinsbar'`.

### Vorhersage 3b:
* **Frage:** Ein Objekt mit `jahresZins`, aber ohne `implements`, wird einer Variablen vom Typ `Verzinsbar` zugewiesen. Erlaubt oder nicht — und warum?
* **Antwort:**  
  **Ja, es ist erlaubt.** TypeScript verwendet **Structural Typing** (Duck Typing). Für den Compiler zählt ausschließlich die Gestalt (Shape/Methodensignatur) des Objekts, nicht dessen Name oder eine explizite Vererbungshierarchie.
