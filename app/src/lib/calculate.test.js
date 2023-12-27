import { calculate_bill } from "./calculate";

const bill = {
  bill_name: "",
  status: "draft",
  summary: null,
  detail: [],
  order_line: [
    {
      item_name: "beer",
      type: "ratio",
      price: 85,
      summary: null,
      unit: "THB/UNIT",
      person: [
        { id: 1, name: "np", range: [1, 3], amount: null },
        { id: 2, name: "bom", range: [1, 1], amount: null },
        { id: 3, name: "ben", range: [2, 2], amount: null },
        { id: 4, name: "beem", range: [2, 3], amount: null },
      ],
    },
    {
      item_name: "ice",
      type: "equlity",
      price: 30,
      summary: null,
      unit: "THB",
      person: [
        { id: 1, name: "np", range: [], amount: null },
        { id: 2, name: "bom", range: [], amount: null },
        { id: 3, name: "ben", range: [], amount: null },
        { id: 4, name: "beem", range: [], amount: null },
      ],
    },
    {
      item_name: "water",
      type: "adjust",
      price: null,
      summary: null,
      unit: "THB",
      person: [
        { id: 1, name: "np", range: [], amount: 85 },
        { id: 2, name: "bom", range: [], amount: 95 },
      ],
    },
  ],
};

test("calculate item", () => {
  const result = calculate_bill(bill);
  expect(result).toEqual({
    bill_name: "",
    status: "draft",
    summary: 465,
    detail: [
      {
        id: 1,
        name: "np",
        summary: null,
        items: [
          {
            item_name: "beer",
            amount: 113.33333333333333,
          },
          {
            item_name: "ice",
            amount: 7.5,
          },
          {
            item_name: "water",
            amount: 85,
          },
        ],
      },
      {
        id: 2,
        name: "bom",
        summary: null,
        items: [
          {
            item_name: "beer",
            amount: 42.5,
          },
          {
            item_name: "ice",
            amount: 7.5,
          },
          {
            item_name: "water",
            amount: 95,
          },
        ],
      },
      {
        id: 3,
        name: "ben",
        summary: null,
        items: [
          {
            item_name: "beer",
            amount: 28.333333333333332,
          },
          {
            item_name: "ice",
            amount: 7.5,
          },
        ],
      },
      {
        id: 4,
        name: "beem",
        summary: null,
        items: [
          {
            item_name: "beer",
            amount: 70.83333333333333,
          },
          {
            item_name: "ice",
            amount: 7.5,
          },
        ],
      },
    ],
    order_line: [
      {
        item_name: "beer",
        type: "ratio",
        price: 85,
        summary: 255,
        unit: "THB/UNIT",
        person: [
          {
            id: 1,
            name: "np",
            range: [1, 3],
            amount: 113.33333333333333,
          },
          {
            id: 2,
            name: "bom",
            range: [1, 1],
            amount: 42.5,
          },
          {
            id: 3,
            name: "ben",
            range: [2, 2],
            amount: 28.333333333333332,
          },
          {
            id: 4,
            name: "beem",
            range: [2, 3],
            amount: 70.83333333333333,
          },
        ],
      },
      {
        item_name: "ice",
        type: "equlity",
        price: 30,
        summary: 30,
        unit: "THB",
        person: [
          {
            id: 1,
            name: "np",
            range: [],
            amount: 7.5,
          },
          {
            id: 2,
            name: "bom",
            range: [],
            amount: 7.5,
          },
          {
            id: 3,
            name: "ben",
            range: [],
            amount: 7.5,
          },
          {
            id: 4,
            name: "beem",
            range: [],
            amount: 7.5,
          },
        ],
      },
      {
        item_name: "water",
        type: "adjust",
        price: 180,
        summary: 180,
        unit: "THB",
        person: [
          {
            id: 1,
            name: "np",
            range: [],
            amount: 85,
          },
          {
            id: 2,
            name: "bom",
            range: [],
            amount: 95,
          },
        ],
      },
    ],
  });
});
