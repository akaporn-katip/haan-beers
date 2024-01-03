import calculate_ratio from "./calculate_ratio";

test("should return Right", () => {
  const result = calculate_ratio("85", [
    { id: 1, name: "np", range: ["1", "3"], amount: "" },
    { id: 2, name: "bom", range: ["2", "3"], amount: "" },
    { id: 3, name: "ben", range: ["3", "3"], amount: "" },
    { id: 4, name: "beem", range: ["", ""], amount: "" },
  ]);

  expect(result).toEqual([
    { id: 1, name: "np", range: ["1", "3"], amount: "156" },
    { id: 2, name: "bom", range: ["2", "3"], amount: "71" },
    { id: 3, name: "ben", range: ["3", "3"], amount: "29" },
    { id: 4, name: "beem", range: ["", ""], amount: "0" },
  ]);
});
