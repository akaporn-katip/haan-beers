import Monet, { Either } from "monet";
import { format_number, is_between } from "./utils";

const count_bottle = Monet.curry((persons) => {
  const range = persons.flatMap((p) => p.range);
  return Either.Right(Math.max(...range));
});

const calculate = Monet.curry((price, person, num_of_bottle) => {
  let result = person;
  for (let i = 1; i <= num_of_bottle; i++) {
    const f_person = person.filter((p) => is_between(i, p.range));
    const person_count = f_person.length;
    result = result.map((p) => {
      if (is_between(i, p.range))
        p.amount = to_number(p.amount) + price / person_count;
      return p;
    });
  }

  return Either.Right(result);
});

function ceil_number(value) {
  return value.map((p) => ({ ...p, amount: Math.ceil(p.amount) }));
}

function to_number(value) {
  return Number(String(value).replace(",", ""));
}

export default function calculate_ratio(item) {
  const { person, price } = item;

  const calculate_person_amount = calculate(price);

  const number_formatter = format_number((persons) =>
    persons.map((_p) => {
      const formatter = new Intl.NumberFormat("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return { ..._p, amount: formatter.format(_p.amount) };
    })
  );

  const result = count_bottle(person)
    .chain(calculate_person_amount(person))
    .map(ceil_number)
    .chain(number_formatter);

  if (result.isRightValue) {
    return result.value;
  } else {
    console.error("Error : " + result.value);
    return [];
  }
}
