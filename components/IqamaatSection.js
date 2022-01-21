import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IqamahLine from "./IqamahLine";
import useImportData from "../hooks/useImportData";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";

const IqamaatSection = (props) => {
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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {/* Icon of man praying next to the title */}
        <FontAwesome5 name="pray" size={19} color="white" style={styles.icon} />
        {/* Display title of section. Use 'titleUnlaoded' if fonts didn't load properly*/}
        <Text style={isLoaded ? styles.title : styles.titleUnloaded}>
          {props.masjid} Iqama Timings
        </Text>
      </View>
      {/* Use component "Iqamah" to generate name, checkmark, and timing of each Iqamah */}
      <View style={styles.iqamaat}>
        <IqamahLine name="Fajr" time={useImportData().Fajr} />
        <IqamahLine name="Dhuhr" time={useImportData().Dhuhr} />
        <IqamahLine name="Asr" time={useImportData().Asr} />
        <IqamahLine name="Maghrib" time={useImportData().MaghribAddition} />
        <IqamahLine name="Isha" time={useImportData().Isha} />
      </View>
    </View>
  );
};

export default IqamaatSection;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    flex: 20,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "center",
    marginTop: 8,
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: "SFProDMedium",
  },
  titleUnloaded: {
    fontSize: 18,
    color: "white",
  },
  iqamaat: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    marginRight: 5,
  },
});
