import { assertEquals, assertThrows } from "@std/assert";
import { Konto } from "./konto.ts";
import { AboVertrag, EinmalRechnung, erstelleBuchungsbeleg } from "./vertrag.ts";

// ============================================================================
// Tests zu KM5-01: Klasse, Instanz, Zustand & Identitaet
// ============================================================================

Deno.test("KM5-01: equals() vergleicht fachliche Identitaet (IBAN), nicht den Saldo", () => {
  const k1 = new Konto("AT01", 100);
  const k2 = new Konto("AT01", 500); // Gleiche IBAN, anderer Stand
  assertEquals(k1.equals(k2), true);

  const k3 = new Konto("AT02", 100); // Gleicher Stand, andere IBAN
  assertEquals(k1.equals(k3), false);

  // Referenzidentitaet !== Fachliche Gleichheit
  assertEquals(k1 === k2, false);
});

Deno.test("KM5-01: Referenzsemantik bei Zuweisung (c = a)", () => {
  const a = new Konto("AT99", 500);
  const c = a;
  assertEquals(c === a, true);
  a.einzahlen(100);
  assertEquals(c.kontostand, 600);
});

// ============================================================================
// Tests zu KM5-02: Kapselung & Invarianten (Fail-Fast)
// ============================================================================

Deno.test("KM5-02: Invariante 1 — Negativer Startwert wird im Konstruktor abgelehnt", () => {
  assertThrows(
    () => new Konto("AT00", -10),
    Error,
    "Startkapital darf nicht negativ sein",
  );
});

Deno.test("KM5-02: Invariante 2 — Ungueltige Einzahlungs- und Abhebebetraege werfen", () => {
  const k = new Konto("AT05", 200);
  assertThrows(() => k.einzahlen(0), Error, "positiv");
  assertThrows(() => k.einzahlen(-50), Error, "positiv");
  assertThrows(() => k.abheben(0), Error, "positiv");
  assertThrows(() => k.abheben(300), Error, "nicht gedeckt");

  // Gueltiger Zustandsuebergang
  k.einzahlen(100);
  assertEquals(k.kontostand, 300);
  k.abheben(150);
  assertEquals(k.kontostand, 150);
});

// ============================================================================
// Tests zu KM5-03: Interfaces als Vertrag & Structural Typing
// ============================================================================

Deno.test("KM5-03: Beide unterschiedliche Klassen erfuellen den Vertrag 'Zahlbar'", () => {
  const rechnung = new EinmalRechnung("R-100", 10000, 10); // 100 EUR - 10% = 90 EUR
  const abo = new AboVertrag("ABO-55", 1500, 6);            // 6 Monate à 15 EUR = 90 EUR

  assertEquals(rechnung.berechneGesamtCent(), 9000);
  assertEquals(abo.berechneGesamtCent(), 9000);

  // Funktion erstelleBuchungsbeleg akzeptiert beide Klassen
  assertEquals(erstelleBuchungsbeleg(rechnung), "Beleg R-100: 90.00 EUR");
  assertEquals(erstelleBuchungsbeleg(abo), "Beleg ABO-55: 90.00 EUR");
});

Deno.test("KM5-03: Structural Typing — Objekt-Literal ohne class/implements wird akzeptiert", () => {
  const anonymPosten = {
    rechnungsNummer: "EXT-999",
    berechneGesamtCent: () => 450,
  };
  // Erfuellt die Form des Interface Zahlbar
  assertEquals(erstelleBuchungsbeleg(anonymPosten), "Beleg EXT-999: 4.50 EUR");
});
