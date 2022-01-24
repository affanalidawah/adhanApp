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

export default function HomeScreen() {
  // General variables for the Masjid
  const name = "NICSA";
  let order = completeOrder();
  let nextTiming = moment(order.nextTiming());
  // console.log(nextTiming);
  let currentName = order.currentName();
  let currentTime = moment();
  let curVal = moment.utc(nextTiming.diff(currentTime)).format("HH:mm:ss");
  let [countdown, setCountdown] = useState(
    curVal.substring(0, 4) === "00:0"
      ? curVal.substring(4)
      : curVal.substring(0, 3) === "00:"
      ? curVal.substring(3)
      : curVal.substring(0, 1) === "0"
      ? curVal.substring(1)
      : curVal.substring(1)
  );

  // Setup to show {countdown} until {next prayer}
  // console.log(moment.duration(countdown).minutes());

  // console.log(moment.utc(nextTiming.diff(currentTime)).format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      nextTiming = moment(order.nextTiming());
      currentTime = moment();
      let curVal = moment.utc(nextTiming.diff(currentTime)).format("HH:mm:ss");
      // console.log(nextTiming);
      // console.log(currentTime);
      // console.log(curVal);
      curVal.substring(0, 4) === "00:0"
        ? setCountdown(curVal.substring(4))
        : curVal.substring(0, 3) === "00:"
        ? setCountdown(curVal.substring(3))
        : curVal.substring(0, 1) === "0"
        ? setCountdown(curVal.substring(1))
        : setCountdown(curVal.substring(1));
      // console.log(countdown);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // This allows for the background to be a gradient view
    currentName === "Fajr" ? (
      <LinearGradient colors={["#1b4467", "#090e25"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Duha" ? (
      <LinearGradient colors={["#5f7cd0", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Dhuhr" || currentName === "Jumuah" ? (
      <LinearGradient colors={["#659ca6", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Asr" ? (
      <LinearGradient colors={["#60ade6", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Maghrib" ? (
      <LinearGradient colors={["#97473a", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : (
      <LinearGradient colors={["#0a1154", "#1f4e7a"]} style={styles.container}>
        {/* Show the logo, the name of the current Salah, and the countdown at the top */}
        <OverviewSection
          name={currentName}
          count={countdown}
          actualCount={moment
            .utc(nextTiming.diff(currentTime))
            .format("HH:mm:ss")}
        />
        {/* Show the Iqamah Timings box with names, checkmarks, and times */}
        <IqamaatSection masjid={name} />
        {/* Show the Adhan Timings box with all adhan timings and Jumuah time */}
        <AdhanaatSection />
      </LinearGradient>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
