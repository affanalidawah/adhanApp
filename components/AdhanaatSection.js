import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import setUpAdhan from "../setUpAdhan";
import AdhanLine from "./AdhanLine";
import { Ionicons } from "@expo/vector-icons";
import useImportData from "../getImportData";
import * as Font from "expo-font";
const dayjs = require("dayjs");
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
import completeOrder from "../completeOrder";
import NightTimes from "./NightTimes";

export default function AdhanaatSection(props) {
  // This is the setup for loading the custom fonts
  // Variable set to true if fonts load succesfully
  const [isLoaded, setIsLoaded] = useState(false);

  // These are the fonts we want to import
  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
      SFProDRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    });
    setIsLoaded(true);
  }
  // Pulls in fonts on mount
  useEffect(() => {
    loadAssetsAsync();
  }, []);

  // this is where we get the adhan TIMINGS so that we can send them to the AdhanLine component
  const prayerTimes = setUpAdhan();
  const order = completeOrder();
  const currentName = order.currentName();
  let fajr = dayjs(prayerTimes.fajr).tz("America/Chicago").format("h:mm A");
  let sunrise = dayjs(prayerTimes.sunrise)
    .tz("America/Chicago")
    .format("h:mm A");
  let dhuhr = dayjs(prayerTimes.dhuhr).tz("America/Chicago").format("h:mm A");
  let asr = dayjs(prayerTimes.asr).tz("America/Chicago").format("h:mm A");
  let maghrib = dayjs(prayerTimes.maghrib)
    .tz("America/Chicago")
    .format("h:mm A");
  let isha = dayjs(prayerTimes.isha).tz("America/Chicago").format("h:mm A");
  let jumuah = "2:00 PM";
  let midnight = "";
  let lastThird = "";

  let currentTime = dayjs();

  if (currentTime.isAfter(order.ishaAdhan)) {
    midnight = order.curMidnight;
    lastThird = order.curLastThird;
  }
  if (currentTime.isSameOrAfter(order.fajrAdhan)) {
    midnight = order.curMidnight;
    lastThird = order.curLastThird;
  }
  if (currentTime.isBefore(order.fajrAdhan)) {
    midnight = order.prevMidnight;
    lastThird = order.prevLastThird;
  }

  midnight = dayjs(midnight).tz("America/Chicago").format("h:mm A");
  lastThird = dayjs(lastThird).tz("America/Chicago").format("h:mm A");
  // console.log(midnight);
  // console.log(lastThird);

  let fajrPassed = currentTime.isAfter(order.sunrise);
  let dhuhrPassed = currentTime.isAfter(order.asrAdhan);
  let asrPassed = currentTime.isAfter(order.maghribAdhan);
  let maghribPassed = currentTime.isAfter(order.ishaAdhan);

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
        <AdhanLine
          salah="Fajr"
          time={fajr}
          sunrise={sunrise}
          passed={fajrPassed}
        />
        <AdhanLine salah="Dhuhr" time={dhuhr} passed={dhuhrPassed} />
        <AdhanLine salah="Asr" time={asr} passed={asrPassed} />
        <AdhanLine salah="Maghrib" time={maghrib} passed={maghribPassed} />
        <AdhanLine
          salah="Isha"
          time={isha}
          style={
            currentName === "Isha"
              ? { borderBottomWidth: 0 }
              : currentName === "Midnight"
              ? { borderBottomWidth: 0 }
              : currentName === "Last Third"
              ? { borderBottomWidth: 0 }
              : {
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255, 255, 255, .6)",
                  // borderBottomWidth: "100%",
                  // borderStyle: "dashed",
                }
          }
        />

        {/* <AdhanLine
          salah="Jumuah"
          time={jumuah}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, .6)",
            // borderStyle: "dashed",
          }}
        /> */}

        {/* Display midnight and last third times */}
        <NightTimes midnight={midnight} lastThird={lastThird} />
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
    // marginBottom: 20,
    // marginBottom: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: "rgba(255, 255, 255, 0.03)",
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
