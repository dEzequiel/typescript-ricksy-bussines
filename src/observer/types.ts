import { CreditCard } from "../CreditCard";

interface GuestDispatcher {
    dispatch(card: CreditCard): void
}

export { GuestDispatcher }