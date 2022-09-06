import { CreditCard } from "../domain/CreditCard";
import { GuestDispatcher } from "./types";

export abstract class Observer implements GuestDispatcher {

  subscribers: GuestDispatcher[] = [];
  abstract register(subscriber: GuestDispatcher): void;
  abstract detach(subscriber: GuestDispatcher): void;

  /** When a new event occurs, the notifier loops
  the subscription list calling dispatch() itself 
  to discount subscriber price */
  dispatch(card: CreditCard): void {
    this.subscribers.forEach(function (s: GuestDispatcher) {
      s.dispatch(card);
    });
  }
}
