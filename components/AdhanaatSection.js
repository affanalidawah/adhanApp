import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import setUpAdhan from "../setUpAdhan";
import AdhanLine from "./AdhanLine";
import { Ionicons } from "@expo/vector-icons";
import useImportData from "../hooks/useImportData";
import * as Font from "expo-font";
const moment = require("moment");

const AdhanaatSection = (props) => {
  // This is the setup for loading the custom fonts
  // Variable set to true if fonts load succesfully
  const [isLoaded, setIsLoaded] = useState(false);

  // These are the fonts we want to import
  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    });
    setIsLoaded(true);
  }
  // Pulls in fonts on mount
  useEffect(() => {
    loadAssetsAsync();
  });

  // this is where we get the adhan TIMINGS so that we can send them to the AdhanLine component
  const prayerTimes = setUpAdhan();
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

  return (
    <View style={styles.container}>
      {/* This shows the icon and title for the section */}
      <View style={styles.titleContainer}>
        <Ionicons style={styles.sun} name="md-sunny" size={19} color="white" />
        <Text style={isLoaded ? styles.title : styles.titleUnloaded}>
          NICSA Adhan Timings
        </Text>
      </View>
      {/* This calls the AdhanLine component for each salah and provides it with the Salah name and time*/}
      <View style={styles.adhanaat}>
        <AdhanLine salah="Fajr" time={fajr} sunrise={sunrise} />
        <AdhanLine salah="Dhuhr" time={dhuhr} />
        <AdhanLine salah="Asr" time={asr} />
        <AdhanLine salah="Maghrib" time={maghrib} />
        <AdhanLine salah="Isha" time={isha} style={{ borderBottomWidth: 1 }} />
        <AdhanLine salah="Jumuah" time={jumuah} />
      </View>
    </View>
  );
};

export default AdhanaatSection;

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
