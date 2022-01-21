import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  createDrawerNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import AnnouncementsScreen from "./screens/AnnouncementsScreen";
import logo from "./assets/logo.png";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // This is where we can set the theme for the default background, the menu bar, the header bar, etc.
  const MyTheme = {
    dark: true,
    colors: {
      primary: "white",
      background: "white",
      card: "rgba(60,59,95,.9)",
      text: "white",
      border: "#2A3040",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgba(60,59,95,.8)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Make the home screen */}
        <Drawer.Screen
          name="Salah Timings"
          component={HomeScreen}
          options={{ headerShown: false }}
          // options={{ headerTitle: "Northside Islamic Center" }}
          // options={{
          //   headerTitle: (props) => <LogoTitle {...props} />,
          // }}
        />
        {/* Make the settings screen */}
        <Drawer.Screen name="Announcements" component={AnnouncementsScreen} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function LogoTitle() {
  const [isLoaded, setIsLoaded] = useState(false);

  // These are the fonts we want to import
  async function loadAssetsAsync() {
    await Font.loadAsync({
      SFProDBold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    });
    setIsLoaded(true);
  }
  // Pulls in fonts on mount
  useEffect(() => {
    loadAssetsAsync();
  }, []);
  return (
    <View style={styles.title}>
      <Image style={{ width: 20, height: 20 }} source={logo} />
      <Text style={isLoaded ? styles.titleText : styles.titleTextUnloaded}>
        {" "}
        Northside Islamic Center
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    marginBottom: 10,
  },
  titleText: {
    color: "white",
    fontSize: 17,
    fontFamily: "SFProDBold",
    marginLeft: 5,
  },
});
