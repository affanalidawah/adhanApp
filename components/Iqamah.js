import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment-timezone";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import setUpAdhan from "../setUpAdhan";
import * as Font from "expo-font";

const Iqamah = (props) => {
  // fonts
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
  let displayTimes = [];
  let importedTime = props.time;
  let prayerTimes = setUpAdhan();
  let moment = require("moment");
  let mtimezone = require("moment-timezone");
  if (props.name === "Maghrib") {
    let addedMaghribMinutes = props.time;
    importedTime = moment(prayerTimes.maghrib)
      .add(addedMaghribMinutes, "m")
      .tz("America/Chicago")
      .format("h:mm A");
  }
  let convertedTime = moment(importedTime, "HH:mm a");
  if (!isLoaded || importedTime === undefined) {
    return (
      <View style={styles.iqamah}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameUnloaded}>{props.name}</Text>
        </View>
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
        <View style={styles.timingContainer}>
          <Text style={styles.timingTopUnloaded}>1:11</Text>
          <Text style={styles.timingBottomUnloaded}>PM</Text>
        </View>
      </View>
    );
  } else {
    displayTimes = importedTime.split(" ");
    return (
      <View style={styles.iqamah}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.checkmarkContainer}>
          {moment().isSameOrAfter(convertedTime) ? (
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={27}
              color="#0B6E4F"
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={27}
              color="white"
            />
          )}
        </View>
        <View style={styles.timingContainer}>
          <Text style={styles.timingTop}>{displayTimes[0]}</Text>
          <Text style={styles.timingBottom}>{displayTimes[1]}</Text>
        </View>
      </View>
    );
  }
};

export default Iqamah;

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
