import completeOrder from "../completeOrder";
const moment = require("moment");

export default function HasIqamahPassed() {
  const currentTime = moment();
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
      moment(order.fajrIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      moment(order.fajrIqamah).add(salahLength, "m"),
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
      moment(order.dhuhrIqamah).add(salahLength, "m")
    ) &&
    currentTime.day() != 5
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      order.jumuahIqamah,
      moment(order.dhuhrIqamah).add(jumuahLength, "m")
    ) &&
    currentTime.day() === 5
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      moment(order.dhuhrIqamah).add(salahLength, "m"),
      order.asrAdhan
    ) &&
    currentTime.day() != 5
  ) {
    which = " ";
  }
  if (
    currentTime.isBetween(
      moment(order.jumuahIqamah).add(jumuahLength, "m"),
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
      moment(order.asrIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      moment(order.asrIqamah).add(salahLength, "m"),
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
      moment(order.maghribIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (
    currentTime.isBetween(
      moment(order.maghribIqamah).add(salahLength, "m"),
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
      moment(order.ishaIqamah).add(salahLength, "m")
    )
  ) {
    which = "green";
  }
  if (currentTime.isAfter(moment(order.ishaIqamah).add(salahLength, "m"))) {
    which = " ";
  }
  if (currentTime.isBefore(moment(order.fajrAdhan))) {
    which = " ";
  }

  return which;
}
