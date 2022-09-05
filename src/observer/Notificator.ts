import { CreditCard } from "../domain/CreditCard";
import { GuestDispatcher } from "./types";

export class Notificator implements GuestDispatcher {
  subscribers: GuestDispatcher[] = [];

  register(service: GuestDispatcher): void {
    const isExist = this.subscribers.includes(service);

    if (isExist) {
      return console.log("Subscriber has been attached already.");
    }

    console.log("Subscriber attached");
    this.subscribers.push(service);
  }

  detach(service: GuestDispatcher): void {
    const subscriberIndex: number = this.subscribers.indexOf(service);
    if (subscriberIndex === -1) {
      return console.log("Nonexistent subscriber");
    }

    this.subscribers.splice(subscriberIndex, 1);
  }

  /** When a new event occurs, the notifier loops
  the subscription list and calls the notify method
  declared in the GuestDispatcher interface on each subscriber object. */
  dispatch(card: CreditCard): void {
    this.subscribers.forEach(function (s: GuestDispatcher) {
      s.dispatch(card);
    });
  }

  get observers(): number {
    return this.subscribers.length;
  }
}
