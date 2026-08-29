import { OPENING, claim, load, nextUp } from "./care";

test("opening log already credits Ioana, Alessandro, Luca once each", () => {
  expect(load(OPENING, "ioana")).toBe(1);
  expect(load(OPENING, "alessandro")).toBe(1);
  expect(load(OPENING, "luca")).toBe(1);
});

test("next up is alphabetical when the load is tied", () => {
  expect(nextUp(OPENING)).toBe("alessandro");
});

test("claiming groceries moves Alessandro ahead, so Ioana is next", () => {
  const after = claim(OPENING, "groceries", "alessandro");
  expect(load(after, "alessandro")).toBe(2);
  expect(nextUp(after)).toBe("ioana");
});
