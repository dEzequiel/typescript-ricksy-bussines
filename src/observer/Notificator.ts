import { Observer } from "./Observer";
import { GuestDispatcher } from "./types";

export class Notificator extends Observer {

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

  get observers(): number {
    return this.subscribers.length;
  }
}
