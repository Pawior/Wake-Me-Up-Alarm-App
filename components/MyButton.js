import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MyButton = ({ color, text, testProp2, passedFunc }) => {
  const handlePress = (passedFunc) => {
    passedFunc();
    console.log("pressing");
  };

  return (
    <TouchableOpacity onPress={() => handlePress(passedFunc)}>
      <View style={styles(color).btn}>
        <Text
          // adjustsFontSizeToFit={true}
          // numberOfLines={2}
          style={{ color: "white", fontSize: 20 }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = (color) => {
  return StyleSheet.create({
    btn: {
      backgroundColor: color,
      minWidth: 20,
      maxWidth: 200,
      minHeight: 35,
      borderRadius: 10,
      marginHorizontal: 3,
      paddingHorizontal: 10,
      paddingVertical: 2,
      // display: "flex",
      // alignItems: "center",
      margin: 10,
      // textAlignVertical: "center",
      // textAlign: "center",

      // width: "100%",
      // textAlign: "center",
    },
  });
};
