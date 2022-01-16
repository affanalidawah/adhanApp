import { PrayerTimes } from "adhan";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import moment from "moment-timezone";
import { useEffect, useState } from "react/cjs/react.development";
import * as Font from "expo-font";
import setUpAdhan from "../setUpAdhan";
import logo from "../assets/logo.png";

function PrayerCountdown(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  let moment = require("moment");
  let mtimezone = require("moment-timezone");
  var adhan = require("adhan");
  var prayerTimes = setUpAdhan();
  var current = prayerTimes.currentPrayer();
  var next = prayerTimes.nextPrayer();

  var timing = moment(prayerTimes[current])
    .tz("America/Chicago")
    .format("h:mm A");

  useEffect(() => {
    loadAssetsAsync();
  });

  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDThin: require("../assets/fonts/SF-Pro-Display-Thin.otf"),
      SFProDRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    });
    setIsLoaded(true);
  }

  timing = timing.split(" ")[0];
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.masjidLogoContainer}>
          <Image source={logo} style={styles.logo} />
          {/* <Text style={styles.masjidName}>
            Northside Islamic Center of San Antonio
          </Text> */}
        </View>
        <View style={styles.salahNameContainer}>
          <Text style={styles.salahNameUnloaded}>
            {capitalizeFirstLetter(props.name)}
          </Text>
          <Text style={styles.iqamahUpdate}>Iqamah has passed</Text>
        </View>
        <View style={styles.salahCountdownContainer}>
          <Text style={styles.salahCountdownUnloaded}>
            {props.count} until {capitalizeFirstLetter(next)}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.masjidLogoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.salahNameContainer}>
        <Text style={styles.salahName}>
          {capitalizeFirstLetter(props.name)}
        </Text>
        <Text style={styles.iqamahUpdate}>Iqamah has passed</Text>
      </View>
      <View style={styles.salahCountdownContainer}>
        <Text style={styles.salahCountdown}>
          {props.count} until {capitalizeFirstLetter(next)}
        </Text>
      </View>
    </View>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default PrayerCountdown;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 104,
    resizeMode: "contain",
  },
  container: {
    flex: 30,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  masjidLogoContainer: {
    flex: 15,
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 400,
    // flexDirection: "row",
    // flexWrap: "nowrap",
    // backgroundColor: "green",
  },
  // masjidName: {
  //   color: "white",
  //   fontSize: 15,
  // },
  salahNameContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  salahCountdownContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  salahNameUnloaded: {
    color: "white",
    fontSize: 37,
    fontWeight: "300",
    letterSpacing: -0.5,
    alignItems: "center",
  },

  salahCountdownUnloaded: {
    color: "white",
    fontSize: 24,
    fontWeight: "300",
  },
  salahName: {
    color: "white",
    fontSize: 37,
    fontFamily: "SFProDMedium",
    letterSpacing: -0.5,
    marginTop: 5,
  },
  salahTime: {
    color: "white",
    fontSize: 102,
    fontFamily: "SFProDThin",
    letterSpacing: -0.5,
    marginBottom: 1,
  },
  salahCountdown: {
    color: "white",
    fontSize: 24,
    fontFamily: "SFProDRegular",
  },
  iqamahUpdate: {
    color: "white",
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDThin",
    marginBottom: 5,
    // marginTop: 5,
  },
});
