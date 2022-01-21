import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import OverviewSection from "../components/OverviewSection";
import IqamaatSection from "../components/IqamaatSection";
import { LinearGradient } from "expo-linear-gradient";
import setUpAdhan from "../setUpAdhan";
import AdhanaatSection from "../components/AdhanaatSection";
const moment = require("moment");
const adhan = require("adhan");
import completeOrder from "../completeOrder";

const HomeScreen = () => {
  // General variables for the Masjid
  const name = "NICSA";
  let [countdown, setCountdown] = useState("00:00:00");
  const prayerTimes = setUpAdhan();
  const curAdhan = prayerTimes.currentPrayer();
  const next = prayerTimes.nextPrayer();
  let [nextPrayerTime, setNextPrayerTime] = useState(
    moment(prayerTimes.timeForPrayer(next))
  );

  // Setup to show {countdown} until {next prayer}

  useEffect(() => {
    if (curAdhan === "isha" || curAdhan === "none") {
      if (
        moment().isSameOrBefore(moment({ hour: 23, minute: 59 })) &&
        moment().isAfter(moment(prayerTimes.isha))
      ) {
        setNextPrayerTime(moment(prayerTimes.fajrNext));
        console.log("jews");
      } else {
        setNextPrayerTime(moment(prayerTimes.fajr));
        console.log("Socks");
      }
    }
  }, [curAdhan]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        moment.utc(nextPrayerTime.diff(moment())).format("HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // This allows for the background to be a gradient view
    <LinearGradient colors={["#3c3b5f", "#2A3040"]} style={styles.container}>
      {/* Show the logo, the name of the current Salah, and the countdown at the top */}
      {curAdhan != "none" ? (
        <OverviewSection name={curAdhan} count={countdown} />
      ) : (
        <OverviewSection name="Isha" count={countdown} />
      )}
      {/* Show the Iqamah Timings box with names, checkmarks, and times */}
      <IqamaatSection masjid={name} />
      {/* Show the Adhan Timings box with all adhan timings and Jumuah time */}
      <AdhanaatSection />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
