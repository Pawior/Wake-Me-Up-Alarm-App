import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Vibration,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Database } from "../api/Database";
const windowWidth = Dimensions.get("window").width;
import { insideData, outsideData, minuteData } from "../utils/helperData";

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
      hour: hour,
      minute: minute,
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

  // let R = windowWidth / 2 - 30;
  function toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  function sinDegrees(angleDegrees) {
    return Math.sin(((angleDegrees + 90) * Math.PI) / 180);
  }
  function cosDegrees(angleDegrees) {
    return Math.cos(((angleDegrees + 90) * Math.PI) / 180);
  }
  const pickHour = (pickedTime) => {
    console.log("pick godziny");
    setHour(pickedTime);
  };
  const pickMinute = (pickedTime) => {
    let minuteNum = parseInt(minute);
    let pickedTimeNum = parseInt(pickedTime);
    if (
      minuteNum >= pickedTimeNum &&
      minuteNum < pickedTimeNum + 4 &&
      minuteNum > pickedTimeNum - 5
    ) {
      let newVal = (parseInt(minute) + 1).toString();
      setMinute(newVal);
    } else {
      setMinute(pickedTime);
    }
  };
  const pickTime = (pickedTime) => {
    Vibration.vibrate();
    minOrHour ? pickHour(pickedTime) : pickMinute(pickedTime);
  };
  const outsideNumber = (item, i, R, isBig) => {
    let offset;
    let fontSize;
    isBig ? (offset = 153) : (offset = 158);
    isBig ? (fontSize = 25) : (fontSize = 15);
    let x = R * cosDegrees(parseInt(i) * 30) + offset;
    let y = R * sinDegrees(parseInt(i) * 30) + offset;
    // console.log("------------");
    // console.log(i);

    // let x = R * Math.cos((i * Math.PI) / 6);
    // let y = R * Math.sin((i * Math.PI) / 6);
    // console.log(Math.sin((parseInt(item.id) * Math.PI) / 6));
    // console.log(parseInt(item.id));
    // console.log(x);
    return (
      <TouchableNativeFeedback
        key={item.id}
        onPress={() => pickTime(item.id)}
        // useForeground={true}
        // style={{ borderRadius: 25 }}
        background={TouchableNativeFeedback.Ripple("#E3FDFD", true)}
      >
        <View
          style={[
            isBig ? styles.bigNumber : styles.smallNumber,
            { right: x, bottom: y },
          ]}
          key={item.id}
        >
          <Text style={isBig ? styles.bigNumberText : styles.smallNumberText}>
            {" "}
            {item.id}
          </Text>
        </View>
      </TouchableNativeFeedback>
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
        {minOrHour ? (
          <View style={styles.outsideClock}>
            {outsideData.map((item, i) => {
              return outsideNumber(item, i, windowWidth / 2 - 30, true);
            })}
            {insideData.map((item, i) => {
              return outsideNumber(item, i, windowWidth / 2 - 90, false);
            })}
          </View>
        ) : (
          <View style={styles.outsideClock}>
            {minuteData.map((item, i) => {
              return outsideNumber(item, i, windowWidth / 2 - 30, true);
            })}
          </View>
        )}
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
    textAlign: "center",
    position: "absolute",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  smallNumber: {
    backgroundColor: "#363635",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    textAlign: "center",
    position: "absolute",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bigNumberText: {
    color: "black",
    fontSize: 25,
    paddingRight: 6,
  },
  smallNumberText: {
    color: "white",
    fontSize: 15,
    paddingRight: 4,
  },
});
