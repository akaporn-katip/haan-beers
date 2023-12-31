import calculate_adjust from "./calculate_adjust";

test("should return sum of amount", () => {
  const result = calculate_adjust([
    { id: 1, name: "np", range: [], amount: "1,000" },
    { id: 2, name: "bom", range: [], amount: "900" },
    { id: 3, name: "ben", range: [], amount: "90" },
    { id: 4, name: "beem", range: [], amount: "9" },
  ]);
  expect(result).toEqual("1,999");
});


test("should drop empty list", () => {
    const result = calculate_adjust([
      { id: 1, name: "np", range: [], amount: "10" },
      { id: 2, name: "bom", range: [], amount: "" },
      { id: 3, name: "ben", range: [], amount: "" },
      { id: 4, name: "beem", range: [], amount: "" },
    ]);
    expect(result).toEqual("10");
  });