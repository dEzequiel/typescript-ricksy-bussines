import { CreditCard } from "../domain/CreditCard";

interface GuestDispatcher {
    dispatch(card: CreditCard): void
}

export { GuestDispatcher }