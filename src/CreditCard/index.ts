class CreditCard {
  private owner: string;
  private number: string;
  private credit: number = 3000;
  private SYMBOL: string;

  constructor(_owner: string, _number: string) {
    this.owner = _owner;
    this.number = _number;
  }

  //  pay(price: number): boolean {}

  get numberCard(): string {
    return this.number;
  }

  get ownerCard(): string {
    return this.owner;
  }

  get cardCredit(): number {
    return this.credit;
  }

  pay(price: number): void {
    if (this.credit >= price) this.credit -= price;
  }
}

export { CreditCard };
