import Monet, { Either } from "monet";
import { convert_to, currency_format, empty, ceil } from "./utils";

export const calculate = Monet.curry(function (count, price) {
  if (count === 0) return Either.Left("Division by zero");
  if (empty(price)) return Either.Left("Price is empty");
  return Either.Right(price / count);
});

export const map_to_person = Monet.curry(function (person, amount) {
  if (person.length === 0) return Either.Left("Person is Empty");
  return Either.Right(
    person.map((p) => ({
      ...p,
      amount,
    }))
  );
});

// export const round = Monet.curry(function (price, rounded) {
//   return { default: price, rounded, is_rounded: price !== rounded };
// });

export default function calculate_equality(item) {
  const { price, person } = item;
  const count = person.length;

  const to_number = convert_to((value) => Number(value.replace(",", "")));

  const result = to_number(price)
    .chain(calculate(count))
    .chain(ceil)
    .chain(currency_format)
    .chain(map_to_person(person));

  if (result.isRightValue) {
    return result.value;
  } else {
    console.error("Error: " + result.value);
    return [];
  }
}
