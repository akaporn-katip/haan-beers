import calculate_adjust from "./calculate_adjust";
import calculate_equality from "./calculate_equality";
import calculate_ratio from "./calculate_ratio";

function make_summary(price, person, default_price) {
  return {
    price,
    default_price,
    is_rounded: price !== default_price,
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

function sum_person(person) {
  return currency_format(
    person
      .map((p) => p.amount)
      .map((v) => Number(v.replace(",", "")))
      .reduce((a, b) => a + b, 0)
  );
}

export function calculate_item(item) {
  if (item.type === "ratio") {
    const _person = calculate_ratio(item.price, item.person);
    return make_summary(item.price, _person, item.price);
  } else if (item.type === "equality") {
    const _person = calculate_equality(item.price, item.person);
    return make_summary(sum_person(_person), _person, item.price);
  } else if (item.type === "adjust") {
    const price = calculate_adjust(item.person);
    return make_summary(price, item.person, price);
  }
  return null;
}
