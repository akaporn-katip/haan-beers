import { calculate_bill, calculate_item } from "./calculate";

test("calculate item - ratio", () => {
  const result = calculate_item({
    item_name: "beer",
    type: "ratio",
    price: "85",
    summary: null,
    unit: "THB/UNIT",
    person: [
      { id: 1, name: "np", range: [1, 3], amount: "" },
      { id: 2, name: "bom", range: [1, 1], amount: "" },
      { id: 3, name: "ben", range: [2, 2], amount: "" },
      { id: 4, name: "beem", range: [2, 3], amount: "" },
    ],
  });

  expect(result).toEqual({
    item_name: "beer",
    price: "85",
    actual_price: "85",
    is_rounded: false,
    person: [
      { id: 1, name: "np", range: [1, 3], amount: "114" },
      { id: 2, name: "bom", range: [1, 1], amount: "43" },
      { id: 3, name: "ben", range: [2, 2], amount: "29" },
      { id: 4, name: "beem", range: [2, 3], amount: "71" },
    ],
  });
});

test("calculate item - equality", () => {
  const result = calculate_item({
    item_name: "beer",
    type: "equality",
    price: "401",
    summary: null,
    unit: "THB/UNIT",
    person: [
      { id: 1, name: "np", range: [], amount: "" },
      { id: 2, name: "bom", range: [], amount: "" },
      { id: 3, name: "ben", range: [], amount: "" },
      { id: 4, name: "beem", range: [], amount: "" },
    ],
  });

  expect(result).toEqual({
    item_name: "beer",
    price: "401",
    actual_price: "404",
    is_rounded: true,
    person: [
      { id: 1, name: "np", range: [], amount: "101" },
      { id: 2, name: "bom", range: [], amount: "101" },
      { id: 3, name: "ben", range: [], amount: "101" },
      { id: 4, name: "beem", range: [], amount: "101" },
    ],
  });
});

test("calculate item - adjust", () => {
  const result = calculate_item({
    item_name: "beer",
    type: "adjust",
    price: "401",
    summary: null,
    unit: "THB/UNIT",
    person: [
      { id: 1, name: "np", range: [], amount: "100" },
      { id: 2, name: "bom", range: [], amount: "200" },
      { id: 3, name: "ben", range: [], amount: "300" },
      { id: 4, name: "beem", range: [], amount: "400" },
    ],
  });

  expect(result).toEqual({
    item_name: "beer",
    price: "1,000",
    actual_price: "1,000",
    is_rounded: false,
    person: [
      { id: 1, name: "np", range: [], amount: "100" },
      { id: 2, name: "bom", range: [], amount: "200" },
      { id: 3, name: "ben", range: [], amount: "300" },
      { id: 4, name: "beem", range: [], amount: "400" },
    ],
  });
});

test("calculate bill", () => {
  const result = calculate_bill([
    {
      item_name: "beer",
      type: "adjust",
      price: "",
      summary: null,
      unit: "THB/UNIT",
      person: [
        { id: "1", name: "np", range: [], amount: "100" },
        { id: "2", name: "bom", range: [], amount: "200" },
        { id: "3", name: "ben", range: [], amount: "300" },
        { id: "4", name: "beem", range: [], amount: "400" },
      ],
    },
    {
      item_name: "beer",
      type: "adjust",
      price: "85",
      summary: null,
      unit: "THB/UNIT",
      person: [
        { id: "1", name: "np", range: ["1", "2"], amount: "" },
        { id: "2", name: "bom", range: ["2", "2"], amount: "" },
      ],
    },
  ]);

  expect(result).toEqual({
    summary: "1,000",
    person: [
      {
        id: "1",
        name: "np",
        amount: "100",
        items: [
          {
            item_name: "beer",
            amount: "100",
          },
        ],
      },
      {
        id: "2",
        name: "bom",
        amount: "200",
        items: [
          {
            item_name: "beer",
            amount: "200",
          },
        ],
      },
      {
        id: "3",
        name: "ben",
        amount: "300",
        items: [
          {
            item_name: "beer",
            amount: "300",
          },
        ],
      },
      {
        id: "4",
        name: "beem",
        amount: "400",
        items: [
          {
            item_name: "beer",
            amount: "400",
          },
        ],
      },
    ],
  });
});
