import Monet from "monet";
import calculate_adjust from "./calculate_adjust";
import calculate_equality from "./calculate_equality";
import calculate_ratio from "./calculate_ratio";

function make_summary(price, person, actual_price, item_name, rounded) {
  return {
    item_name,
    price,
    actual_price,
    is_rounded: rounded(price, actual_price),
    person: person,
  };
}

function currency_format(value) {
  const formatter = new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

const to_number = (v) => Number(String(v).replace(",", ""));

function sum_person(person) {
  return currency_format(
    person
      .map((p) => p.amount)
      .map(to_number)
      .reduce((a, b) => a + b, 0)
  );
}

export function calculate_item(item) {
  if (item.type === "ratio") {
    const _person = calculate_ratio(
      item.price,
      item.person.map((p) => ({ ...p, amount: "" }))
    );
    return make_summary(
      item.price,
      _person,
      sum_person(_person),
      item.item_name,
      () => false
    );
  } else if (item.type === "equality") {
    const _person = calculate_equality(item.price, item.person);
    return make_summary(
      item.price,
      _person,
      sum_person(_person),
      item.item_name,
      (p, a) => p !== a
    );
  } else if (item.type === "adjust") {
    const price = calculate_adjust(item.person);
    return make_summary(price, item.person, price, item.item_name, () => false);
  }
  return null;
}

const sum = (a, b) => a + b;

const unique_person = (calculated) =>
  calculated
    .flatMap((c) => c.person)
    .filter((v, idx, arr) => arr.findIndex((a) => a.id === v.id) === idx);

const map_item = Monet.curry((items, person) => {
  const items_of_person = items
    .filter(
      (item) =>
        item.person.findIndex(function (_person) {
          return _person.id === person.id;
        }) !== -1
    )
    .map((item) => ({
      item_name: item.item_name,
      amount: currency_format(
        item.person
          .filter((_person) => _person.id === person.id)
          .map((itm) => itm.amount)
          .map(to_number)
          .reduce((a, b) => a + b, 0)
      ),
    }));

  return {
    id: person.id,
    name: person.name,
    amount: currency_format(
      items_of_person
        .map((itm) => itm.amount)
        .map(to_number)
        .reduce(sum, 0)
    ),
    items: items_of_person,
  };
});

// TODO: Refactor
export function calculate_bill(items) {
  const calculated = items.map(calculate_item);
  const summary = currency_format(
    calculated
      .map((item) => item.actual_price)
      .map(to_number)
      .reduce((a, b) => a + b, 0)
  );
  const person = unique_person(calculated).map(map_item(items));

  return { summary, person };
}
