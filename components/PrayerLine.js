import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

function PrayerLine(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadAssetsAsync();
  });

  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDThin: require("../assets/fonts/SF-Pro-Display-Thin.otf"),
      SFProDRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProDMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
      SFProDLight: require("../assets/fonts/SF-Pro-Display-Light.otf"),
    });
    setIsLoaded(true);
  }

  if (props.salah === "Fajr") {
    return (
      <View style={[styles.container, props.style]}>
        <Text style={styles.textSalahName}> {props.salah} </Text>
        <View style={styles.midView}>
          <Text style={styles.midA}>Sunrise </Text>
          <Text style={styles.midB}>{props.sunrise}</Text>
        </View>
        <Text style={styles.textSalahTime}>{props.time}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.textSalahName}> {props.salah} </Text>
      <Text style={styles.textSalahTime}>{props.time}</Text>
    </View>
  );
}

export default PrayerLine;

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
