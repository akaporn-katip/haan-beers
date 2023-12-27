function get_total_bottle(persons) {
  const range = persons.flatMap((p) => p.range);
  return Math.max(...range);
}

const is_between = (value, [min, max]) => value >= min && value <= max;

function calculate_person_ratio(item, num_of_bottle) {
  let { price, person } = item;
  item.summary = num_of_bottle * item.price;
  for (let i = 1; i <= num_of_bottle; i++) {
    const f_person = person.filter((p) => is_between(i, p.range));
    const person_count = f_person.length;
    person = person.map((p) => {
      if (is_between(i, p.range)) p.amount += price / person_count;
      return p;
    });
  }
  return person;
}

function calculate_ratio(item) {
  item.person = calculate_person_ratio(item, get_total_bottle(item.person));
  return item;
}

function calculate_equlity(item) {
  const person_count = item.person.length;
  item.summary = item.price;
  item.person = item.person.map((p) => {
    p.amount = item.price / person_count;
    return p;
  });
  return item;
}

function calculate_adjust(item) {
  const to_number = convert_to(Number);
  const sum = item.person
    .map((p) => p.amount)
    .map(to_number)
    .reduce((a, b) => a + b, 0);
  item.price = sum;
  item.summary = sum;
  return item;
}

function convert_to(to) {
  return function (value) {
    return to(value);
  };
}

function compose(calculator, item) {
  return calculator(item);
}

function calculate_summary_bill(order_line) {
  const to_number = convert_to(Number);
  return order_line
    .map((item) => item.summary)
    .map(to_number)
    .reduce((a, b) => a + b, 0);
}

function remove_duplicate(arr) {
  return arr.filter(
    (itm, idx) => arr.findIndex((fi) => fi.id === itm.id) === idx
  );
}

function get_all_person(order_line) {
  const personals = order_line
    .flatMap((item) => item.person)
    .map((p) => ({ id: p.id, name: p.name, summary: null, items: [] }));
  return remove_duplicate(personals);
}

function get_personal_items(personal, order_line) {
  return order_line
    .filter((itm) => itm.person.map((p) => p.id).includes(personal.id))
    .map((itm) => ({
      item_name: itm.item_name,
      amount: itm.person.find((p) => p.id === personal.id).amount,
    }));
}

function get_detail(order_line) {
  const personals = get_all_person(order_line);
  return personals.map((p) => {
    p.items = get_personal_items(p, order_line);
    return p;
  });
}

export function calculate_bill(bill) {
  bill.order_line = bill.order_line.map((item) => {
    if (item.type === "ratio") return compose(calculate_ratio, item);
    if (item.type === "equlity") return compose(calculate_equlity, item);
    if (item.type === "adjust") return compose(calculate_adjust, item);
    return null;
  });
  bill.summary = calculate_summary_bill(bill.order_line);
  bill.detail = get_detail(bill.order_line);
  return bill;
}
