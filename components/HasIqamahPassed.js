import completeOrder from "../completeOrder";
const dayjs = require("dayjs");
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

export default function HasIqamahPassed() {
  const currentTime = dayjs();
  const order = completeOrder();
  let which = " ";
  const salahLength = 5;
  const jumuahLength = 45;

  if (currentTime.isBetween(order.fajrAdhan, order.fajrIqamah)) {
    which = "yellow";
  }
  if (
    currentTime.isBetween(
      order.fajrIqamah,
      dayjs(order.fajrIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      dayjs(order.fajrIqamah).add(salahLength, "m"),
      order.dhuhrAdhan
    )
  ) {
    which = " ";
  }
  if (
    currentTime.isBetween(order.dhuhrAdhan, order.jumuahIqamah) &&
    currentTime.day() === 5
  ) {
    which = "yellow";
  }
  if (
    currentTime.isBetween(order.dhuhrAdhan, order.dhuhrIqamah) &&
    currentTime.day() != 5
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      order.dhuhrIqamah,
      dayjs(order.dhuhrIqamah).add(salahLength, "m")
    ) &&
    currentTime.day() != 5
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      order.jumuahIqamah,
      dayjs(order.dhuhrIqamah).add(jumuahLength, "m")
    ) &&
    currentTime.day() === 5
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      dayjs(order.dhuhrIqamah).add(salahLength, "m"),
      order.asrAdhan
    ) &&
    currentTime.day() != 5
  ) {
    which = " ";
  }
  if (
    currentTime.isBetween(
      dayjs(order.jumuahIqamah).add(jumuahLength, "m"),
      order.asrAdhan
    ) &&
    currentTime.day() === 5
  ) {
    which = " ";
  }
  if (currentTime.isBetween(order.asrAdhan, order.asrIqamah)) {
    which = "yellow";
  }
  if (
    currentTime.isBetween(
      order.asrIqamah,
      dayjs(order.asrIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      dayjs(order.asrIqamah).add(salahLength, "m"),
      order.maghribAdhan
    )
  ) {
    which = " ";
  }
  if (currentTime.isBetween(order.maghribAdhan, order.maghribIqamah)) {
    which = "yellow";
  }
  if (
    currentTime.isBetween(
      order.maghribIqamah,
      dayjs(order.maghribIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      dayjs(order.maghribIqamah).add(salahLength, "m"),
      order.ishaAdhan
    )
  ) {
    which = " ";
  }
  if (currentTime.isBetween(order.ishaAdhan, order.ishaIqamah)) {
    which = "yellow";
  }
  if (
    currentTime.isBetween(
      order.ishaIqamah,
      dayjs(order.ishaIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (currentTime.isAfter(dayjs(order.ishaIqamah).add(salahLength, "m"))) {
    which = " ";
  }
  if (currentTime.isBefore(dayjs(order.fajrAdhan))) {
    which = " ";
  }

  return which;
}
