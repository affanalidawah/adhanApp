import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PrayerLine from "../components/PrayerLine";
import { firebase } from "../firebase";
import {
  firestore,
  getFirestore,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import PrayerCountdown from "../components/PrayerCountdown";
import updateMomentLocale from "../updateMomentLocale";
import Iqamaat from "../components/Iqamaat";
import { LinearGradient } from "expo-linear-gradient";
import setUpAdhan from "../setUpAdhan";
import PrayerLineup from "../components/PrayerLineup";
const moment = require("moment");
const mtimezone = require("moment-timezone");
const adhan = require("adhan");

const HomeScreen = () => {
  //hooks
  let [countFormatted, setCountFormatted] = useState("00:00:00");
  const prayerTimes = setUpAdhan();
  // we can only call this between the last third and 12:00 AM of that day
  // 11:59 -> lastThirdOfTheNight

  useEffect(() => {
    // if time is between Isha and 12:00, use all the values from today (midnight, lastThird)
    //once it reaches 12:00, then we tell it to use midnightLast and lastThirdLast bcs now the values have refreshed
    // make sure midnight is after 12:00 with if statement
    // once we pass lastThirdLast, then we can just switch to the current times and count down to Fajr
  }, []);

  const sunnahTimes = new adhan.SunnahTimes(prayerTimes);
  const middleOfTheNight = moment(sunnahTimes.middleOfTheNight)
    .tz("America/Chicago")
    .format("DD h:mm A");
  const lastThirdOfTheNight = moment(sunnahTimes.lastThirdOfTheNight)
    .tz("America/Chicago")
    .format("DD h:mm A");

  function countLogic() {
    // if timing is between isha and midnight return that timing
    // store old varoavles and we wont change until later

    if (moment().isBetween(prayerTimes.isha, middleOfTheNight)) {
      return moment.utc(middleOfTheNight.diff(moment())).format("HH:mm:ss");
    } else if (moment().isBetween(middleOfTheNight, lastThirdOfTheNight)) {
      return moment.utc(lastThirdOfTheNight.diff(moment())).format("HH:mm:ss");
    } else if (moment().isBetween(lastThirdOfTheNight, prayerTimes.fajrNext)) {
      return moment.utc(lastThirdOfTheNight.diff(moment())).format("HH:mm:ss");
    }
  }
  // isha -> (12:00)
  // isha ->midnight -> last third of night

  const current = prayerTimes.currentPrayer();
  const next = prayerTimes.nextPrayer();
  let currentPrayerTime = moment(prayerTimes.timeForPrayer(current))
    .tz("America/Chicago")
    .format("h:mm A");
  let nextPrayerTime = moment(prayerTimes.timeForPrayer(next));
  let fajr = moment(prayerTimes.fajr).tz("America/Chicago").format("DD h:mm A");
  let sunrise = moment(prayerTimes.sunrise)
    .tz("America/Chicago")
    .format("h:mm A");
  let dhuhr = moment(prayerTimes.dhuhr).tz("America/Chicago").format("h:mm A");
  let asr = moment(prayerTimes.asr).tz("America/Chicago").format("h:mm A");
  let maghrib = moment(prayerTimes.maghrib)
    .tz("America/Chicago")
    .format("h:mm A");
  let isha = moment(prayerTimes.isha).tz("America/Chicago").format("h:mm A");
  // call the api, store in an array

  // database time variables
  const [iqamahTimings, setIqamahTimings] = useState("");

  // database variable
  const db = getFirestore();
  const iqamahTimes = doc(db, "masjid/sanantonio/data/iqamah-times");

  // mount
  useEffect(() => {
    // initialize firebase data imports
    const getDocument = async () => {
      const one = await getDoc(iqamahTimes);
      setIqamahTimings(one.data());
    };
    getDocument();
  }, []);

  let name = "NICSA";

  useEffect(() => {
    const interval = setInterval(() => {
      setCountFormatted(
        moment.utc(nextPrayerTime.diff(moment())).format("HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let addedMaghribMinutes = iqamahTimings.MaghribAddition;
  let maghribIqamah = moment(prayerTimes.maghrib)
    .add(addedMaghribMinutes, "m")
    .tz("America/Chicago")
    .format("h:mm A");

  return (
    <LinearGradient
      colors={["#1c232b", "#2A3040", "#0e161f"]}
      style={styles.container}
    >
      {current != "none" ? (
        <PrayerCountdown name={current} count={countFormatted} />
      ) : (
        <PrayerCountdown name="Isha" count={countFormatted} />
      )}
      <Iqamaat masjid={name} />
      <PrayerLineup />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: ""
  },
});
