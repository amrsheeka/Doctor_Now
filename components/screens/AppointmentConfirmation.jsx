import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome";
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
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { getAppointment_by_doc_id, insertReviews } from "../../database/Users";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import { getDocSchedule } from "../../database/Doctors";

const AppointmentConfirmation = ({ navigation, route }) => {
  let item = route.params.doctor;
  const { timeList, setTimeList } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toDateString());
  const { Days, setDays } = useContext(AppContext);
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  const [numberOfPatients, setNumberOfPatients] = useState([]);
  const [choice, setChoice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleComment, setModalVisibleComment] = useState(false);
  const [length, setLength] = useState();

  const getDocDays = async () => {
    let days, start, end, number;
    await getDocSchedule(item.id).then((res) => {
      if (res.status != "failed") {
        res = res.filter((ele) => ele.avilable !== "no");

        days = res.map((item) => item.day.slice(0, 3));
        start = res.map((item) => item.start);
        end = res.map((item) => item.end);
        number = res.map((item) => item.number);
      }
    });
    setDays(days);
    setStartTime(start);
    setEndTime(end);
    setNumberOfPatients(number);
  };

  useEffect(() => {
    getDocDays();
  }, []);

  const getDocTimes = async () => {
    try {
      setModalVisible(true);
      await getAppointment_by_doc_id(item.id, date).then((res) => {
        if (res.status != "failed") {
          if (item.schedule_type == "on appointment") {
            const times = res.map((item) => item.time);
            setTimeList(times);
          } else {
            const lengthValue =
              parseInt(numberOfPatients[Days.indexOf(date.slice(0, 3))]) -
              parseInt(res.length);
            setLength(lengthValue);
            console.log(lengthValue);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
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
  const [rateNumber, setRateNumber] = useState(0);
  const [commentText, setCommentText] = useState("");

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
        disabled={!avliable}
        key={key}
        onPress={() => {
          setDate(new Date(2023, select_Month_Index + 5, month).toDateString());
          setChoice(week + "");
          getDocTimes();
          if (item.schedule_type != "on appointment") {
            if (length != 0) {
              const time = startTime[Days.indexOf(week)];
              navigation.navigate("Details_user_to_appointment", {
                item,
                time,
                date,
              });
            } else {
              alert("This is day is full ... choose another day");
            }
          }
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
          <Text style={{ color: "white", fontSize: 25 }}>{month} </Text>
        </View>
      </TouchableOpacity>
    );
  };
  ///////////////////////////////////////

  const addMinutesToTime = (time, minutes) => {
    const [hour, minute, period] = time.split(/:| /);
    const date = new Date();
    date.setHours(parseInt(hour, 10) + (period === "PM" ? 12 : 0));
    date.setMinutes(parseInt(minute, 10) + minutes);

    // Format the resulting time
    const formattedTime = `${date.getHours() % 12 || 12}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;
    return formattedTime;
  };

  const times = (day) => {
    const index = Days.indexOf(day);
    let start = startTime[index] + "";
    let end = endTime[index] + "";
    let numberPatients = parseInt(numberOfPatients[index], 10);

    let arr = [];

    const [startHour, startMinute, period] = start.split(/:| /);
    const parsedStartHour = parseInt(startHour, 10);
    const parsedStartMinute = parseInt(startMinute, 10);
    const startMinutes = parsedStartHour * 60 + parsedStartMinute;

    const [endHour, endMinute, period2] = end.split(/:| /);
    const parsedEndHour = parseInt(endHour, 10);
    const parsedEndMinute = parseInt(endMinute, 10);
    const endMinutes = parsedEndHour * 60 + parsedEndMinute;

    const minutesDiff = Math.abs(endMinutes - startMinutes);
    const watingTime = minutesDiff / numberPatients;

    let time = start;
    for (let i = 0; i < numberPatients; i++) {
      arr[i] = time;
      time = addMinutesToTime(time, watingTime);
    }
    return arr;
  };

  const time = (avliable, time, key) => {
    return (
      <TouchableOpacity
        key={key}
        disabled={!avliable}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate("Details_user_to_appointment", {
            item,
            time,
            date,
          });
        }}
      >
        <View
          style={[
            styles.content,
            {
              marginHorizontal: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexWrap: "wrap",
              alignItems: "center",
              backgroundColor: avliable ? main_color : "#aaa",
              borderColor: avliable ? main_color : "#aaa",
            },
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

    if (select_Month_Index == 0) {
      for (let i = 0; i <= lastDayOfMonth - currentDate.getDate(); i++) {
        days[i] = currentDate.getDate() + i;
        days_of_week[i] = Array[(currentDate.getDay() + i + 1) % 7];
        if (Days) avaliable_days[i] = Days.includes(days_of_week[i]);
      }
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

    return [days, days_of_week, avaliable_days];
  };

  const comment = (user_name, rate, text, date) => {
    return (
      <View>
        <View style={styles.line}></View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Icon name={icon1} size={25} color="gold" />
          <Icon name={icon2} size={25} color="gold" />
          <Icon name={icon3} size={25} color="gold" />
          <Icon name={icon4} size={25} color="gold" />
          <Icon name={icon5} size={25} color="gold" style={{ width: "40%" }} />
          <Text> Sun Jun 18 2023 </Text>
        </View>

        <Text
          style={{
            marginVertical: 5,
            alignSelf: "center",
            // justifyContent: "center",
          }}
        >
          دكتور محترم جدا وعياده شيك جدا وانصح الناس تروحله وكمان سعره حلو جدا
        </Text>

        <Text> Mohamed Essam </Text>
      </View>
    );
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
                  <TouchableOpacity
                    style={{ marginVertical: 5 }}
                    onPress={chatwith}
                  >
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
            {
              item.payment_map != 0 ? (
                <View>
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
                    {item.schedule_type == "on appointment" ? (
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
                            <View style={[styles.content, { width: "100%" }]}>
                              <View
                                style={{ marginVertical: 10, alignSelf: "center" }}
                              >
                                <Image
                                  source={require("../assets/doctor.png")}
                                  style={{ height: 150, width: 200 }}
                                />
                              </View>
                              <View style={{ width: "100%" }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {times(choice).map((e, idx) => {
                                    const avli = timeList.includes(e);
                                    return time(!avli, e, idx);
                                  })}
                                </View>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    ) : (
                      <></>
                    )}
                  </ScrollView>
                </View>
              ) :<></>
            }
          </View>
          <View style={styles.content}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
                marginHorizontal: 5,
              }}
            >
              <Icon4 name={"commenting"} size={30} color={main_color} />
              <Text style={{ fontSize: 16, width: "60%", marginHorizontal: 5 }}>
                {" "}
                Patients's Reviews{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleComment(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: main_color,
                  }}
                >
                  {" "}
                  Add comment{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleComment}
              onRequestClose={() => {
                setModalVisibleComment(false);
              }}
            >
              <View style={styles.centeredView}>
                <View
                  style={[
                    styles.content,
                    {
                      width: "100%",
                      // height: "100%",
                      paddingVertical: 20,
                    },
                  ]}
                >
                  <ScrollView>
                    <View style={{ marginVertical: 10, alignSelf: "center" }}>
                      <Image
                        source={require("../assets/splash.png")}
                        style={{ height: 170, width: 170 }}
                      />
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Please rate Your Experience
                      </Text>
                      <Text style={{ alignSelf: "center", fontSize: 14 }}>
                        {" "}
                        Your feedback is valueable to us{" "}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          marginVertical: 10,
                        }}
                      >
                        <Icon
                          name={rateNumber > 0 ? "star" : "star-border"}
                          size={50}
                          color="gold"
                          onPress={() => setRateNumber(1)}
                        />
                        <Icon
                          name={rateNumber > 1 ? "star" : "star-border"}
                          size={50}
                          color="gold"
                          onPress={() => setRateNumber(2)}
                        />
                        <Icon
                          name={rateNumber > 2 ? "star" : "star-border"}
                          size={50}
                          color="gold"
                          onPress={() => setRateNumber(3)}
                        />
                        <Icon
                          name={rateNumber > 3 ? "star" : "star-border"}
                          size={50}
                          color="gold"
                          onPress={() => setRateNumber(4)}
                        />
                        <Icon
                          name={rateNumber > 4 ? "star" : "star-border"}
                          size={50}
                          color="gold"
                          onPress={() => setRateNumber(5)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          marginVertical: 10,
                          // alignSelf: "center",
                        }}
                      >
                        <Text style={{ fontSize: 16, alignSelf: "center" }}>
                          {" "}
                          Tell us what could be improved or{" "}
                        </Text>
                        <Text style={{ fontSize: 16, alignSelf: "center" }}>
                          {" "}
                          what you liked about us{" "}
                        </Text>
                        <TextInput
                          label={"Leave Comment"}
                          mode="outlined"
                          // placeholder="Leave Comment"
                          style={{
                            marginHorizontal: 10,
                            marginVertical: 5,
                            width: "90%",
                            minHeight: 100,
                          }}
                          value={commentText}
                          onChangeText={setCommentText}
                          multiline
                          placeholderTextColor="gray"
                          outlineStyle={{
                            borderColor: main_color,
                            borderRadius: 10,
                          }}
                          activeOutlineColor={main_color}
                        />
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: main_color,
                          width: "80%",
                          alignSelf: "center",
                          padding: 7,
                          borderRadius: 10,
                          marginVertical: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "white",
                            alignSelf: "center",
                          }}
                        >
                          {" "}
                          Sumbit{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/* <View style={styles.line}></View> */}
            {comment("", "", "", "")}
            {comment("", "", "", "")}
            {comment("", "", "", "")}
            {comment("", "", "", "")}
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
    backgroundColor: "#000000aa",
    // width : "90%",
    // marginTop: 22,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    width: "95%",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default AppointmentConfirmation;
