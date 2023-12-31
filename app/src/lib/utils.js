import Monet, { Either } from "monet";

export const convert_to = Monet.curry(function convert_to(converter, value) {
  return Either.Right(converter(value));
});

export const round = Monet.curry(function round(value) {
  return Either.Right(Math.round(value));
});

export function currency_format(value) {
  const formatter = new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return Either.Right(formatter.format(value));
}

export function empty(value) {
    return [null, undefined, ""].includes(value)
}