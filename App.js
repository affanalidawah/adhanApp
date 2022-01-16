import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  // This is where we can set the theme for the default background, the menu bar, the header bar, etc.
  const MyTheme = {
    dark: true,
    colors: {
      primary: "white",
      background: "#292138",
      card: "#2A3040",
      text: "white",
      border: "#2A3040",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        {/* Make the home screen */}
        <Tab.Screen
          name="Salah Timings"
          component={HomeScreen}
          options={{ headerShown: false }}
          // options={{ title: "Northside Islamic Center" }}
        />
        {/* Make the settings screen */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
