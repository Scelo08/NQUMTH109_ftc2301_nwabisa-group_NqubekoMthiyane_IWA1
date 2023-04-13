const rent = 400;
const tax = "8%";
const food = 51.7501;
const salary = 800;
const transport = 10.2;
const hourOfDay = 00;
const minuteOfDay = 00;

// Only change below this line

let balance = undefined;

if (hourOfDay &&
  minuteOfDay !== null &&
  hourOfDay == "00" &&
  minuteOfDay == "00"
) {
  const taxAsDecimal = parseInt(tax.substring(0, tax.length - 1)) / 100; //changed 8% to number
  const startingAfterTax = salary * 1 - taxAsDecimal;
  balance = startingAfterTax - transport - food - rent;
}

console.log(balance.toFixed(2));
