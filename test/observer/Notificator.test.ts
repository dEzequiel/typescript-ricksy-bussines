import { CrystalExpender } from "./../../src/subscribers/CrystalExpender";
import { Notificator } from "../../src/observer/Notificator";
import { GuestDispatcher } from "../../src/observer/types";
import { UfosPark } from "../../src/subscribers/UfosPark";

let notificator: Notificator 

describe("Observer pattern: Notifier class", () => {
    let notificator: Notificator 
    let ufoPark: UfosPark;
    let crystalExpender: CrystalExpender;

  beforeEach(() => {
    notificator = new Notificator();
    ufoPark = new UfosPark();
    crystalExpender = new CrystalExpender(50);
  });
  it("shouldn't return null", () => {
    expect(notificator).toBeInstanceOf(Notificator);
    expect(notificator).toBeDefined();
    expect(notificator).not.toBeNull();
  });

  it("should add two new subscribers", () => {
    notificator?.register(ufoPark);
    notificator?.register(crystalExpender);

    expect(notificator?.observers).toBe(2);
  });

  it("should remove one subscriber", () => {
    notificator?.register(ufoPark);
    notificator?.register(crystalExpender);

    expect(notificator?.observers).toBe(2)

    notificator?.detach(ufoPark);
    expect(notificator?.observers).toBe(1)
  });
});
