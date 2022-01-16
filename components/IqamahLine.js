import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment-timezone";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import setUpAdhan from "../setUpAdhan";
import * as Font from "expo-font";
const mtimezone = require("moment-timezone");

const IqamahLine = (props) => {
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

  // This is where we import the Iqamah timings
  // Iqamah times are set by the masjid and are imported from the database
  // Get time from props
  let importedTime = props.time;

  // Convert imported string to time format with Moment
  let convertedTime = moment(importedTime, "HH:mm a");

  // Set up Maghrib Iqama
  // Maghrib Iqama is different from the others as usually it is a certain number of minutes after the Adhan
  // The masjid can choose how many minutes after Adhan their Iqamah will be, and this is imported as "addedMaghribMinutes"
  // This sets up the Adhan object
  let prayerTimes = setUpAdhan();
  if (props.name === "Maghrib") {
    let addedMaghribMinutes = props.time;
    // Add "addedMaghribMinutes" to the Maghrib Adhan time
    importedTime = moment(prayerTimes.maghrib)
      .add(addedMaghribMinutes, "m")
      .tz("America/Chicago")
      .format("h:mm A");
  }

  // Boolean to check if the time was imported succesfully
  let isImported = false;
  if (importedTime != undefined) {
    isImported = true;
  }

  // Split imported time into time (ex: 4:30) and AM/PM
  let displayTimes = [];
  if (isImported) {
    displayTimes = importedTime.split(" ");
  }
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
        {moment().isSameOrAfter(convertedTime) ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={27}
            color="green"
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
};

export default IqamahLine;

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
