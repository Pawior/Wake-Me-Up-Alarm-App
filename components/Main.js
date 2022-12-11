import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export const Main = ({ navigation }) => {
  const moveToList = () => {
    navigation.navigate("AlarmsList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginRight: 10,
        }}
        onPress={moveToList}
      >
        <Text style={{ fontSize: 90, textAlign: "center" }}> SQLite App</Text>
      </TouchableOpacity>
      <Text style={styles.smallText}> manage sqlite</Text>
      <Text style={styles.smallText}> database</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A0E4CB",
  },
  smallText: {
    fontSize: 17,
    marginRight: 10,
  },
});
