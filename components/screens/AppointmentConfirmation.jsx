import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
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
import { StatusBar } from "expo-status-bar";
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
import { getAppointment_by_doc_id, insertReviews } from "../../database/Users";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import { getDocSchedule } from "../../database/Doctors";

const AppointmentConfirmation = ({ navigation, route }) => {
  let item = route.params.doctor;
  const { timeList, setTimeList } = useContext(AppContext);
  const [Time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [showPicker, setShowPicker] = useState(false);
  const { night } = useContext(AppContext);
  const { curruser } = useContext(AppContext);
  const { Days, setDays } = useContext(AppContext);
  const [type, setType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const today = new Date(); // current date
  const currentDayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, etc.
  const daysUntilFriday = currentDayOfWeek <= 5 ? 5 - currentDayOfWeek : 6;
  let image = item.image;
  const { length, setLength } = useContext(AppContext);
  const onDateChange = (event, newDate) => {
    setShowPicker(false);
    var flag = 0;
    const options = { weekday: "long" };
    const dayOfWeek = newDate
      .toLocaleDateString("en-US", options)
      .split(",")[0];
    for (let i = 0; i < Days.length; i++) {
      if (Days[i].day == dayOfWeek && Days[i].avilable == "yes") {
        flag = 1;
        break;
      }
    }

    if (flag == 0) {
      alert("You Try to Choose Unavailable Day please Choose anther day !");
      return;
    }
    setDate(newDate.toDateString());
    var timeList1 = getTimeList(item.start, item.end);
    getAppointment_by_doc_id(item.id, newDate.toDateString()).then((res) => {
      res.status != "failed"
        ? res.map((e) => {
            timeList1 = timeList1.filter((ele) => ele !== e.time.toString());
          })
        : setTimeList(timeList1);
      if (timeList1.length == 0) {
        alert(
          "Sorry all appointments in this day are complete please choose anther day !"
        );
        setTimeList([]);
        return;
      } else {
        setTimeList(timeList1);
      }
    });
  };

  useEffect(() => {
    // console.log(item.schedule_type);
    getDocDays();
    setType(item.schedule_type);
    var timeList1 = getTimeList(item.start, item.end);
    getAppointment_by_doc_id(item.id, date).then((res) => {
      if (res.status != "failed") {
        res.map((e) => {
          timeList1 = timeList1.filter((ele) => ele !== e.time.toString());
        });
        setLength(10 - res.length);
        // console.log(res.length)
      }
    });
    setTimeList(timeList1);
  }, []);

  const getDocDays = async () => {
    await getDocSchedule(item.id).then((res) => {
      // console.log(res);
      if (res.status != "failed") {
        res = res.filter((ele) => ele.avilable !== "no");
        // console.log(res);
        const days = res.map((item) => item.day.slice(0, 3));
        setDays(days);
        console.log(Days);
      } else setDays([]);
    });
  };

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

  const [icon1, setIcon1] = useState("star");
  const [icon2, setIcon2] = useState("star");
  const [icon3, setIcon3] = useState("star");
  const [icon4, setIcon4] = useState("star");
  const [icon5, setIcon5] = useState("star");

  const [appear, setAppear] = useState(false);
  const [appear2, setAppear2] = useState(false);
  const [arrow, setArrow] = useState("angle-down");
  const [arrow2, setArrow2] = useState("angle-down");

  const main_color = "#288771";
  const [select_Month, SetSelect_Month] = useState("June 2023");
  const [select_Month_Index, SetSelect_Month_Index] = useState(0);

  const day = (avliable, week, month, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View
          style={[
            styles.content,
            {
              // paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
              // paddingHorizontal: 15,
              width: 70,
              height: 140,
              marginHorizontal: 5,
              marginVertical: 15,
              backgroundColor: avliable ? main_color : "#aaa",
              borderColor: avliable ? main_color : "#aaa",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 20 }}>{week}</Text>
          <Text style={{ color: "white", fontSize: 25 }}>{month}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  ///////////////////////////////////////

    const addMinutesToTime = (time, minutes) => {
    let arr = [item.start];
    
    
    const [hour, minute, period] = time.split(/:| /);
    const date = new Date();
    date.setHours(parseInt(hour, 10) + (period === 'PM' ? 12 : 0));
    date.setMinutes(parseInt(minute, 10) + minutes);
  
    // Format the resulting time
    const formattedTime = `${(date.getHours() % 12) || 12}:${date.getMinutes().toString().padStart(2, '0')} ${(date.getHours() >= 12) ? 'PM' : 'AM'}`;
    
    return formattedTime;
  }
  
  const time = (avliable, time) => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <View
          style={[
            styles.content,
            { backgroundColor: avliable ? main_color : "#aaa", marginHorizontal : 10 }
          ]}
        >
          <Text style={{ textAlign: "center" }}>{time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /////////////////////////////////////
  const getMonths = () => {
    const Months = [];
    const Array = [
      "January 2023",
      "February 2023",
      "March 2023",
      "April 2023",
      "May 2023",
      "June 2023",
      "July 2023",
      "August 2023",
      "September 2023",
      "October 2023",
      "November 2023",
      "December 2023",
    ];
    const currentMonth = new Date().getMonth();
    for (let i = 0; i < 12 - currentMonth; i++) {
      Months[i] = Array[currentMonth + i];
    }
    return Months;
  };

  const getDays = () => {
    const Array = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const days = [];
    const days_of_week = [];
    const avaliable_days = [];

    const currentDate = new Date();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1 + select_Month_Index,
      0
    ).getDate();
    // console.log(Days);
    if (select_Month_Index == 0) {
      for (let i = 0; i <= lastDayOfMonth - currentDate.getDate(); i++) {
        days[i] = currentDate.getDate() + i;
        days_of_week[i] = Array[(currentDate.getDay() + i + 1) % 7];
        if (Days) avaliable_days[i] = Days.includes(days_of_week[i]);
      }
      // console.log(avaliable_days);
    } else {
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + select_Month_Index,
        1
      ).getDay();
      for (let i = 0; i < lastDayOfMonth; i++) {
        days[i] = i + 1;
        days_of_week[i] = Array[(firstDayOfMonth + i + 1) % 7];
        if (Days) avaliable_days[i] = Days.includes(days_of_week[i]);
      }
    }
    // console.log(days_of_week)
    // console.log(avaliable_days);
    return [days, days_of_week, avaliable_days];
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.label}> Doctor Profile </Text>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 60 }}>
          <View style={styles.content}>
            <View style={[{ flexDirection: "row", marginVertical: 5 }]}>
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
                }
                // defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")}
                style={{ height: 100, width: "25%", borderRadius: 50 }}
              />

              <View style={{ marginLeft: 10, width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginVertical: 5,
                      width: "90%",
                    }}
                  >
                    {item.title1} {item.name}
                  </Text>
                  <TouchableOpacity style={{ marginVertical: 5 }}>
                    <Icon3 name={"messenger"} size={25} color={main_color} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name={icon1} size={25} color="gold" />
                  <Icon name={icon2} size={25} color="gold" />
                  <Icon name={icon3} size={25} color="gold" />
                  <Icon name={icon4} size={25} color="gold" />
                  <Icon name={icon5} size={25} color="gold" />
                </View>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  Rating from {item.views} vistors
                </Text>
                {/* Recently Joined */}
                <Text style={{ fontSize: 15, marginVertical: 5 }}>
                  {item.title} - {item.specialization2} {item.specialization1}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {item.charactristic ? (
                <View style={styles.charactristic}>
                  <Icon2 name={"emoji-happy"} size={20} color={main_color} />
                  <Text
                    style={{
                      fontSize: 14,
                      marginVertical: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    {item.charactristic}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {item.charactristic_2 ? (
                <View style={styles.charactristic}>
                  <Icon name={"hearing"} size={20} color={main_color} />
                  <Text
                    style={{
                      fontSize: 14,
                      marginVertical: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    {item.charactristic_2}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>

          <View style={styles.content}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <Icon3
                style={{ marginVertical: 10, marginRight: 10 }}
                name={"wallet"}
                size={30}
                color={main_color}
              />
              <View style={{ width: "40%" }}>
                <Text style={{ color: "black" }}>
                  {" "}
                  {item.price} {"EGP"}
                </Text>
                <Text style={{ color: "grey" }}> Consultation Fees</Text>
              </View>

              <Icon3
                name={"clock"}
                size={30}
                color={main_color}
                style={{ marginVertical: 10, marginHorizontal: 10 }}
              />
              <View style={{ width: "45%" }}>
                <Text style={{ color: "black" }}>
                  {" "}
                  {"30"} {"Minutes"}
                </Text>
                <Text style={{ color: "grey" }}> Wating Time</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name={"location-pin"}
                size={25}
                color={main_color}
                style={{ marginVertical: 10 }}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  width: "83%",
                  marginHorizontal: 5,
                }}
              >
                {" Clinic Address"}
              </Text>
              <Icon3
                onPress={() => {
                  arrow2 == "angle-down"
                    ? setArrow2("angle-up")
                    : setArrow2("angle-down");
                  setAppear2(!appear2);
                }}
                name={arrow2}
                size={15}
                color={main_color}
                style={{ width: "5%", marginLeft: 5 }}
              />
            </View>
            {appear2 && (
              <View>
                <Text
                  style={{
                    color: "grey",
                    marginHorizontal: 7,
                    marginTop: 20,
                    marginBottom: 5,
                  }}
                >
                  {" "}
                  Book and you will get the location
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 16,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Icon3
                name={"info"}
                size={25}
                color={main_color}
                style={{ width: "5%", marginLeft: 5 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  // fontWeight: "bold",
                  marginHorizontal: 5,
                  width: "82%",
                }}
              >
                {" "}
                About Doctor
              </Text>
              <Icon3
                onPress={() => {
                  arrow == "angle-down"
                    ? setArrow("angle-up")
                    : setArrow("angle-down");
                  setAppear(!appear);
                }}
                name={arrow}
                size={15}
                color={main_color}
                style={{ width: "5%", marginLeft: 5 }}
              />
            </View>
            {appear && (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 5,
                  marginHorizontal: 10,
                  // color : "grey",
                }}
              >
                {item.describtion}
              </Text>
            )}
          </View>
          <View style={[styles.content]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon4
                name={"calendar"}
                size={25}
                color={main_color}
                style={{ marginLeft: 5 }}
                // onPress={schedule}
              />
              <Text
                style={{ marginHorizontal: 10, width: "38%", fontSize: 16 }}
              >
                Schedule
              </Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={select_Month}
                  onValueChange={(value, index) => {
                    SetSelect_Month(value);
                    SetSelect_Month_Index(index);
                  }}
                  // mode="dropdown"
                  style={{
                    marginVertical: -10,
                    marginHorizontal: -10,
                    alignItems: "center",
                  }}
                  dropdownStyle={{
                    backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 5,
                    marginTop: -1,
                  }}
                >
                  {getMonths().map((e, i) => (
                    <Picker.Item
                      label={e}
                      value={e}
                      key={i}
                      style={{ width: 20 }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <ScrollView horizontal={true}>
              {getDays()[0].map((dayOfMonth, idx) => {
                const dayOfWeek = getDays()[1][idx];
                const Avaliable = getDays()[2][idx];
                return day(Avaliable, dayOfWeek, dayOfMonth, idx);
              })}

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={[styles.content]}>
                      <View style={{ width: "90%", marginVertical: 10 }}>
                        <Image
                          source={require("../assets/doctor.png")}
                          style={{ height: 100, width: 150 }}
                        />
                      </View>
                      <View style={{ flexDirection: "row", }}>
                        {time(true, "7:30 PM")}
                        {time(true, "8:00 PM")}
                        {time(true, "8:30 PM")}
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#288759" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  content: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  charactristic: {
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: "50%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#efefef",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor : "#000000aa"
    // width : "90%",
    // marginTop: 22,
  },
  // modalView: {
  //   // margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
});

export default AppointmentConfirmation;
