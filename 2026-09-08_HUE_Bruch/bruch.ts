function ggt(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export class Bruch {
  private zähler: number;
  private nenner: number;

  constructor(zähler: number, nenner: number) {
    if (nenner === 0) {
      throw new Error("Nenner darf nicht 0 sein");
    }
    // Vorzeichen normieren (Nenner immer positiv)
    if (nenner < 0) {
      zähler = -zähler;
      nenner = -nenner;
    }
    // Bruch immer gekürzt speichern (Invariante)
    const teiler = ggt(zähler, nenner);
    this.zähler = zähler / teiler;
    this.nenner = nenner / teiler;
  }

  addiere(other: Bruch): Bruch {
    return new Bruch(
      this.zähler * other.nenner + other.zähler * this.nenner,
      this.nenner * other.nenner,
    );
  }

  toString(): string {
    if (this.nenner === 1) {
      return `${this.zähler}`;
    }
    const ganz = Math.floor(Math.abs(this.zähler) / this.nenner);
    const rest = Math.abs(this.zähler) % this.nenner;
    const sign = this.zähler < 0 ? "-" : "";

    if (ganz > 0 && rest > 0) {
      return `${sign}${ganz} ${rest}/${this.nenner}`;
    }
    return `${this.zähler}/${this.nenner}`;
  }
}
