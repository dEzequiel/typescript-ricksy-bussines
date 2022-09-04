import { CreditCard } from "../domain/CreditCard";
import { GuestDispatcher } from "./types";

export class Notificator implements GuestDispatcher {

  subscribers: GuestDispatcher[] = [];

  register(service: GuestDispatcher): void {
    this.subscribers.push(service);
  }

  dispatch(card: CreditCard): void {
    this.subscribers.forEach(function (s: GuestDispatcher) {
      s.dispatch(card)
    })
  }
}
