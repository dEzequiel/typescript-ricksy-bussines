import { Crystal, CrystalExpender } from "./../src/subscribers/CrystalExpender";
import { CreditCard } from "../src/domain/CreditCard";

describe("CrystalExpender class", () => {
  const card = new CreditCard("Abradolf Lincler", "4916119711304546");
  let crystalExpender: CrystalExpender;

  beforeEach(() => {
    crystalExpender = new CrystalExpender(50);

    let crystals: Crystal[] = [
      {
        name: "crystal one",
        owner: undefined,
      },
      {
        name: "crystal two",
        owner: undefined,
      },
      {
        name: "crystal three",
        owner: undefined,
      },
    ];

    crystals.forEach(function (crystal: Crystal) {
      crystalExpender.add(crystal);
    });
  });

  it("shouldn't return null", () => {
    expect(crystalExpender).toBeInstanceOf(CrystalExpender);
    expect(crystalExpender).toBeDefined();
    expect(crystalExpender).not.toBeNull();
  });

  it("should return 3", () => {
    expect(crystalExpender.stock).toBe(3);
  });

  it("should return 4916119711304546 owner crystal", () => {
    crystalExpender.dispatch(card);
    expect(crystalExpender.serviceOf("4916119711304546")).toStrictEqual({
      name: "crystal one",
      owner: "4916119711304546",
    });
  });
});
