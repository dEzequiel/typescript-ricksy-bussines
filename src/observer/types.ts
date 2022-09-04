import { Crystal } from './../subscribers/CrystalExpender';
import { CreditCard } from "../CreditCard";
import { Ufo } from "../subscribers/UfosPark";

interface GuestDispatcher {
    dispatch(card: CreditCard): void
}

export { GuestDispatcher }