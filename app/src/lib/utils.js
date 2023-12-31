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

export function empty(value) {
  return [null, undefined, ""].includes(value);
}
