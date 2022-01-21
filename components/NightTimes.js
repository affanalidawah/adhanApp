import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

export default function NightTimes(props) {
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

  return (
    <View style={styles.midView}>
      <View style={styles.midGroup}>
        <Text style={isLoaded ? styles.midA : styles.midAUnloaded}>
          Midnight{" "}
        </Text>
        <Text style={isLoaded ? styles.midB : styles.midAUnloaded}>
          {props.midnight}
        </Text>
      </View>

      <View style={styles.midGroup}>
        <Text style={isLoaded ? styles.midA : styles.midAUnloaded}>
          Last Third{" "}
        </Text>
        <Text style={isLoaded ? styles.midB : styles.midAUnloaded}>
          {props.lastThird}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  midView: {
    // alignItems: "center",
    flex: 1.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "black",
    // flexWrap: "wrap",
  },
  midGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  midA: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProDRegular",
  },
  midB: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "SFProDRegular",
  },
  midAUnloaded: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  midBUnloaded: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 1)",
  },
});
