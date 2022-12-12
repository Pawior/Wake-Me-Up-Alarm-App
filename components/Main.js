import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";

export const Main = ({ navigation }) => {
  const moveToList = () => {
    navigation.navigate("AlarmsList");
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,1)", true)}
        onPress={() => moveToList()}
        style={{
          width: 100,
          height: 100,
        }}
      >
        <View style={{ width: "100%", height: 200, background: "red" }}>
          <Text style={{ fontSize: 60, textAlign: "center" }}>
            WakeMeUp Alarm App
          </Text>
        </View>
      </TouchableNativeFeedback>
      {/* <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginRight: 10,
        }}
        onPress={moveToList}
      >
        <Text style={{ fontSize: 60, textAlign: "center" }}>
          WakeMeUp Alarm App
        </Text>
      </TouchableOpacity> */}
      <Text style={styles.smallText}> using sqlite</Text>
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
