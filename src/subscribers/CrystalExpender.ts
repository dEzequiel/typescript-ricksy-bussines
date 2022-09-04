import { CreditCard } from "../CreditCard";
import { GuestDispatcher } from "../observer/types";

export type Crystal = {
  [key: string]: string | number | undefined;
  name: string;
  owner: string | undefined;
};

export class CrystalExpender implements GuestDispatcher {
  private inventory: Crystal[] = [];
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  get stock(): number {
    return this.inventory.length;
  }

  add(crystal: Crystal): void {
    this.inventory.push(crystal);
  }

  dispatch(card: CreditCard): void {
    let crystal: Crystal = this.inventory.find((c) => c.owner === undefined)!;

    if (crystal && this.inventory.length > 0 && card.pay(this.price)) {
      crystal.owner = card.numberCard;
    }
  }

  serviceOf(cardNumber: string): Crystal | undefined {
    let crystal: Crystal | undefined = this.inventory.find(
      (u) => u.owner === cardNumber
    );

    if (crystal) return crystal;
    else return undefined;
  }
}
