import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
// const myIcon = <Icon name="plus-square" size={30} color="#900" />;

export const AddAlarm = ({ route, navigation }) => {
  const { alarmListState, setAlarmListState } = route.params;

  const addAlarmFunc = () => {
    navigation.navigate("AlarmsList");
    let objToAdd = {
      id: "1",
      time: "00:00",
    };
    setAlarmListState([objToAdd, ...alarmListState]);
  };

  const myIcon = (
    <Icon name="plus-circle" size={80} color="#0D4C92" onPress={addAlarmFunc} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          Kliknij "+" aby dodać Alarm do bazy z godziną 00:00
        </Text>
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
  },
});
