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
  const order = completeOrder();
  const nextTiming = moment(order.nextTiming());
  const nextName = order.nextName();
  const currentName = order.currentName();
  const currentTime = moment();
  let [countdown, setCountdown] = useState(
    moment.utc(nextTiming.diff(currentTime)).format("H:mm:ss")
  );

  // Setup to show {countdown} until {next prayer}

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment.duration(countdown).asMinutes() > 600) {
        setCountdown(
          moment.utc(nextTiming.diff(currentTime)).format("HH:mm:ss")
        );
      } else if (
        moment.duration(countdown).asMinutes() < 600 &&
        moment.duration(countdown).asMinutes() > 60
      ) {
        setCountdown(
          moment.utc(nextTiming.diff(currentTime)).format("H:mm:ss")
        );
      } else if (
        moment.duration(countdown).asMinutes() < 600 &&
        moment.duration(countdown).asMinutes() > 10
      ) {
        setCountdown(moment.utc(nextTiming.diff(currentTime)).format("mm:ss"));
      } else if (moment.duration(countdown).asMinutes() < 10) {
        setCountdown(moment.utc(nextTiming.diff(currentTime)).format("m:ss"));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextTiming]);

  return (
    // This allows for the background to be a gradient view
    currentName === "Fajr" ? (
      <LinearGradient colors={["#1b4467", "#090e25"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Duha" ? (
      <LinearGradient colors={["#5f7cd0", "#183860"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Dhuhr" || currentName === "Jumuah" ? (
      <LinearGradient colors={["#5f7cd0", "#183860"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Asr" ? (
      <LinearGradient colors={["#1f4e7a", "#60ade6"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Maghrib" ? (
      <LinearGradient colors={["#97473a", "#09215d"]} style={styles.container}>
        <OverviewSection name={currentName} count={countdown} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : (
      <LinearGradient colors={["#3c3b5f", "#2A3040"]} style={styles.container}>
        {/* Show the logo, the name of the current Salah, and the countdown at the top */}
        <OverviewSection name={currentName} count={countdown} />
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
