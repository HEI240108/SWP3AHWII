// KM5-01 & KM5-02: Klasse Konto mit Kapselung, Invarianten und Identitaetspruefung (equals).

export class Konto {
  readonly iban: string;
  private _kontostand: number;

  constructor(iban: string, startkapital: number) {
    if (!iban || iban.trim().length === 0) {
      throw new Error("IBAN darf nicht leer sein");
    }
    // Invariante 1: Kontostand darf nie negativ geboren werden (Gedeckt-Invariante)
    if (startkapital < 0) {
      throw new Error(`Startkapital darf nicht negativ sein (war ${startkapital})`);
    }
    this.iban = iban.trim();
    this._kontostand = startkapital;
  }

  get kontostand(): number {
    return this._kontostand;
  }

  // Mutierende Methode: sichert Invariante 2 (nur positive Betraege)
  einzahlen(betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Einzahlungsbetrag muss strikt positiv sein (war ${betrag})`);
    }
    this._kontostand += betrag;
  }

  // Mutierende Methode: sichert Invariante 1 (Konto darf nicht ueberzogen werden)
  abheben(betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Abhebebetrag muss strikt positiv sein (war ${betrag})`);
    }
    if (this._kontostand - betrag < 0) {
      throw new Error(
        `Konto nicht gedeckt: Abhebung von ${betrag} bei Stand ${this._kontostand} nicht moeglich`,
      );
    }
    this._kontostand -= betrag;
  }

  // KM5-01: equals() vergleicht die fachliche Identitaet (IBAN), nicht den Kontostand
  equals(other: Konto): boolean {
    if (!other) return false;
    return this.iban === other.iban;
  }
}
