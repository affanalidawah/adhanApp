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
  let [countdown, setCountdown] = useState("00:00:00");
  const order = completeOrder();
  const nextTiming = order.nextTiming();
  const nextName = order.nextName();
  const currentName = order.currentName();

  // Setup to show {countdown} until {next prayer}

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(moment.utc(nextTiming.diff(moment())).format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // This allows for the background to be a gradient view
    <LinearGradient colors={["#3c3b5f", "#2A3040"]} style={styles.container}>
      {/* Show the logo, the name of the current Salah, and the countdown at the top */}
      <OverviewSection name={currentName} count={countdown} />
      {/* Show the Iqamah Timings box with names, checkmarks, and times */}
      <IqamaatSection masjid={name} />
      {/* Show the Adhan Timings box with all adhan timings and Jumuah time */}
      <AdhanaatSection />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
