import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ListItem from "./ListItem";

export const AlarmsList = ({ navigation }) => {
  const [alarmListState, setAlarmListState] = useState([]);
  const goToAddAlarm = () => {
    navigation.navigate("AddAlarm", {
      alarmListState: alarmListState,
      setAlarmListState: setAlarmListState,
    });
  };

  useEffect(() => {
    console.log(alarmListState);
  }, [alarmListState]);

  const myIcon = (
    <Icon name="plus-circle" size={80} color="#0D4C92" onPress={goToAddAlarm} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.alarmsContainer}>
        <ScrollView>
          {/* <Text> Tsegts</Text> */}
          {alarmListState.map((item) => {
            return <ListItem time={item.time}></ListItem>;
          })}
        </ScrollView>
      </View>

      <View style={styles.iconContainer}>
        <Text>{myIcon}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFF5E7",
  },
  alarmsContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
