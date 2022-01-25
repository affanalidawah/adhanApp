import React, { useEffect, useState } from "react";
import { NativeModules, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
import { MaterialCommunityIcons } from "@expo/vector-icons";
import setUpAdhan from "../setUpAdhan";
import * as Font from "expo-font";
import HasIqamahPassed from "./HasIqamahPassed";

export default function IqamahLine(props) {
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

  // This is where we import the Iqamah timings
  // Iqamah times are set by the masjid and are imported from the database
  // Get time from props
  let importedTime = props.time;

  // Set up Maghrib Iqama
  // Maghrib Iqama is different from the others as usually it is a certain number of minutes after the Adhan
  // The masjid can choose how many minutes after Adhan their Iqamah will be, and this is imported as "addedMaghribMinutes"
  // This sets up the Adhan object
  let prayerTimes = setUpAdhan();
  let current = capitalizeFirstLetter(prayerTimes.currentPrayer());
  let isCurrentPrayer = false;
  if (props.name === current) {
    isCurrentPrayer = true;
  }
  if (props.name === "Maghrib") {
    let addedMaghribMinutes = props.time;
    // Add "addedMaghribMinutes" to the Maghrib Adhan time
    importedTime = dayjs(prayerTimes.maghrib)
      .add(addedMaghribMinutes, "m")
      .tz("America/Chicago")
      .format("h:mm A");
  }

  // Boolean to check if the time was imported succesfully
  let isImported = false;
  if (importedTime != undefined) {
    isImported = true;
  }

  // Convert imported string to time format with dayjs
  let convertedTime = "0:00";

  // Split imported time into time (ex: 4:30) and AM/PM
  let displayTimes = [];
  if (isImported) {
    convertedTime = dayjs(importedTime, "HH:mm A");
    displayTimes = importedTime.split(" ");
  }

  // check which circle to use
  let whichies = HasIqamahPassed();

  return (
    <View style={styles.iqamah}>
      {/* Display name of the Salah */}
      <View style={styles.nameContainer}>
        <Text style={isLoaded ? styles.name : styles.nameUnloaded}>
          {props.name}
        </Text>
      </View>
      {/* Display one of two checkmark images based on if the current time has passed the Iqamah time */}
      <View style={styles.checkmarkContainer}>
        {whichies === "yellow" && isCurrentPrayer ? (
          <MaterialCommunityIcons
            name="bell-circle"
            size={27}
            color="#fff44f"
          />
        ) : whichies === "green" && isCurrentPrayer ? (
          <MaterialCommunityIcons
            name="play-circle"
            size={27}
            color="#28cc2d"
          />
        ) : dayjs().isSameOrAfter(convertedTime) ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={27}
            color="white"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={27}
            color="white"
          />
        )}
      </View>
      {/* Display the Iqamah time 
      It will display 1:11 PM if the Iqamah timings fail to import*/}
      <View style={styles.timingContainer}>
        <Text style={isLoaded ? styles.timingTop : styles.timingTopUnloaded}>
          {isImported ? displayTimes[0] : "1:11"}
        </Text>
        <Text
          style={isLoaded ? styles.timingBottom : styles.timingBottomUnloaded}
        >
          {isImported ? displayTimes[1] : "PM"}
        </Text>
      </View>
    </View>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  iqamah: {
    flex: 1,
    alignItems: "center",
  },
  nameContainer: {
    marginTop: 13,
    flex: 1,
  },
  nameUnloaded: {
    color: "white",
    fontSize: 17,
  },
  name: {
    color: "white",
    fontSize: 17,
    fontFamily: "SFProDMedium",
  },
  checkmarkContainer: {
    flex: 1,
  },
  timingContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  timingTopUnloaded: {
    fontSize: 22,
    color: "white",
  },
  timingBottomUnloaded: {
    fontSize: 14,
    color: "white",
  },
  timingTop: {
    fontSize: 22,
    color: "white",
    fontFamily: "SFProDMedium",
  },
  timingBottom: {
    fontSize: 14,
    color: "white",
    fontFamily: "SFProDRegular",
  },
});
