import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Iqamah from "./Iqamah";
import useImportData from "../hooks/useImportData";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";

const Iqamaat = (props) => {
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
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesome5
            name="pray"
            size={19}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.titleUnloaded}>{props.masjid} Iqama Timings</Text>
        </View>
        <View style={styles.iqamaat}>
          <Iqamah name="Fajr" time={useImportData().Fajr} />
          <Iqamah name="Dhuhr" time={useImportData().Dhuhr} />
          <Iqamah name="Asr" time={useImportData().Asr} />
          <Iqamah name="Maghrib" time={useImportData().MaghribAddition} />
          <Iqamah name="Isha" time={useImportData().Isha} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome5 name="pray" size={19} color="white" style={styles.icon} />
        <Text style={styles.title}>{props.masjid} Iqama Timings</Text>
      </View>
      <View style={styles.iqamaat}>
        <Iqamah name="Fajr" time={useImportData().Fajr} />
        <Iqamah name="Dhuhr" time={useImportData().Dhuhr} />
        <Iqamah name="Asr" time={useImportData().Asr} />
        <Iqamah name="Maghrib" time={useImportData().MaghribAddition} />
        <Iqamah name="Isha" time={useImportData().Isha} />
      </View>
    </View>
  );
};

export default Iqamaat;

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
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: "SFProDMedium",
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
