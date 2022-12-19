import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Vibration,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { LogBox } from "react-native";
import { Animated } from "react-native";
import { Database } from "../api/Database";
import { Audio } from "expo-av";

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
  const [sound, setSound] = useState(undefined);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/cyber-alarm.mp3")
    );
    // setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  const weekDays = [
    { name: "Pn", id: 1 },
    { name: "Wt", id: 2 },
    { name: "Sr", id: 3 },
    { name: "Cz", id: 4 },
    { name: "Pt", id: 5 },
    { name: "Sb", id: 6 },
    { name: "Nd", id: 7 },
  ];

  const heightAnim = useRef(new Animated.Value(windowHeight / 3)).current;
  const [isRolled, setIsRolled] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState();
  const [selectedId, setSelectedId] = useState([]);
  const [isSound, setIsSound] = useState(false);
  const [isVibration, setIsVibration] = useState(false);

  /**----------------------
   *    Animation utils functions
   *------------------------**/
  const heightIn = () => {
    // console.log(heightAnim);
    setIsRolled(true);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 4.5,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const heightOut = () => {
    setIsRolled(false);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 3,
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
      // style={{ width: 10 }}
    />
  ); // Tutaj jest button wiec mg dac onpressa
  const MusicOnIcon = (
    <IconMaterial.Button
      backgroundColor="#E3FDFD"
      name="music"
      size={40}
      color="#71C9CE"
      // onPress={deleteFromDb}
      // style={{ width: 10 }}
    />
  );
  const MusicOffIcon = (
    <IconMaterial.Button
      backgroundColor="#E3FDFD"
      name="music-off"
      size={40}
      color="#71C9CE"
      // onPress={deleteFromDb}
      // style={{ width: 10 }}
    />
  );
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
   *    Handle Switches
   *------------------------**/
  async function stopRecording() {
    console.log("Stopping recording..");
    await sound.unloadAsync();
    setSound(undefined);

    // await sound.stopAndUnloadAsync();
    console.log("Recording stopped and stored at");
  }
  const toggleSoundSwitch = async () => {
    if (isSound == false) {
      stopRecording().catch(console.error);
    }
    setIsSound((previousState) => !previousState);

    // stopRecording();
    // setTimeout(async () => {
    // }, 500);
  };
  // useEffect(() => {
  //   console.log("useEffect");
  //   console.log(sound);
  //   console.log(isSound);
  //   if (isSound == false && sound != undefined) {
  //     console.log("robie");
  //     stopRecording().catch(console.error);
  //   }
  //   // clearInterval(clockTickerInteval);
  // }, [isSound]);
  const toggleVibrationSwitch = () => {
    Vibration.cancel();
    setIsVibration((previousState) => !previousState);
  };

  /**----------------------
   *   Clock Mechanism Handler
   *------------------------**/
  let clockTickerInteval;
  // const clockMechanism = () => {
  // };
  // clockMechanism();
  const startAlarm = (sound, vibra) => {
    console.log(isSound);
    console.log(isVibration);
    if (isSound) {
      playSound();
    }
    if (isVibration) {
      Vibration.vibrate(5000, false);
    }
  };

  // playSound();
  clockTickerInteval = setInterval(() => {
    let currHour = new Date().getHours();
    let currMinute = new Date().getMinutes();
    // console.log("hour: " + currHour);
    // console.log("Minute: " + currMinute);
    // console.log("vibra: " + isVibration);
    // console.log("sound: " + isSound);

    if (currHour == parseInt(hour) && currMinute == parseInt(minute)) {
      console.log("ring ring");
      console.log(isSound);
      console.log(isVibration);
      startAlarm(isSound, isVibration);

      clearInterval(clockTickerInteval);
    }
    // console.log("odliczam czas");
  }, 500);
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(isSound);
  //   }, 666);
  // }, [isSound]);
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
        {isVibration ? (
          <Text style={{ fontSize: 45, color: "#D7263D" }}>
            {hour.padStart(2, "0")}:{minute.padStart(2, "0")}
          </Text>
        ) : (
          <Text style={{ fontSize: 45, color: "#000" }}>
            {hour.padStart(2, "0")}:{minute.padStart(2, "0")}
          </Text>
        )}

        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#A6E3E9" }}
            thumbColor={"#D7263D"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVibrationSwitch}
            value={isVibration}
          ></Switch>
          <Switch
            trackColor={{ false: "#767577", true: "#A6E3E9" }}
            thumbColor={"#71C9CE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSoundSwitch}
            value={isSound}
          ></Switch>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text> {TrashIcon} </Text>
        <Text> {ArrowDownIcon}</Text>
        <Text> {isSound ? MusicOnIcon : MusicOffIcon}</Text>
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
