import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  setDoc,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../db/Config";
import CurrentUser from "../consts/CurrentUser";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore } from "firebase/firestore";
import { app } from "../../db/Config";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
const AppointmentConfirmation = ({ navigation, route }) => {
  let item = route.params.doctor;
  const [Time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [showPicker, setShowPicker] = useState(false);

  let image = item.image;
  const onDateChange = (event, newDate) => {
    setShowPicker(false);
    setDate(newDate.toDateString());
  };

  const openPicker = () => {
    setShowPicker(true);
  };
  function addChat(Chat) {
    addDoc(collection(db, "chats"), Chat);
  }

  //console.log(CurrentUser.user);

  const addNewChat = () => {
    addChat({
      user_id: CurrentUser.user.id,
      chat: [],
      doctor: item,
    });
  };
  const chatwith = () => {
    addNewChat();
    navigation.navigate("Chat");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <Text style={styles.heading}>Appointment</Text>
      </View>
      <View style={styles.header}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/Herbal_Medicine_Male_Avatar.png")
          }
          style={styles.cardPhoto}
        />
        <View>
          <Text style={styles.text1}> {item.name}</Text>
          <Text style={styles.text2}> {item.describtion}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.box}>
          <Text style={styles.text}>Patients</Text>
          <Text style={styles.text}>{1600}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>price</Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Review</Text>
          <TouchableOpacity>
            <Text style={styles.text}>3.00 K</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.text3}>Biography </Text>

          <ScrollView>
            <Text style={styles.inp} numberOfLines={10}>
              {item.describtion}
            </Text>
          </ScrollView>
        </View>
        <View style={{}}>
          <Text style={styles.text3}>Working Hours</Text>
        </View>
        <View>
          <Picker
            selectedValue={Time}
            onValueChange={(value, index) => setTime(value)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="5:30 PM" value="5:30 PM" />
            <Picker.Item label="7:30 PM" value="7:30 PM" />
            <Picker.Item label="9:30 PM" value="9:30 PM" />
            <Picker.Item label="10:30 PM" value="10:30 PM" />
          </Picker>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.text3}>Working Days</Text>

          <View>
            <Text style={{ fontSize: 14 }}>Selected date: {date}</Text>
            <Button
              color={"#73caa4"}
              title="Select date"
              onPress={openPicker}
            />
            {showPicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                onChange={onDateChange}
              />
            )}
          </View>
        </View>
        <View
          style={{ flexDirection: "row", marginHorizontal: 10, height: "17%" }}
        >
          <TouchableOpacity style={styles.button} onPress={chatwith}>
            <Ionicons
              name="ios-chatbubble-ellipses-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() =>
              navigation.navigate("Details_user_to_appointment", {
                item,
                Time,
                date,
              })
            }
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flex: 2,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    // marginVertical: 6,
    margin: 5,
    padding: 10,
  },
  header1: {
    marginBottom: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flex: 5,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  text: {
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "center",
  },
  text1: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  text3: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
    // padding:10
  },
  text2: {
    paddingLeft: 5,
    fontSize: 16,
    // fontWeight:"bold",
    textAlign: "justify",
  },
  text4: {
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "center",
  },
  cardPhoto: {
    width: "40%",
    height: "80%",
    borderRadius: 10,
  },
  box: {
    height: "80%",
    width: "32%",
    borderWidth: 3,
    borderColor: "#efefef",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  box1: {
    height: "60%",
    width: "32%",
    borderWidth: 3,
    borderColor: "#efefef",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  titleText: {
    fontSize: 20,
    //paddingBottom: 7
  },
  button: {
    fontSize: 18,
    paddingHorizontal: "5%",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#ffffff",
    backgroundColor: "#288771",
    justifyContent: "center",
    height: "100%",
    width: "20%",
  },
  inp: {
    borderRadius: 10,
    borderColor: "#efefef",
    borderWidth: 3,
    fontSize: 15,
    padding: 10,
    width: "100%",
    backgroundColor: "#efefef",
  },
  button1: {
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#ffffff",
    backgroundColor: "#288771",
    justifyContent: "center",
    height: "100%",
    width: "80%",
    left: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  picker: {
    height: 50,
    margin: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
});

export default AppointmentConfirmation;
