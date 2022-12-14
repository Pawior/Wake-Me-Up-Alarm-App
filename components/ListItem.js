import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { LogBox } from "react-native";
import { Animated } from "react-native";
import { Database } from "../api/Database";

const ArrowUpIcon = (
  <Icon.Button
    name="ios-arrow-up-circle-outline"
    size={30}
    color="#0D4C92"
    backgroundColor="#CFF5E7"
  />
);
const windowHeight = Dimensions.get("window").height;

// ios-trash-bin
// ios-arrow-up-circle-outline
// ios-arrow-down-circle-outline

const Item = ({ item, backgroundColor, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.weekDayContainer, backgroundColor]}>
      <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const ListItem = ({ id, hour, minute, deleteFromList }) => {
  /**--------------------------------------------
   *               Hooks and data variables
   *---------------------------------------------**/
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const weekDays = [
    { name: "Pn", id: 1 },
    { name: "Wt", id: 2 },
    { name: "Sr", id: 3 },
    { name: "Cz", id: 4 },
    { name: "Pt", id: 5 },
    { name: "Sb", id: 6 },
    { name: "Nd", id: 7 },
  ];

  const heightAnim = useRef(new Animated.Value(windowHeight / 4)).current;
  const [isRolled, setIsRolled] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState();
  const [selectedId, setSelectedId] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  /**----------------------
   *    Animation utils functions
   *------------------------**/
  const heightIn = () => {
    // console.log(heightAnim);
    setIsRolled(true);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 6,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const heightOut = () => {
    setIsRolled(false);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 4,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const heightToggle = () => {
    isRolled ? heightOut() : heightIn();
    // console.log(heightAnim);
  };

  /**----------------------
   *    Db utils functions
   *------------------------**/
  const deleteFromDb = () => {
    console.log("usuwam z bazy");
    Database.remove(id);
    deleteFromList(id);
    // Database.removeAll();
  };

  /**----------------------
   *    Icons
   *------------------------**/
  const ArrowDownIcon = (
    <Icon.Button
      name="ios-arrow-down-circle-outline"
      size={30}
      color="#71C9CE"
      backgroundColor="#E3FDFD"
      onPress={heightToggle}
    />
  );

  const TrashIcon = (
    <Icon.Button
      backgroundColor="#E3FDFD"
      name="ios-trash-bin"
      size={30}
      color="#71C9CE"
      onPress={deleteFromDb}
    />
  ); // Tutaj jest button wiec mg dac onpressa

  /**----------------------
   *    Week Day Item render func
   *------------------------**/

  const renderItem = ({ item }) => {
    let backgroundColor = "";
    // console.log(item.id);

    if (selectedId.includes(item.id)) {
      backgroundColor = "#71C9CE";
    } else backgroundColor = "#CBF1F5";

    // const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedId.includes(item.id)) {
            setSelectedId(selectedId.filter((id) => id != item.id));
          } else {
            setSelectedId((prevArr) => {
              return [item.id, ...prevArr];
            });
          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  // useEffect(() => {}, [selectedId]);

  /**----------------------
   *    Handle Switch
   *------------------------**/
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: heightAnim,
        },
      ]}
    >
      <View style={styles.topContainer}>
        <Text style={{ fontSize: 45 }}>
          {hour.padStart(2, "0")}:{minute.padStart(2, "0")}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#A6E3E9" }}
          thumbColor={"#71C9CE"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        ></Switch>
      </View>
      <View style={styles.bottomContainer}>
        <Text> {TrashIcon} </Text>
        <Text> {ArrowDownIcon}</Text>
      </View>
      <View>
        <FlatList
          data={weekDays}
          horizontal={true}
          // onPress={chgWeekBgColor}
          renderItem={renderItem}
          extraData={selectedId}
        />
        {/* <Text> Pn Wt Sr Cz Pt Sb Nd</Text> */}
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
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // height: windowHeight / 4,
    justifyContent: "space-between",
    marginBottom: 30,
    overflow: "hidden",
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
  weekDayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    borderRadius: 25 / 2,
    marginHorizontal: 3,
    borderWidth: 1,
  },
});
