import Monet, { Either } from "monet";
import { convert_to, currency_format, empty } from "./utils";

const extract_data = Monet.curry(function (col_name, persons) {
  if (empty(col_name)) return Either.Left("Column name is empty.");
  if (empty(persons)) return Either.Left("Persons is empty.");
  return Either.Right(persons.map((person) => person[col_name]));
});

const sum = Monet.curry(function (amounts) {
  return Either.Right(amounts.reduce((a, b) => a + b, 0));
});

export default function calculate_adjust(persons) {
  const to_number = convert_to((list) =>
    list.map((i) => Number(i.replace(",", "")))
  );

  const extract_amount = extract_data("amount");
  const result = extract_amount(persons)
    .chain(to_number)
    .chain(sum)
    .chain(currency_format);
  if (result.isRight()) {
    return result.value;
  } else {
    return "";
  }
}
