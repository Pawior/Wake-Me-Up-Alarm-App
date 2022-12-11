import { StyleSheet, Text, View, Switch, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
const trashIcon = (
  <Icon.Button
    backgroundColor="#CFF5E7"
    name="ios-trash-bin"
    size={30}
    color="#0D4C92"
  />
); // Tutaj jest button wiec mg dac onpressa
const ArrowDownIcon = (
  <Icon.Button
    name="ios-arrow-down-circle-outline"
    size={30}
    color="#0D4C92"
    backgroundColor="#CFF5E7"
  />
);

// ios-trash-bin
// ios-arrow-up-circle-outline
// ios-arrow-down-circle-outline

const ListItem = ({ time }) => {
  return (
    <View style={styles.container}>
      {/* <Text>ListItem</Text> */}
      <View style={styles.topContainer}>
        <Text style={{ fontSize: 45 }}>{time}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#0D4C92"}
          ios_backgroundColor="#3e3e3e"
        ></Switch>
      </View>
      <View style={styles.bottomContainer}>
        <Text> {trashIcon} </Text>
        <Text> {ArrowDownIcon}</Text>
      </View>
      <View>
        <Text> Pn Wt Sr Cz Pt Sb Nd</Text>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: "80%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",

    marginBottom: 30,
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    // alignItems: ""
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});
