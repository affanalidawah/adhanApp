import setUpAdhan from "./setUpAdhan";
import useImportData from "./getImportData";
const dayjs = require("dayjs");
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

export default function completeOrder() {
  const prayerTimes = setUpAdhan();
  const mAdhan = prayerTimes.maghrib;
  const addedMaghribMinutes = useImportData().MaghribAddition;
  const currentTime = dayjs();
  const completeOrder = {
    fajrAdhan: prayerTimes.fajr,
    fajrIqamah: dayjs(useImportData().Fajr, "HH:mm A"),
    sunrise: prayerTimes.sunrise,
    dhuhrAdhan: prayerTimes.dhuhr,
    dhuhrIqamah: dayjs(useImportData().Dhuhr, "HH:mm A"),
    jumuahIqamah: dayjs(useImportData().Jumuah1, "HH:mm A"),
    asrAdhan: prayerTimes.asr,
    asrIqamah: dayjs(useImportData().Asr, "HH:mm A"),
    maghribAdhan: prayerTimes.maghrib,
    maghribIqamah: dayjs(mAdhan).add(addedMaghribMinutes, "m"),
    ishaAdhan: prayerTimes.isha,
    ishaIqamah: dayjs(useImportData().Isha, "HH:mm A"),
    prevMidnight: prayerTimes.prevMidnight,
    prevLastThird: prayerTimes.prevLastThird,
    curMidnight: prayerTimes.curMidnight,
    curLastThird: prayerTimes.curLastThird,
    nextFajr: prayerTimes.fajrNext,
    nextTiming: function () {
      if (currentTime.isBetween(this.fajrAdhan, this.fajrIqamah)) {
        console.log("Fajr Iqamah");
        console.log(this.fajrAdhan);
        console.log(this.fajrIqamah);

        return this.fajrIqamah;
      }
      if (currentTime.isBetween(this.fajrIqamah, this.sunrise)) {
        console.log("Sunrise");

        return this.sunrise;
      }
      if (currentTime.isBetween(this.sunrise, this.dhuhrAdhan)) {
        // console.log("dhuhrAdhan");

        return this.dhuhrAdhan;
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.jumuahIqamah) &&
        currentTime.day() === 5
      ) {
        console.log("jumuahIqamah");

        return this.jumuahIqamah;
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.dhuhrIqamah) &&
        currentTime.day() != 5
      ) {
        console.log("dhuhrIqamah");

        return this.dhuhrIqamah;
      }
      if (
        currentTime.isBetween(this.dhuhrIqamah, this.asrAdhan) &&
        currentTime.day() != 5
      ) {
        // console.log("asrAdhan");

        return this.asrAdhan;
      }
      if (
        currentTime.isBetween(this.jumuahIqamah, this.asrAdhan) &&
        currentTime.day() === 5
      ) {
        console.log("asrAdhan");

        return this.asrAdhan;
      }
      if (currentTime.isBetween(this.asrAdhan, this.asrIqamah)) {
        console.log("asrIqamah");

        return this.asrIqamah;
      }
      if (currentTime.isBetween(this.asrIqamah, this.maghribAdhan)) {
        // console.log("maghribAdhan");

        return this.maghribAdhan;
      }
      if (currentTime.isBetween(this.maghribAdhan, this.maghribIqamah)) {
        console.log("maghribIqamah");

        return this.maghribIqamah;
      }
      if (currentTime.isBetween(this.maghribIqamah, this.ishaAdhan)) {
        // console.log("ishaAdhan");

        return this.ishaAdhan;
      }
      if (currentTime.isBetween(this.ishaAdhan, this.ishaIqamah)) {
        console.log("ishaIqamah");

        return this.ishaIqamah;
      }
      if (
        currentTime.isAfter(this.ishaIqamah) &&
        currentTime.isBefore(this.curMidnight)
      ) {
        console.log("curMidnight");

        return this.curMidnight;
      }
      if (
        currentTime.isAfter(this.curMidnight) &&
        currentTime.isBefore(this.curLastThird)
      ) {
        console.log("curLastThird");

        return this.curLastThird;
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevMidnight)
      ) {
        console.log("prevMidnight");

        return this.prevMidnight;
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isAfter(this.prevMidnight) &&
        currentTime.isBefore(this.prevLastThird)
      ) {
        // console.log("prevLastThird");

        return this.prevLastThird;
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isAfter(this.prevLastThird)
      ) {
        console.log("fajrAdhan");

        return this.fajrAdhan;
      }
    },
    nextName: function () {
      if (currentTime.isBetween(this.fajrAdhan, this.fajrIqamah)) {
        return "Fajr Iqamah";
      }
      if (currentTime.isBetween(this.fajrIqamah, this.sunrise)) {
        return "Sunrise Time";
      }
      // if (currentTime.isBetween(this.sunrise, this.dhuhrAdhan)) {
      //   return "Dhuhr Adhan";
      // }
      if (
        currentTime.isBetween(this.sunrise, this.dhuhrAdhan) &&
        currentTime.day() === 5
      ) {
        return "Adhan";
      }
      if (
        currentTime.isBetween(this.sunrise, this.dhuhrAdhan) &&
        currentTime.day() != 5
      ) {
        return "Dhuhr Adhan";
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.jumuahIqamah) &&
        currentTime.day() === 5
      ) {
        return "Jumuah Iqamah";
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.dhuhrIqamah) &&
        currentTime.day() != 5
      ) {
        return "Dhuhr Iqamah";
      }
      if (
        currentTime.isBetween(this.dhuhrIqamah, this.asrAdhan) &&
        currentTime.day() != 5
      ) {
        return "Asr Adhan";
      }
      if (
        currentTime.isBetween(this.jumuahIqamah, this.asrAdhan) &&
        currentTime.day() === 5
      ) {
        return "Asr Adhan";
      }
      if (currentTime.isBetween(this.asrAdhan, this.asrIqamah)) {
        return "Asr Iqamah";
      }
      if (currentTime.isBetween(this.asrIqamah, this.maghribAdhan)) {
        return "Maghrib Adhan";
      }
      if (currentTime.isBetween(this.maghribAdhan, this.maghribIqamah)) {
        return "Maghrib Iqamah";
      }
      if (currentTime.isBetween(this.maghribIqamah, this.ishaAdhan)) {
        return "Isha Adhan";
      }
      if (currentTime.isBetween(this.ishaAdhan, this.ishaIqamah)) {
        return "Isha Iqamah";
      }
      if (
        currentTime.isAfter(this.fajrAdhan) &&
        currentTime.isBefore(this.curMidnight)
      ) {
        return "Midnight";
      }
      if (
        currentTime.isAfter(this.curMidnight) &&
        currentTime.isBefore(this.curLastThird)
      ) {
        return "Last Third";
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevMidnight)
      ) {
        return "Midnight";
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevLastThird)
      ) {
        return "Last Third";
      } else {
        return "Fajr Adhan";
      }
    },
    currentName: function () {
      if (currentTime.isBetween(this.fajrAdhan, this.fajrIqamah)) {
        return "Fajr";
      }
      if (currentTime.isBetween(this.fajrIqamah, this.sunrise)) {
        return "Fajr";
      }
      if (currentTime.isBetween(this.sunrise, this.dhuhrAdhan)) {
        return "Duha";
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.jumuahIqamah) &&
        currentTime.day() === 5
      ) {
        return "Jumuah";
      }
      if (
        currentTime.isBetween(this.dhuhrAdhan, this.dhuhrIqamah) &&
        currentTime.day() != 5
      ) {
        return "Dhuhr";
      }
      if (
        currentTime.isBetween(this.dhuhrIqamah, this.asrAdhan) &&
        currentTime.day() != 5
      ) {
        return "Dhuhr";
      }
      if (
        currentTime.isBetween(this.jumuahIqamah, this.asrAdhan) &&
        currentTime.day() === 5
      ) {
        return "Jumuah";
      }
      if (currentTime.isBetween(this.asrAdhan, this.asrIqamah)) {
        return "Asr";
      }
      if (currentTime.isBetween(this.asrIqamah, this.maghribAdhan)) {
        return "Asr";
      }
      if (currentTime.isBetween(this.maghribAdhan, this.maghribIqamah)) {
        return "Maghrib";
      }
      if (currentTime.isBetween(this.maghribIqamah, this.ishaAdhan)) {
        return "Maghrib";
      }
      if (currentTime.isBetween(this.ishaAdhan, this.ishaIqamah)) {
        return "Isha";
      }
      if (
        currentTime.isAfter(this.fajrAdhan) &&
        currentTime.isBefore(this.curMidnight)
      ) {
        return "Isha";
      }
      if (
        currentTime.isAfter(this.curMidnight) &&
        currentTime.isBefore(this.curLastThird)
      ) {
        return "Midnight";
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevMidnight)
      ) {
        return "Isha";
      }
      if (
        currentTime.isBefore(this.fajrAdhan) &&
        currentTime.isBefore(this.prevLastThird)
      ) {
        return "Midnight";
      } else {
        return "Last Third";
      }
    },
  };
  return completeOrder;
}
