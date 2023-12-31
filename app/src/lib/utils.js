import Monet, { Either } from "monet";

export const convert_to = Monet.curry(function convert_to(converter, value) {
  return Either.Right(converter(value));
});

export const ceil = Monet.curry(function (value) {
  return Either.Right(Math.ceil(value));
});

export function currency_format(value) {
  const formatter = new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return Either.Right(formatter.format(value));
}

export const format_number = Monet.curry(function (formatter, value) {
  return Either.right(formatter(value));
});

export function empty(value) {
  if (Array.isArray(value)) return value.length === 0;
  return [null, undefined, ""].includes(value);
}

export function is_between(value, [min, max]) {
  return value >= min && value <= max;
}
