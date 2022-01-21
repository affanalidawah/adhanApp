import setUpAdhan from "./setUpAdhan";
import useImportData from "./hooks/useImportData";
const moment = require("moment");

const completeOrder = () => {
  currentTime = moment();
  const completeOrder = {
    fajrAdhan: prayerTimes.fajr,
    fajrIqamah: useImportData.Fajr,
    sunrise: prayerTimes.sunrise,
    dhuhrAdhan: prayerTimes.dhuhr,
    dhuhrIqamah: useImportData.Dhuhr,
    jumuahIqamah: useImportData.Jumuah1,
    asrAdhan: prayerTimes.asr,
    asrIqamah: useImportData.Asr,
    maghribAdhan: prayerTimes.maghrib,
    maghribIqamah: useImportData.Maghrib,
    ishaAdhan: prayerTimes.isha,
    ishaIqamah: useImportData.Isha,
    prevMidnight: prayerTimes.prevMidnight,
    prevLastThird: prayerTimes.prevLastThird,
    curMidnight: prayerTimes.curMidnight,
    curLastThird: prayerTimes.curLastThird,
    nextFajr: prayerTimes.nextFajr,
    nextTiming: function () {
      if (currentTime.isBetween(this.fajrAdhan, this.fajrIqamah)) {
        return this.fajrIqamah;
      }
      if (currentTime.isBetween(this.fajrIqamah, this.sunrise)) {
        return this.sunrise;
      }
      if (currentTime.isBetween(this.sunrise, this.dhuhrAdhan)) {
        return this.dhuhrAdhan;
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.jumuahIqamah) &&
        currentTime.day() === 5
      ) {
        return this.jumuahIqamah;
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.dhuhrIqamah) &&
        currentTime.day() != 5
      ) {
        return this.dhuhrIqamah;
      }
      if (
        currentTime.isBetween(this.dhuhrIqamah, this.asrAdhan) &&
        currentTime.day() != 5
      ) {
        return this.asrAdhan;
      }
      if (
        currentTime.isBetween(this.jumuahIqamah, this.asrAdhan) &&
        currentTime.day() === 5
      ) {
        return this.asrAdhan;
      }
      if (currentTime.isBetween(this.asrAdhan, this.asrIqamah)) {
        return this.asrIqamah;
      }
      if (currentTime.isBetween(this.asrIqamah, this.maghribAdhan)) {
        return this.maghribAdhan;
      }
      if (currentTime.isBetween(this.maghribAdhan, this.maghribIqamah)) {
        return this.maghribIqamah;
      }
      if (currentTime.isBetween(this.maghribIqamah, this.ishaAdhan)) {
        return this.ishaAdhan;
      }
      if (currentTime.isBetween(this.ishaAdhan, this.ishaIqamah)) {
        return this.ishaIqamah;
      }
      if (currentTime.isBetween(this.ishaAdhan, this.ishaIqamah)) {
        return this.ishaIqamah;
      }
      if (
        currentTime.isAfter(this.fajrAdhan) &&
        currentTime.isBefore(this.curMidnight)
      ) {
        return this.curMidnight;
      }
      if (
        currentTime.isAfter(this.curMidnight) &&
        currentTime.isBefore(this.curLastThird)
      ) {
        return this.curLastThird;
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevMidnight)
      ) {
        return this.prevMidnight;
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevLastThird)
      ) {
        return this.prevLastThird;
      } else {
        return this.fajrAdhan;
      }
    },
  };
  return completeOrder;
};

export default completeOrder;
