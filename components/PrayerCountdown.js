import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import moment from "moment-timezone";
import { useEffect, useState } from "react/cjs/react.development";
import * as Font from "expo-font";
import setUpAdhan from "../setUpAdhan";
import logo from "../assets/logo.png";
// const moment = require("moment");
const mtimezone = require("moment-timezone");

function PrayerCountdown(props) {
  // Import Adhan Timings object and set up relevant timings
  var prayerTimes = setUpAdhan();
  // returns name of current prayer, ex 'isha'
  var current = prayerTimes.currentPrayer();
  var next = prayerTimes.nextPrayer();
  // Fetch the timing for the current prayer
  var timing = moment(prayerTimes[current])
    .tz("America/Chicago")
    .format("h:mm A");
  // Seperates time (ex: 4:05) with AM/PM
  timing = timing.split(" ")[0];

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
  });

  return (
    <View style={styles.container}>
      {/* Display masjid logo */}
      <View style={styles.masjidLogoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      {/* Display name of current Salah */}
      <View style={styles.salahNameContainer}>
        <Text style={isLoaded ? styles.salahName : styles.salahNameUnloaded}>
          {capitalizeFirstLetter(props.name)}
        </Text>
        {/* Needs to be updated - should countdown to Iqamah
          and then change to "Iqamah is ongoing" for five minutes after Iqamah time
          and then changed to "Iqamah has passed" when the Iqamah has passed 
          
          The color should be yellow thirty minutes before
          then red fifteen minutes before
          and green when its ongoing
          when it has passed it should be a translucent white*/}
        <Text style={styles.iqamahUpdate}>Iqamah has passed</Text>
      </View>
      {/* Displays first the countdown until the current Iqamah,
      and then when that passes it counts down until the next adhan time */}
      <View style={styles.salahCountdownContainer}>
        <Text
          style={
            isLoaded ? styles.salahCountdown : styles.salahCountdownUnloaded
          }
        >
          {props.count} until {capitalizeFirstLetter(next)}
        </Text>
      </View>
    </View>
  );
}

// Function to capitalize names of prayer times taken from Adhan object (isha -> Isha)
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
