import { Crystal, CrystalExpender } from "./subscribers/CrystalExpender";
import { Notificator } from "./observer/Notificator";
import { CreditCard } from "./domain/CreditCard";
import { Ufo, UfosPark } from "./subscribers/UfosPark";
import { UfoStatus } from "./subscribers/types";

// Create 'observer' subscribers.
const crystalExpender = new CrystalExpender(50);
const ufosPark = new UfosPark();

// Create 'observer' notificator and add subscribers.
const notificator = new Notificator();

// Create fleet of available Ufos.
let ufos: Ufo[] = [
  {
    name: "uno",
    status: UfoStatus.Free,
    cardNumber: undefined,
  },
  {
    name: "dos",
    status: UfoStatus.Free,
    cardNumber: undefined,
  },
];

// Create inventory of available Crystals.
let crystals: Crystal[] = [
    {
      name: "crystal one",
      owner: undefined,
    },
    {
      name: "crystal two",
      owner: undefined,
    },
  ];

  crystals.forEach(function (crystal: Crystal) {
    crystalExpender.add(crystal);
  });

ufos.forEach(function (ufo: Ufo) {
  ufosPark.add(ufo);
});

// Register subscribers to notificator
notificator.register(ufosPark);
notificator.register(crystalExpender);

/////////////////////////////////////////////////////////////////////////////////
// Create credit cards
const gearHead = new CreditCard("Gearhead", "8888888888888888");
const abradolph = new CreditCard("Abradolph Lincler", "4916119711304546");
const squanchy = new CreditCard("Squanchy", "4444444444444444");
const morty = new CreditCard("Morty", "0000000000000000");
const birdpearson = new CreditCard("Birdpearson", "1111111111111111");
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
// Dispatcher behaviour possibilities

/** Squanchy has credit on his card and can hire services */
console.log("\nSquanchy arrives!\n" + "===============");
notificator.dispatch(squanchy);
showServices(squanchy, crystalExpender, ufosPark);

/** Gearhead can't hire services because has no credit */
console.log("\nGearhead arrives!\n" + "===============");
gearHead.pay(3000);
notificator.dispatch(gearHead);
showServices(gearHead, crystalExpender, ufosPark);

/** Birdpearson has credit on his card and can hire services */
console.log("\nBirdpearson arrives!\n" + "===============");
notificator.dispatch(birdpearson);
showServices(birdpearson, crystalExpender, ufosPark);

/** Morty tries to hire services but there are no more  */
console.log("\nMorty arrives!\n" + "===============");
notificator.dispatch(morty);
showServices(morty, crystalExpender, ufosPark);
/////////////////////////////////////////////////////////////////////////////////

interface GuestInformation {
  card: CreditCard;
  packs: Crystal | undefined ;
  ufo: Ufo | undefined;
}
function showServices(
  card: CreditCard,
  expender: CrystalExpender,
  ufo: UfosPark
) {
  let guest: GuestInformation = {
    card: card,
    packs: expender.serviceOf(card.numberCard),
    ufo: ufo.serviceOf(card.numberCard),
  };

  console.log(guest);
}
