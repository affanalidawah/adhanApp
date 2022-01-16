import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

function AdhanLine(props) {
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
  });

  // Fajr is special as we need to show both the Fajr timing and the sunrise timing on the same line
  // We keep this condition here to render it differently
  if (props.salah === "Fajr") {
    return (
      // Display Salah name
      <View style={[styles.container, props.style]}>
        <Text style={styles.textSalahName}> {props.salah} </Text>
        {/* Display "Sunrise" and sunrise time  */}
        <View style={styles.midView}>
          <Text style={styles.midA}>Sunrise </Text>
          <Text style={styles.midB}>{props.sunrise}</Text>
        </View>
        {/* Display Salah time */}
        <Text style={styles.textSalahTime}>{props.time}</Text>
      </View>
    );
  }

  return (
    // Displau Salah name and time
    <View style={[styles.container, props.style]}>
      <Text style={styles.textSalahName}> {props.salah} </Text>
      <Text style={styles.textSalahTime}>{props.time}</Text>
    </View>
  );
}

export default AdhanLine;

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

  textSalahName: {
    color: "white",
    fontWeight: "600",
    fontSize: 22,
    fontFamily: "SFProDMedium",
  },
  textSalahTime: {
    color: "white",
    fontSize: 22,
    fontFamily: "SFProDMedium",
  },
  midA: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDMedium",
  },
  midB: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDMedium",
  },
  midView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // flexWrap: "wrap",
  },
});
