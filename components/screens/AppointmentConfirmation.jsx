

import React, { useEffect } from "react";
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
import getTimeList from "../../database/getTimeList";
import { getAppointment_by_doc_id } from "../../database/Users";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";

const AppointmentConfirmation = ({ navigation, route }) => {
  let item = route.params.doctor;
  const { timeList, setTimeList } = useContext(AppContext)
  const [Time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [showPicker, setShowPicker] = useState(false);
  let image = item.image;
  const onDateChange = (event, newDate) => {
    setShowPicker(false);
    setDate(newDate.toDateString());
    var timeList1 = getTimeList(item.start, item.end);
    getAppointment_by_doc_id(item.id, newDate.toDateString()).then((res) => {
      res.status != "failed" ? res.map((e) => {
        timeList1 = timeList1.filter(ele => ele !== e.time.toString())
      }) : setTimeList(timeList1);
      setTimeList(timeList1);
    }

    )
    

  };
  useEffect(() => {
    var timeList1 = getTimeList(item.start, item.end);
    getAppointment_by_doc_id(item.id,date).then((res) => {
      res.status != "failed" ? res.map((e) => {
        timeList1 = timeList1.filter(ele => ele !== e.time.toString())
      }) : setTimeList(timeList1)
  }
    )
    setTimeList(timeList1)
  }, [])

  const openPicker = () => {
    setShowPicker(true);
  };
  function addChat(Chat) {
    addDoc(collection(db, "chats"), Chat);
  }
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
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={styles.heading}>Appointment</Text>
        </View>
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
        <Button
          color={"#73caa4"}
          title="Location"
          onPress={() => navigation.navigate("MapScreen", item.address)}
        />
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
            {timeList.map((e, i) => (
              <Picker.Item label={e} value={e} key={i} />
            ))}
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
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 30,
    // marginBottom: 20,
    

  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    

  },
  
  Go_Back: {
   
    width:"10%",
    // left:1
    },
    Go_Back1: {
      // marginTop:15,
      width:"35%",
      
  
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
