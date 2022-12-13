import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Database } from "../api/Database";

export const AddAlarm = ({ route, navigation }) => {
  const { alarmListState, setAlarmListState, newRecord, setNewRecord } =
    route.params;

  const [minOrHour, setMinOrHour] = useState(true);
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");

  const addToDb = (objToAdd) => {
    console.log("dodaje");
    console.log(objToAdd);
    console.log(objToAdd.hour);
    console.log(objToAdd.minute);
    Database.add(objToAdd.hour, objToAdd.minute, objToAdd.turned);
  };
  const addAlarmFunc = () => {
    navigation.navigate("AlarmsList");
    let objToAdd = {
      id: alarmListState.length + 1,
      hour: "00",
      minute: "00",
      turned: false,
    };
    // setAlarmListState([objToAdd, ...alarmListState]);
    setNewRecord(() => !newRecord);
    addToDb(objToAdd);
  };

  const switchMinHour = () => {
    setMinOrHour(!minOrHour);
  };

  // Icon
  const plusIcon = (
    <Icon name="plus-circle" size={80} color="#71C9CE" onPress={addAlarmFunc} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.minHourContainer}>
        <TouchableOpacity onPress={switchMinHour}>
          <Text
            style={[
              styles.bigText,
              minOrHour ? { color: "#D7263D" } : { color: "black" },
            ]}
          >
            {hour.padStart(2, "0")}
          </Text>
        </TouchableOpacity>
        <Text style={styles.bigText}>:</Text>
        <TouchableOpacity onPress={switchMinHour}>
          <Text
            style={[
              styles.bigText,
              minOrHour ? { color: "black" } : { color: "#D7263D" },
            ]}
          >
            {minute.padStart(2, "0")}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          Kliknij "+" aby dodać Alarm do bazy z godziną 00:00
        </Text>
      </View> */}
      <View style={styles.pickContainer}></View>

      <View style={styles.iconContainer}>
        <Text>{plusIcon}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3FDFD",
  },
  infoTextContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 30,
    marginHorizontal: 40,
    textAlign: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  minHourContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  bigText: {
    fontSize: 75,
  },
  pickContainer: {
    flex: 5,
  },
});
