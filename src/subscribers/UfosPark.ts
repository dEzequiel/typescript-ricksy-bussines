import { CreditCard } from "../CreditCard";
import { GuestDispatcher } from "../observer/types";
import { UfoStatus } from "./types";

// index signature'
type Ufo = {
  [key: string]: string | undefined | UfoStatus;
  name: string;
  status: UfoStatus;
  cardNumber: string | undefined;
};

class UfosPark implements GuestDispatcher {
  fleet: Ufo[] = [];
  price: number = 500;

  add(ufo: Ufo): void {
    this.fleet.push(ufo);
  }

  dispatch(card: CreditCard): void {
    let ufo: Ufo = this.fleet.find((u) => u.cardNumber === undefined)!

    if (ufo && this.fleet.length > 0 && card.pay(this.price)) {
      ufo.cardNumber = card.numberCard;
      ufo.status = UfoStatus.Occupied
    }
  }

  serviceOf(cardNumber: string): Ufo | undefined {
    let ufo: Ufo | undefined = this.fleet.find(
      (u) => u.cardNumber === cardNumber
    );

    if (ufo) return ufo;
    else return undefined;
  }

  containsCard(name: string): boolean {
    if (this.fleet.find((u) => u.name === name)?.status === UfoStatus.Occupied) {
      return true;
    }


    return false;
  }

  cardNumbers(): Ufo[] {
    let ufos: Ufo[] = [];

    this.fleet.forEach(function (ufo: Ufo) {
      if (ufo.cardNumber != undefined) {
        ufos.push(ufo);
      }
    });
    return ufos;
  }
}

export { Ufo, UfosPark };
