import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAnt from "react-native-vector-icons/AntDesign";
import ListItem from "./ListItem";
import { Database } from "../api/Database";

export const AlarmsList = ({ navigation }) => {
  const [alarmListState, setAlarmListState] = useState([]);
  const [newRecord, setNewRecord] = useState(false);
  const goToAddAlarm = () => {
    navigation.navigate("AddAlarm", {
      alarmListState: alarmListState,
      setAlarmListState: setAlarmListState,
      newRecord: newRecord,
      setNewRecord: setNewRecord,
    });
  };

  useEffect(() => {
    // console.log(alarmListState);
    setAlarmListState([]);
    Database.getAll().then((all) => {
      console.log(JSON.parse(all));
      let fetchedAlarms = JSON.parse(all);
      fetchedAlarms.rows._array.forEach((alarm) => {
        setAlarmListState((prevArr) => {
          return [...prevArr, alarm];
        });
      });
    });
  }, [newRecord]);
  useEffect(() => {
    Database.getAll().then((all) => {
      console.log(JSON.parse(all));
    });
  }, []);
  useEffect(() => {
    console.log(alarmListState);
  }, [alarmListState]);

  const deleteFromList = (id) => {
    setAlarmListState(() => {
      return alarmListState.filter((alarm) => alarm.id != id);
    });
  };

  const plusIcon = (
    <Icon name="plus-circle" size={80} color="#71C9CE" onPress={goToAddAlarm} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.alarmsContainer}>
        <ScrollView>
          {alarmListState.map((item, idx) => {
            return (
              <ListItem
                key={item.id}
                id={item.id}
                hour={item.hour}
                minute={item.minute}
                deleteFromList={deleteFromList}
                // alarmListState={alarmListState}
                // setAlarmListState={setAlarmListState}
              ></ListItem>
            );
          })}
        </ScrollView>
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
  alarmsContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
