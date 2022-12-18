import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Database } from "../api/Database";
const windowWidth = Dimensions.get("window").width;

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

  const outsideData = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
    {
      id: "8",
    },
    {
      id: "9",
    },
    {
      id: "10",
    },
    {
      id: "11",
    },
    {
      id: "12",
    },
  ];
  let R = windowWidth / 2 - 30;
  let offset = 153;
  function toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  function sinDegrees(angleDegrees) {
    return Math.sin((angleDegrees * Math.PI) / 180);
  }
  function cosDegrees(angleDegrees) {
    return Math.cos((angleDegrees * Math.PI) / 180);
  }
  const outsideNumber = (item, i) => {
    let x = R * cosDegrees(parseInt(i) * 30) + offset;
    let y = R * sinDegrees(parseInt(i) * 30) + offset;
    console.log("------------");
    console.log(i);

    // let x = R * Math.cos((i * Math.PI) / 6);
    // let y = R * Math.sin((i * Math.PI) / 6);
    // console.log(Math.sin((parseInt(item.id) * Math.PI) / 6));
    // console.log(parseInt(item.id));
    // console.log(x);
    return (
      <View style={[styles.bigNumber, { right: x, bottom: y }]} key={item.id}>
        <Text> {item.id}</Text>
      </View>
    );
  };
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
      <View style={styles.pickContainer}>
        <View style={styles.outsideClock}>
          {outsideData.map((item, i) => {
            return outsideNumber(item, i);
          })}
        </View>
        <View style={styles.insideClock}></View>
      </View>

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
  outsideClock: {
    // flex: 1,
    width: windowWidth,
    height: windowWidth,
    borderRadius: windowWidth / 2,
    borderWidth: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignItems: "center",
    // transform: [{ rotate: "30deg" }],
  },
  bigNumber: {
    backgroundColor: "#A6E3E9",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    // textAlign: "center",
    position: "absolute",

    // position: "absolute",
    // top: 50,
    // left: 50,
    zIndex: 100,
    // position: "absolute",
  },
});
