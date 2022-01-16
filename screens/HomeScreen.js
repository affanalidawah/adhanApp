import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import OverviewSection from "../components/OverviewSection";
import IqamaatSection from "../components/IqamaatSection";
import { LinearGradient } from "expo-linear-gradient";
import setUpAdhan from "../setUpAdhan";
import AdhanaatSection from "../components/AdhanaatSection";
const moment = require("moment");
const adhan = require("adhan");

const HomeScreen = () => {
  // General variables for the Masjid
  const name = "NICSA";

  // Setup to show {countdown} until {next prayer}
  const [countdown, setCountdown] = useState("00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        moment.utc(nextPrayerTime.diff(moment())).format("HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set up for calculating proper adhan timings
  const prayerTimes = setUpAdhan();
  const sunnahTimes = new adhan.SunnahTimes(prayerTimes);
  const middleOfTheNight = moment(sunnahTimes.middleOfTheNight)
    .tz("America/Chicago")
    .format("DD h:mm A");
  const lastThirdOfTheNight = moment(sunnahTimes.lastThirdOfTheNight)
    .tz("America/Chicago")
    .format("DD h:mm A");
  const current = prayerTimes.currentPrayer();
  const next = prayerTimes.nextPrayer();
  let nextPrayerTime = moment(prayerTimes.timeForPrayer(next));

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

  useEffect(() => {
    // if time is between Isha and 12:00, use all the values from today (midnight, lastThird)
    //once it reaches 12:00, then we tell it to use midnightLast and lastThirdLast bcs now the values have refreshed
    // make sure midnight is after 12:00 with if statement
    // once we pass lastThirdLast, then we can just switch to the current times and count down to Fajr
  }, []);

  return (
    // This allows for the background to be a gradient view
    <LinearGradient
      colors={["#1c232b", "#2A3040", "#0e161f"]}
      style={styles.container}
    >
      {/* Show the logo, the name of the current Salah, and the countdown at the top */}
      {current != "none" ? (
        <OverviewSection name={current} count={countdown} />
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
