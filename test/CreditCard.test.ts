import { CreditCard } from "../src/domain/CreditCard";

function setupCreditCard(): CreditCard {
  const card = new CreditCard("Abradolf Lincler", "4916119711304546");
  return card;
}

let card: CreditCard | null = null;

beforeEach(() => {
  card = new CreditCard("Abradolf Lincler", "4916119711304546");
});

describe("CreditCard class", () => {
  it("shouldn't return null", () => {
    expect(card).toBeInstanceOf(CreditCard);
    expect(card).toBeDefined();
    expect(card).not.toBeNull();
  });

  it("should return credit card info", () => {
    expect(card).not.toBeNull();
    expect("4916119711304546").toBe(card?.numberCard);
  });

  it("should pay and decrease credit card credit", () => {
    card?.pay(3000);
    expect(0).toBe(card?.cardCredit);
  });

  it("shouldn't pay", () => {
    card?.pay(4000);
    expect(3000).toBe(card?.cardCredit);
  });
});
