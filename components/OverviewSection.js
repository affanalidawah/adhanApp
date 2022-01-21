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

  return (
    <View style={styles.container}>
      {/* Display masjid logo */}
      <View style={styles.masjidLogoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.nameAndCountdownContainer}>
        {/* Display name of current Salah */}
        <Text style={isLoaded ? styles.salahName : styles.salahNameUnloaded}>
          {props.name}
        </Text>
        {/* Displays first the countdown until the current Iqamah,
      and then when that passes it counts down until the next adhan time */}
        <Text
          style={
            isLoaded ? styles.salahCountdown : styles.salahCountdownUnloaded
          }
        >
          {props.count} until {next}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 104,
    resizeMode: "contain",
  },
  container: {
    flex: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  masjidLogoContainer: {
    flex: 15,
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  nameAndCountdownContainer: {
    flex: 15,
    // width: "100%",
    // alignItems: "center",
    justifyContent: "center",
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
    fontSize: 40,
    fontFamily: "SFProDThin",
    letterSpacing: -0.5,
    marginTop: 5,
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
