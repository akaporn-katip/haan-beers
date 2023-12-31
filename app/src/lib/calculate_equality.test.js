import calculate_equality, {
  calculate,
  map_to_person,
} from "./calculate_equality";

const item = {
  item_name: "",
  type: "equality",
  price: "190,303",
  summary: null,
  unit: "THB",
  person: [
    { id: 1, name: "np", range: [], amount: "" },
    { id: 2, name: "bom", range: [], amount: "" },
    { id: 3, name: "ben", range: [], amount: "" },
    { id: 4, name: "beem", range: [], amount: "" },
  ],
};

test("should return Right", () => {
  const result = calculate_equality(item);
  expect(result).toEqual([
    { id: 1, name: "np", range: [], amount: "47,576" },
    { id: 2, name: "bom", range: [], amount: "47,576" },
    { id: 3, name: "ben", range: [], amount: "47,576" },
    { id: 4, name: "beem", range: [], amount: "47,576" },
  ]);
});

test("should return Left with 'Division by zero'", () => {
  const result = calculate(0, 100);
  expect(result.isRightValue).toBeFalsy();
  expect(result.value).toEqual("Division by zero");
});

test("should return Left with 'Price is empty'", () => {
  const result = calculate(2, "");
  expect(result.isRightValue).toBeFalsy();
  expect(result.value).toEqual("Price is empty");
});

test("should return Left with 'Person is Empty'", () => {
  const result = map_to_person([], 100);
  expect(result.isRightValue).toBeFalsy();
  expect(result.value).toEqual("Person is Empty");
});
