import React from "react";
import { StyleSheet, Text, View } from "react-native";
import completeOrder from "../completeOrder";
const moment = require("moment");

export default function HasIqamahPassed() {
  const currentTime = moment();
  const order = completeOrder();
  const relevantPhrase = "";

  if (currentTime.isBetween(order.fajrAdhan, order.fajrIqamah)) {
    relevantPhrase = "Iqamah Upcoming";
  }
  if (
    currentTime.isBetween(
      order.fajrIqamah,
      moment(order.fajrIqamah).add(6, "m")
    )
  ) {
    relevantPhrase = "Iqamah Ongoing";
  }
  if (currentTime.isBetween(moment(order.fajrIqamah).add(6, "m"))) {
    relevantPhrase = "Iqamah Has Passed";
  }
  if (
    currentTime.isBetween(order.dhuhrAdhan, order.jumuahIqamah) &&
    currentTime.day() === 5
  ) {
    relevantPhrase = "Jumuah Salah Upcoming";
  }
  if (
    currentTime.isBetween(order.dhuhrAdhan, order.dhuhrIqamah) &&
    currentTime.day() != 5
  ) {
    relevantPhrase = "Iqamah Upcoming";
  }
  if (
    currentTime.isBetween(order.dhuhrIqamah, order.asrAdhan) &&
    currentTime.day() != 5
  ) {
    relevantPhrase = "Asr Adhan";
  }
  if (
    currentTime.isBetween(order.jumuahIqamah, order.asrAdhan) &&
    currentTime.day() === 5
  ) {
    relevantPhrase = "Asr Adhan";
  }
  if (currentTime.isBetween(order.asrAdhan, order.asrIqamah)) {
    relevantPhrase = "Iqamah Upcoming";
  }
  if (currentTime.isBetween(order.asrIqamah, order.maghribAdhan)) {
    relevantPhrase = "Maghrib Adhan";
  }
  if (currentTime.isBetween(order.maghribAdhan, order.maghribIqamah)) {
    relevantPhrase = "Iqamah Upcoming";
  }
  if (currentTime.isBetween(order.maghribIqamah, order.ishaAdhan)) {
    relevantPhrase = "Isha Adhan";
  }
  if (currentTime.isBetween(order.ishaAdhan, order.ishaIqamah)) {
    relevantPhrase = "Iqamah Upcoming";
  }
  if (
    currentTime.isAfter(order.ishaIqamah) &&
    currentTime.isBefore(order.curMidnight)
  ) {
    relevantPhrase = "Midnight";
  }

  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
