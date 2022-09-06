import { Notificator } from "./../src/observer/Notificator";
import { Crystal, CrystalExpender } from "./../src/subscribers/CrystalExpender";
import { CreditCard } from "../src/domain/CreditCard";
import { Ufo, UfosPark } from "../src/subscribers/UfosPark";
import { showServices } from "../src/main";
import { UfoStatus } from "../src/subscribers/types";

describe("Testing the integration of the app", () => {
  it("should decrease money and assign ufo to each client", () => {
    const gearHead = new CreditCard("Gearhead", "8888888888888888");
    const abradolph = new CreditCard("Abradolph Lincler", "4916119711304546");
    const squanchy = new CreditCard("Squanchy", "4444444444444444");

    /**
     * TIENE
      NO TIENE
      TIENE UNA COSA 
     */

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

    const crystalExpender = new CrystalExpender(50);
    const ufosPark = new UfosPark();

    crystals.forEach(function (crystal: Crystal) {
      crystalExpender.add(crystal);
    });

    ufos.forEach(function (ufo: Ufo) {
      ufosPark.add(ufo);
    });
    const notificator = new Notificator();

    notificator.register(ufosPark);
    notificator.register(crystalExpender);

    expect(50).toBe(crystalExpender._price);
    expect(500).toBe(ufosPark.price);


    // TIENE TODO
    notificator.dispatch(gearHead);
    expect(showServices(gearHead, crystalExpender, ufosPark)).toStrictEqual({
      card: gearHead,
      packs: {
        name: "crystal one",
        owner: "8888888888888888",
      },
      ufo: {
        name: "uno",
        status: UfoStatus.Occupied,
        cardNumber: "8888888888888888",
      }
    });

    // NO TIENE NADA PORQUE GASTO DINERO
    abradolph.pay(3000)
    notificator.dispatch(abradolph)
    expect(showServices(abradolph, crystalExpender, ufosPark)).toStrictEqual({
      card: abradolph,
      packs: undefined,
      ufo: undefined
    })

  // SOLO TIENE CRYSTAL
    squanchy.pay(2950)
    notificator.dispatch(squanchy)
    expect(showServices(squanchy, crystalExpender, ufosPark)).toStrictEqual({
      card: squanchy,
      packs: {
        name: "crystal two",
        owner: "4444444444444444",
      },
      ufo: undefined
    })
  })
})

