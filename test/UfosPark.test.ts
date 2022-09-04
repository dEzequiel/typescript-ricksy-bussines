import { CreditCard } from "../src/CreditCard";
import { UfoStatus } from "../src/subscribers/types";
import { Ufo, UfosPark } from "../src/subscribers/UfosPark";

describe("UfosPark class", () => {
  const card = new CreditCard("Abradolf Lincler", "4916119711304546");
  let ufosPark: UfosPark;
  beforeEach(() => {
    ufosPark = new UfosPark();

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

    ufos.forEach(function (ufo: Ufo) {
      ufosPark.add(ufo);
    });
  });

  it("shouldn't return null", () => {
    expect(ufosPark).toBeInstanceOf(UfosPark);
    expect(ufosPark).toBeDefined();
    expect(ufosPark).not.toBeNull();
  });

  it("should return 2", () => {
    expect(ufosPark.fleet.length).toBe(2);
  });

  it("should return one assigned ufo", () => {
    ufosPark.dispatch(card);

    expect(ufosPark.cardNumbers()[0]).toStrictEqual({
      name: "uno",
      status: UfoStatus.Occupied,
      cardNumber: "4916119711304546",
    });
  });

  it("should return 4916119711304546 number ufo", () => {
    ufosPark.dispatch(card);
    expect(ufosPark.serviceOf("4916119711304546")).toStrictEqual({
      name: "uno",
      status: UfoStatus.Occupied,
      cardNumber: "4916119711304546",
    });
  });

  it("shouldn return true bc ufo is occupied", () => {
    ufosPark.dispatch(card);
    expect(ufosPark.containsCard("uno")).toBeTruthy();
  });

  it("shouldn return false bc ufo is free", () => {
    expect(ufosPark.containsCard("dos")).toBeFalsy();
  });
});
