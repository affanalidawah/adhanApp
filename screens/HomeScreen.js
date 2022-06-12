import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import OverviewSection from "../components/OverviewSection";
import IqamaatSection from "../components/IqamaatSection";
import { LinearGradient } from "expo-linear-gradient";
import setUpAdhan from "../setUpAdhan";
import AdhanaatSection from "../components/AdhanaatSection";
const dayjs = require("dayjs");
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const adhan = require("adhan");
import completeOrder from "../completeOrder";

export default function HomeScreen() {
  // General variables for the Masjid
  const name = "NICSA";
  let order = completeOrder();
  let nextTiming = dayjs(order.nextTiming());
  // console.log(nextTiming);
  let currentName = order.currentName();

  // Setup to show {countdown} until {next prayer}

  return (
    // This allows for the background to be a gradient view
    currentName === "Fajr" ? (
      <LinearGradient colors={["#1b4467", "#090e25"]} style={styles.container}>
        <OverviewSection name={currentName} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Duha" ? (
      <LinearGradient colors={["#0a1154", "#0a1154"]} style={styles.container}>
        <OverviewSection name={currentName} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Dhuhr" || currentName === "Jumuah" ? (
      <LinearGradient colors={["#659ca6", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Asr" ? (
      <LinearGradient colors={["#60ade6", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : currentName === "Maghrib" ? (
      <LinearGradient colors={["#97473a", "#1f4e7a"]} style={styles.container}>
        <OverviewSection name={currentName} />
        <IqamaatSection masjid={name} />
        <AdhanaatSection />
      </LinearGradient>
    ) : (
      <LinearGradient colors={["#0a1154", "#1f4e7a"]} style={styles.container}>
        {/* Show the logo, the name of the current Salah, and the countdown at the top */}
        <OverviewSection name={currentName} />
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
