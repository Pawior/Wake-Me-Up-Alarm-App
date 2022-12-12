import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

// import ListItem from "./components/ListItem";
import Main from "./components/Main";
import { AlarmsList } from "./components/AlarmsList";
import { AddAlarm } from "./components/AddAlarm";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator();

import { Database } from "./api/Database";

export default function App() {
  useEffect(() => {
    Database.createTable();
    console.log("tabela utworzona");
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AlarmsList" component={AlarmsList} />
        <Stack.Screen name="AddAlarm" component={AddAlarm} />
      </Stack.Navigator>
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

/* 
colors palette:
71C9CE
A6E3E9
CBF1F5
E3FDFD
https://colorhunt.co/palette/e3fdfdcbf1f5a6e3e971c9ce
*/
