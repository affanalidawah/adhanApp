import React from "react";
import { StyleSheet, Text, View } from "react-native";
import getImportData from "../getImportData";

const AnnouncementsScreen = () => {
  return (
    <View>
      <Text>
        {getImportData().fajr} {getImportData().dhuhr} {getImportData().asr}
        {getImportData().maghrib} {getImportData().isha}
      </Text>
    </View>
  );
};

export default AnnouncementsScreen;

const styles = StyleSheet.create({});
