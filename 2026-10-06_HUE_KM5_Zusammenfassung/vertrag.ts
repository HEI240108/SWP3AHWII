// KM5-03: Eigener Interface-Vertrag mit zwei unterschiedlichen Klassen

export interface Zahlbar {
  readonly rechnungsNummer: string;
  berechneGesamtCent(): number;
}

// Klasse 1: Einmalige Rechnung mit optionalem Rabatt in Prozent
export class EinmalRechnung implements Zahlbar {
  readonly rechnungsNummer: string;
  private grundbetragCent: number;
  private rabattProzent: number;

  constructor(rechnungsNummer: string, grundbetragCent: number, rabattProzent = 0) {
    if (grundbetragCent < 0) {
      throw new Error("Grundbetrag darf nicht negativ sein");
    }
    if (rabattProzent < 0 || rabattProzent > 100) {
      throw new Error("Rabatt muss zwischen 0 und 100 liegen");
    }
    this.rechnungsNummer = rechnungsNummer;
    this.grundbetragCent = grundbetragCent;
    this.rabattProzent = rabattProzent;
  }

  berechneGesamtCent(): number {
    return Math.round(this.grundbetragCent * (1 - this.rabattProzent / 100));
  }
}

// Klasse 2: Laufendes Abonnement mit Monatsbeitrag und Laufzeit in Monaten
export class AboVertrag implements Zahlbar {
  readonly rechnungsNummer: string;
  private monatsgebuehrCent: number;
  private monate: number;

  constructor(rechnungsNummer: string, monatsgebuehrCent: number, monate: number) {
    if (monatsgebuehrCent < 0) {
      throw new Error("Monatsgebuehr darf nicht negativ sein");
    }
    if (monate < 1) {
      throw new Error("Laufzeit muss mindestens 1 Monat betragen");
    }
    this.rechnungsNummer = rechnungsNummer;
    this.monatsgebuehrCent = monatsgebuehrCent;
    this.monate = monate;
  }

  berechneGesamtCent(): number {
    return this.monatsgebuehrCent * this.monate;
  }
}

// Funktion, die AUSSCHLIESSLICH den Vertragstyp 'Zahlbar' kennt (Polymorphismus via Interface)
export function erstelleBuchungsbeleg(posten: Zahlbar): string {
  const euro = (posten.berechneGesamtCent() / 100).toFixed(2);
  return `Beleg ${posten.rechnungsNummer}: ${euro} EUR`;
}
