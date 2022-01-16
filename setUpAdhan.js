import React from "react";
import { View, Text } from "react-native";
const adhan = require("adhan");

const setUpAdhan = () => {
  var adhan = require("adhan");
  let latitude = 29.637107774550635;
  let longitude = -98.45155341131422;
  var date = new Date();
  var nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  var params = adhan.CalculationMethod.NorthAmerica();
  var coordinates = new adhan.Coordinates(latitude, longitude);
  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  const { fajr } = new adhan.PrayerTimes(coordinates, nextDay, params);
  prayerTimes.fajrNext = fajr;
  return prayerTimes;
};

export default setUpAdhan;
