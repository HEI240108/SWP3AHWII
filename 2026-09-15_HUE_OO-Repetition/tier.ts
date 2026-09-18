// HÜ 15.09.2026: OO-Repetition — equals() und fuettern() für die Klasse Tier.
export class Tier {
  readonly name: string;
  private gewicht: number;

  constructor(name: string, gewicht: number) {
    this.name = name;
    this.gewicht = gewicht;
  }

  // Vergleicht Zustand (Name + Gewicht), nicht Identität.
  equals(other: Tier): boolean {
    return this.name === other.name && this.gewicht === other.gewicht;
  }

  // Erhöht das Gewicht um kg.
  fuettern(kg: number): void {
    this.gewicht += kg;
  }

  toString(): string {
    return `${this.name} (${this.gewicht} kg)`;
  }
}