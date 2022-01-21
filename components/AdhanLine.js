import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import setUpAdhan from "../setUpAdhan";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import completeOrder from "../completeOrder";

export default function AdhanLine(props) {
  // This is the setup for loading the custom fonts
  // Variable set to true if fonts load succesfully
  const [isLoaded, setIsLoaded] = useState(false);

  // These are the fonts we want to import
  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDThin: require("../assets/fonts/SF-Pro-Display-Thin.otf"),
      SFProDRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
      SFProDLight: require("../assets/fonts/SF-Pro-Display-Light.otf"),
    });
    setIsLoaded(true);
  }
  // Pulls in fonts on mount
  useEffect(() => {
    loadAssetsAsync();
  }, []);

  // Find out what the current Salah is to highlight it
  const order = completeOrder();
  const currentName = order.currentName();

  // Fajr is special as we need to show both the Fajr timing and the sunrise timing on the same line
  // We keep this condition here to render it differently
  if (props.salah === "Fajr") {
    return (
      // Display Salah name
      <View
        style={
          currentName === props.salah
            ? [styles.containerCurrent, props.style]
            : [styles.container, props.style]
        }
      >
        <Text
          style={isLoaded ? styles.textSalahName : styles.textSalahNameUnloaded}
        >
          {" "}
          {props.salah}{" "}
        </Text>
        {/* Display "Sunrise" and sunrise time  */}
        <View style={styles.midView}>
          <Text style={isLoaded ? styles.midA : styles.midAUnloaded}>
            Sunrise{" "}
          </Text>
          <Text style={isLoaded ? styles.midB : styles.midAUnloaded}>
            {props.sunrise}
          </Text>
        </View>
        {/* Display Salah time */}
        <Text
          style={isLoaded ? styles.textSalahTime : styles.textSalahTimeUnloaded}
        >
          {props.time}
        </Text>
      </View>
    );
  }

  return (
    // Displau Salah name and time
    <View
      style={
        currentName === props.salah
          ? [styles.containerCurrent, props.style]
          : [styles.container, props.style]
      }
    >
      <Text
        style={isLoaded ? styles.textSalahName : styles.textSalahNameUnloaded}
      >
        {" "}
        {props.salah}{" "}
      </Text>
      <Text
        style={isLoaded ? styles.textSalahTime : styles.textSalahTimeUnloaded}
      >
        {props.time}
      </Text>
    </View>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    borderRadius: 7,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
    justifyContent: "space-between",
    alignItems: "center",
    // flexWrap: "wrap",
  },
  containerCurrent: {
    flex: 1,
    flexDirection: "row",
    width: "95%",
    borderRadius: 7,
    backgroundColor: "rgba(255, 255, 255, .1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
    justifyContent: "space-around",
    alignItems: "center",
    // flexWrap: "wrap",
  },

  textSalahName: {
    color: "white",
    fontWeight: "600",
    fontSize: 22,
    fontFamily: "SFProDRegular",
  },
  textSalahTime: {
    color: "white",
    fontSize: 22,
    fontFamily: "SFProDRegular",
  },
  midA: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDRegular",
  },
  midB: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDRegular",
  },
  textSalahNameUnloaded: {
    color: "white",
    fontWeight: "600",
    fontSize: 22,
  },
  textSalahTimeUnloaded: {
    color: "white",
    fontSize: 22,
  },
  midAUnloaded: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  midBUnloaded: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.7)",
  },
  midView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // flexWrap: "wrap",
  },
});
