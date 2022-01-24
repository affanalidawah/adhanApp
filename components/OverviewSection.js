import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import moment from "moment-timezone";
import { useEffect, useState } from "react/cjs/react.development";
import * as Font from "expo-font";
import setUpAdhan from "../setUpAdhan";
import logo from "../assets/logo.png";
const mtimezone = require("moment-timezone");
import completeOrder from "../completeOrder";

// This provides the masjid logo, the current Salah time, and the countdown for the next Iqamah/Salah
export default function OverviewSection(props) {
  order = completeOrder();
  next = order.nextName();

  // This is the setup for loading the custom fonts
  // Variable set to true if fonts load succesfully
  const [isLoaded, setIsLoaded] = useState(false);

  // These are the fonts we want to import
  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDThin: require("../assets/fonts/SF-Pro-Display-Thin.otf"),
      SFProDRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    });
    setIsLoaded(true);
  }

  // Pulls in fonts on mount
  useEffect(() => {
    loadAssetsAsync();
  }, []);

  let countdown = props.count;
  // For some reasons it is reading these as seconds instead of minutes....
  let countdownMinutes = moment.duration(props.actualCount).asMinutes();
  // console.log(countdownMinutes);

  return (
    <View style={styles.container}>
      {/* Display masjid logo */}
      <View style={styles.masjidLogoAndNameContainer}>
        {/* <View style={styles.masjidLogoContainer}>
          <Image source={logo} style={styles.logo} />
        </View> */}
        <View style={styles.nameContainer}>
          {/* Display name of current Salah */}
          <Text style={isLoaded ? styles.salahName : styles.salahNameUnloaded}>
            {props.name}
          </Text>
        </View>
      </View>
      {/* Displays first the countdown until the current Iqamah,
      and then when that passes it counts down until the next adhan time */}
      <View style={styles.countdownContainer}>
        <Text
          style={
            isLoaded && countdownMinutes < 15
              ? [styles.salahCountdown, { color: "#d82e3f" }]
              : countdownMinutes < 15
              ? [styles.salahCountdownUnloaded, { color: "#d82e3f" }]
              : isLoaded && countdownMinutes < 30
              ? [styles.salahCountdown, { color: "#ffe135" }]
              : countdownMinutes < 30
              ? [styles.salahCountdownUnloaded, { color: "#ffe135" }]
              : isLoaded && countdownMinutes < 45
              ? [styles.salahCountdown, { color: "#fff44f" }]
              : countdownMinutes < 45
              ? [styles.salahCountdownUnloaded, { color: "#fff44f" }]
              : isLoaded
              ? styles.salahCountdown
              : styles.salahCountdownUnloaded
          }
        >
          ~{countdown} until {next}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 90,
    resizeMode: "contain",
    // backgroundColor: "black",
  },
  container: {
    flex: 15,
    marginTop: 43,
    // width: "90%",
    // alignItems: "flex-end",
    // justifyContent: "center",
  },
  masjidLogoAndNameContainer: {
    flex: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  nameContainer: {
    flex: 1,
    // width: "30%",
    alignItems: "center",
    // backgroundColor: "green",
    justifyContent: "center",
  },
  masjidLogoContainer: {
    alignItems: "flex-end",
    // marginRight: 10,
    justifyContent: "center",
  },
  countdownContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  salahNameUnloaded: {
    color: "white",
    fontSize: 80,
    fontWeight: "300",
    letterSpacing: -0.5,
    alignItems: "center",
  },

  salahName: {
    color: "white",
    fontSize: 70,
    fontFamily: "SFProDThin",
    letterSpacing: -0.5,
    marginTop: 5,
  },
  salahCountdownUnloaded: {
    color: "white",
    fontSize: 24,
    fontWeight: "300",
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
  iqamahUpdateUnloaded: {
    color: "white",
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 5,
  },
});
