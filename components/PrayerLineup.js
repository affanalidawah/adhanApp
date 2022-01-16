import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import setUpAdhan from "../setUpAdhan";
import PrayerLine from "./PrayerLine";
import moment from "moment-timezone";
import { Ionicons } from "@expo/vector-icons";
import useImportData from "../hooks/useImportData";
import * as Font from "expo-font";

export default function PrayerLineup(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadAssetsAsync();
  });

  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    });
    setIsLoaded(true);
  }

  let prayerTimes = setUpAdhan();
  let moment = require("moment");
  let mtimezone = require("moment-timezone");
  let fajr = moment(prayerTimes.fajr).tz("America/Chicago").format("h:mm A");
  let sunrise = moment(prayerTimes.sunrise)
    .tz("America/Chicago")
    .format("h:mm A");
  let dhuhr = moment(prayerTimes.dhuhr).tz("America/Chicago").format("h:mm A");
  let asr = moment(prayerTimes.asr).tz("America/Chicago").format("h:mm A");
  let maghrib = moment(prayerTimes.maghrib)
    .tz("America/Chicago")
    .format("h:mm A");
  let isha = moment(prayerTimes.isha).tz("America/Chicago").format("h:mm A");
  let jumuah = useImportData().Jumuah1;

  if (!isLoaded) {
    console.log("FAILS");
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Ionicons
            style={styles.sun}
            name="md-sunny"
            size={19}
            color="white"
          />
          <Text style={styles.titleUnloaded}>NICSA Adhan Timings</Text>
        </View>
        <View style={styles.adhanaat}>
          <PrayerLine salah="Fajr" time={fajr} sunrise={sunrise} />
          <PrayerLine salah="Dhuhr" time={dhuhr} />
          <PrayerLine salah="Asr" time={asr} />
          <PrayerLine salah="Maghrib" time={maghrib} />
          <PrayerLine
            salah="Isha"
            time={isha}
            style={{ borderBottomWidth: 1 }}
          />
          <PrayerLine salah="Jumuah" time={jumuah} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons style={styles.sun} name="md-sunny" size={19} color="white" />
        <Text style={styles.title}>NICSA Adhan Timings</Text>
      </View>
      <View style={styles.adhanaat}>
        <PrayerLine salah="Fajr" time={fajr} sunrise={sunrise} />
        <PrayerLine salah="Dhuhr" time={dhuhr} />
        <PrayerLine salah="Asr" time={asr} />
        <PrayerLine salah="Maghrib" time={maghrib} />
        <PrayerLine
          salah="Isha"
          time={isha}
          style={{ borderBottomColor: "rgba(255, 255, 255, 0.9)" }}
        />
        <PrayerLine salah="Jumuah" time={jumuah} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 40,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    // marginBottom: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: "SFProDMedium",
  },
  titleUnloaded: {
    fontSize: 15,
    color: "white",
  },
  adhanaat: {
    flex: 9,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sun: {
    marginRight: 5,
  },
});
