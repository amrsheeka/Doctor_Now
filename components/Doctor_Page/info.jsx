import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Switch,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_doc_by_email,
  logout,
} from "../../database/Users";
import Appointments from "./Appointments";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import CurrentUser from "../consts/CurrentUser";
import { editDoctor, getDocSchedule } from "../../database/Doctors";

const Info = ({ navigation }) => {
  const [doctor_booking, setDoctor_booking] = useState(new Array(10).fill(2));
  const [date, setDate] = useState(new Date());
  const [birth, setBirth] = useState("select your birth day");
  const [show, setShow] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [startTime1, setStartTime1] = useState(new Date());
  const [startTime2, setStartTime2] = useState(new Date());
  const [startTime3, setStartTime3] = useState(new Date());
  const [startTime4, setStartTime4] = useState(new Date());
  const [startTime5, setStartTime5] = useState(new Date());
  const [startTime6, setStartTime6] = useState(new Date());

  const [endTime, setEndTime] = useState(new Date());
  const [endTime1, setEndTime1] = useState(new Date());
  const [endTime2, setEndTime2] = useState(new Date());
  const [endTime3, setEndTime3] = useState(new Date());
  const [endTime4, setEndTime4] = useState(new Date());
  const [endTime5, setEndTime5] = useState(new Date());
  const [endTime6, setEndTime6] = useState(new Date());

  const [which, setWhich] = useState("sat_start");
  const [show_time, setShow_time] = useState(0);
  const [color_plane, setColor_plane] = useState(new Array(10).fill("#ccc"));

  const [start, setStart] = useState("start work from...");
  const [start1, setStart1] = useState("start work from...");
  const [start2, setStart2] = useState("start work from...");
  const [start3, setStart3] = useState("start work from...");
  const [start4, setStart4] = useState("start work from...");
  const [start5, setStart5] = useState("start work from...");
  const [start6, setStart6] = useState("start work from...");

  const [end, setEnd] = useState("to...");
  const [end1, setEnd1] = useState("to...");
  const [end2, setEnd2] = useState("to...");
  const [end3, setEnd3] = useState("to...");
  const [end4, setEnd4] = useState("to...");
  const [end5, setEnd5] = useState("to...");
  const [end6, setEnd6] = useState("to...");

  const [number_of_bookings, setNumber_of_bookings] = useState(6);
  const [number_of_bookings1, setNumber_of_bookings1] = useState(6);
  const [number_of_bookings2, setNumber_of_bookings2] = useState(6);
  const [number_of_bookings3, setNumber_of_bookings3] = useState(6);
  const [number_of_bookings4, setNumber_of_bookings4] = useState(6);
  const [number_of_bookings5, setNumber_of_bookings5] = useState(6);
  const [number_of_bookings6, setNumber_of_bookings6] = useState(6);

  const [exmination_duration, setExmination_duration] = useState(30);
  const [exmination_duration1, setExmination_duration1] = useState(30);
  const [exmination_duration2, setExmination_duration2] = useState(30);
  const [exmination_duration3, setExmination_duration3] = useState(30);
  const [exmination_duration4, setExmination_duration4] = useState(30);
  const [exmination_duration5, setExmination_duration5] = useState(30);
  const [exmination_duration6, setExmination_duration6] = useState(30);

  const [selected, setSelected] = useState("First In First Out");
  const [selected2, setSelected2] = useState("Accept all bookings");
  const [profile_views, setProfileviews] = useState(10);
  const [bookings, setBookings] = useState(9);
  const [reviews, setReviews] = useState(25);
  const [male, setMale] = useState("unchecked");
  const [female, setFemale] = useState("unchecked");
  const [practise_licence, setPractise_licence] = useState("");
  const [professional_licence, setProfessional_licence] = useState("");
  const [page, setPage] = useState("Profile");
  const [color_more, setColor_more] = useState("#666");
  const [color_profile, setColor_profile] = useState("white");
  const [color_schedule, setColor_schedule] = useState("#666");
  const [fName, setfName] = useState("");
  const [fullpro_title, setFullpro_title] = useState(" Consultant of dinstiy ");

  const [doctor_email, setDoctor_email] = useState("");
  const [doctor_phone, setDoctor_phone] = useState("");
  const [open_password, setOpen_password] = useState(false);

  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");

  const [about_the_doctor, setAbout_theDoctor] = useState("hi");
  const [height, setHeight] = useState(0);

  const [nameClinic, setNameClinic] = useState("Essam Clinic");
  const [numberClinic, setNumberClinic] = useState("01012453522");
  const [nameAssistant, setNameAssistant] = useState("doctor sheeka");
  const [numberAssistant, setNumberAssistant] = useState("01016232521");
  const [exmain, setExmain] = useState(100);
  const [follow_up, setFollow_up] = useState(55);
  const [duration, setDuration] = useState(7);
  const [flag, setFlag] = useState(true);
  const [schedule_summary, setSchedule_summary] = useState(true);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [color1, setColor1] = useState("#288759");
  const [color2, setColor2] = useState("black");
  const [color1_sechedule, setColor1_sechedule] = useState("#288759");
  const [color2_sechedule, setColor2_sechedule] = useState("black");
  const [icon1, setIcon1] = useState("star");
  const [icon2, setIcon2] = useState("star");
  const [icon3, setIcon3] = useState("star");
  const [icon4, setIcon4] = useState("star");
  const [icon5, setIcon5] = useState("star");

  const icon6 = "edit";
  const icon7 = "info";
  const icon8 = "graduation-cap";
  const icon9 = "world";
  const icon10 = "photograph";
  const icon11 = "file-invoice-dollar";
  const icon12 = "location-pin";
  const icon13 = "drivers-license";
  const icon14 = "arrow-left";
  const icon15 = "content-save-check";
  const icon16 = "user-lock";
  const icon17 = "email";
  const icon18 = "phone";
  const icon19 = "user-nurse";
  const icon20 = "user-md";
  const icon21 = "calendar";
  const icon22 = "bars";
  const icon23 = "calendar-clock";
  const icon24 = "chevron-down";
  const icon25 = "calendar-month";
  const icon26 = "plane";
  const main_color = "#288771";
  const empty = false;
  const { schedules,setSchedules } = useContext(AppContext);
  const { setAppointments } = useContext(AppContext);
  const { setType } = useContext(AppContext);
  const { curruser } = useContext(AppContext);
  const {doctor, setDoctor} = useContext(AppContext);
  async function getDoc() {
    let email = CurrentUser.user.email;
    return await get_doc_by_email(email);
  }
  async function getSchedule(id) {
    return await getDocSchedule(id);
  }
  useEffect(() => {
    getDoc().then(
      (res)=>{
        setDoctor(res[0]);
        getSchedule(res[0].id).then(
          (res1)=>{
            setSchedules( res1);
            setIsEnabled1(res1[0].avilable=="yes"?true:false);
            setIsEnabled2(res1[1].avilable=="yes"?true:false);
            setIsEnabled3(res1[2].avilable=="yes"?true:false);
            setIsEnabled4(res1[3].avilable=="yes"?true:false);
            setIsEnabled5(res1[4].avilable=="yes"?true:false);
            setIsEnabled6(res1[5].avilable=="yes"?true:false);
            setIsEnabled7(res1[6].avilable=="yes"?true:false);
            setStart(res1[0].start);
            setStart1(res1[1].start);
            setStart2(res1[2].start);
            setStart3(res1[3].start);
            setStart4(res1[4].start);
            setStart5(res1[5].start);
            setStart6(res1[6].start);
            setEnd(res1[0].end);
            setEnd1(res1[1].end);
            setEnd2(res1[2].end);
            setEnd3(res1[3].end);
            setEnd4(res1[4].end);
            setEnd5(res1[5].end);
            setEnd6(res1[6].end);
          }
        )
      }
    )
  }, []);
  const back = () => {
    page === "Schedule" ? summary() : setPage("Profile");
    setOpen_password(false);
  };
  const save = () => {
    setPage("Profile");
    setOpen_password(false);
  };
  let email = CurrentUser.user.email;
  const HandleHistory = () => {
    get_doc_by_email(email).then((ans) => {
      if (ans.status !== "failed") {
        get_History_Apps_for_Doctor(ans[0].id).then((res) => {
          console.log(res);
          if (res.status !== "failed") setAppointments(res);
          else setAppointments([]);
        });
      }
    });
    setType("history");
  };

  const HandleAppointments = () => {
    get_doc_by_email(email).then((ans) => {
      if (ans.status !== "failed") {
        getAppointment_for_Doctor(ans[0].id).then((res) => {
          if (res.status !== "failed") setAppointments(res);
          else setAppointments([]);
        });
      }
    });
    setType("appointments");
  };

  const ChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setBirth(fDate);
  };
  /////////////////////////////////////

  const clickMale = () => {
    setMale("checked");
    setFemale("unchecked");
  };

  const clickFemale = () => {
    setMale("unchecked");
    setFemale("checked");
  };

  const Doctor_info = () => {
    setFlag(true);
    setColor1("#288759");
    setColor2("black");
  };

  const Clinic_info = () => {
    setFlag(false);
    setColor1("black");
    setColor2("#288759");
  };

  const summary = () => {
    setSchedule_summary(true);
    setColor1_sechedule("#288759");
    setColor2_sechedule("black");
  };

  const management = () => {
    setSchedule_summary(false);
    setColor1_sechedule("black");
    setColor2_sechedule("#288759");
  };

  const edit_name = () => {
    setPage("Professional Information");
  };

  const account_settings = () => {
    setPage("Account Settings");
  };

  const change_password = () => {
    setOpen_password(true);
  };

  const about_doctor = () => {
    setPage("About the Doctor");
  };

  const clinic_name = () => {
    setPage("Clinic Name and Number");
  };

  const exmination = () => {
    setPage("Exmination and Follow-up");
  };

  const assistant = () => {
    setPage("Assistant Name and Number");
  };

  const profile = () => {
    setColor_profile("white");
    setColor_schedule("#666");
    setColor_more("#666");
    setPage("Profile");
  };
  const schedule = () => {
    setColor_profile("#666");
    setColor_schedule("white");
    setColor_more("#666");
    setPage("Schedule");
  };
  const more = () => {
    setColor_profile("#666");
    setColor_schedule("#666");
    setColor_more("white");
    setPage("More");
  };

  // const handleSubmit = (exmin) => {
  //   let newText = "30 Mins";
  //   if (
  //     !(
  //       exmin.toString().includes("M") ||
  //       exmin.toString().includes("i") ||
  //       exmin.toString().includes("n") ||
  //       exmin.toString().includes("s") ||
  //       exmin < 5
  //     )
  //   ){
  //   newText = exmination_duration + " Mins";
  //   // console.log(newText);
  // }
  // else console.log("dfsdf");

  //   console.log(newText);

  //   if (exmin === exmination_duration) return setExmination_duration(newText);
  //   // else if (exmin === exmination_duration1) setExmination_duration1(newText);
  //   // else if (exmin === exmination_duration2) setExmination_duration2(newText);
  //   // else if (exmin === exmination_duration3) setExmination_duration3(newText);
  //   // else if (exmin === exmination_duration4) setExmination_duration4(newText);
  //   // else if (exmin === exmination_duration5) setExmination_duration5(newText);
  //   // else if (exmin === exmination_duration6) setExmination_duration6(newText);
  // };

  const exmin_duration = (exmin) => {
    if (exmin === exmination_duration) return setExmination_duration;
    else if (exmin === exmination_duration1) return setExmination_duration1;
    else if (exmin === exmination_duration2) return setExmination_duration2;
    else if (exmin === exmination_duration3) return setExmination_duration3;
    else if (exmin === exmination_duration4) return setExmination_duration4;
    else if (exmin === exmination_duration5) return setExmination_duration5;
    else if (exmin === exmination_duration6) return setExmination_duration6;
  };
  const bookings_number = (book) => {
    if (book === number_of_bookings) return setNumber_of_bookings;
    else if (book === number_of_bookings1) return setNumber_of_bookings1;
    else if (book === number_of_bookings2) return setNumber_of_bookings2;
    else if (book === number_of_bookings3) return setNumber_of_bookings3;
    else if (book === number_of_bookings4) return setNumber_of_bookings4;
    else if (book === number_of_bookings5) return setNumber_of_bookings5;
    else if (book === number_of_bookings6) return setNumber_of_bookings6;
  };
  const ChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;

    let tempTime = new Date(currentTime);

    let hour = tempTime.getHours();
    let minutes = tempTime.getMinutes();
    let TimeType;

    hour < 12 ? (TimeType = "AM") : (TimeType = "PM");

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) hour = 12;
    if (hour < 10) {
      hour = "0" + hour.toString();
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    let fTime =
      hour.toString() + ":" + minutes.toString() + " " + TimeType.toString();
    setShow_time(0);
    if (which === "sat_start") {
      setStartTime(currentTime);
      setStart(fTime);
    } else if (which === "sat_end") {
      setEndTime(currentTime);
      setEnd(fTime);
    } else if (which === "sun_start") {
      setStartTime1(currentTime);
      setStart1(fTime);
    } else if (which === "sun_end") {
      setEndTime1(currentTime);
      setEnd1(fTime);
    } else if (which === "mon_start") {
      setStartTime2(currentTime);
      setStart2(fTime);
    } else if (which === "mon_end") {
      setEndTime2(currentTime);
      setEnd2(fTime);
    } else if (which === "tues_start") {
      setStartTime3(currentTime);
      setStart3(fTime);
    } else if (which === "tues_end") {
      setEndTime3(currentTime);
      setEnd3(fTime);
    } else if (which === "wen_start") {
      setStartTime4(currentTime);
      setStart4(fTime);
    } else if (which === "wen_end") {
      setEndTime4(currentTime);
      setEnd4(fTime);
    } else if (which === "thurs_start") {
      setStartTime5(currentTime);
      setStart5(fTime);
    } else if (which === "thurs_end") {
      setEndTime5(currentTime);
      setEnd5(fTime);
    } else if (which === "fri_start") {
      setStartTime6(currentTime);
      setStart6(fTime);
    } else if (which === "fri_end") {
      setEndTime6(currentTime);
      setEnd6(fTime);
    }
  };
  const shift = (
    day,
    day_start,
    day_end,
    s,
    e,
    start_time,
    end_time,
    exmin,
    booking
  ) => {
    return (
      <View
        style={[
          styles.content,
          {
            // flexDirection: "row",
            // width: "90%",
            marginHorizontal: 10,
            marginBottom: 15,
            paddingVertical: 15,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 14,
            color: main_color,
            paddingLeft: 12,
            width: "85%",
          }}
        >
          {" "}
          {day} shift{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {show_time === 1 && (
            <DateTimePicker
              value={start_time}
              onChange={ChangeTime}
              mode={"time"}
              is24Hour={false}
            />
          )}
          <Text
            style={[styles.inp, { width: "45%" }]}
            onPress={() => {
              setShow_time(1);
              setWhich(day_start);
            }}
          >
            {s}{" "}
          </Text>
          {show_time === 10 && (
            <DateTimePicker
              value={end_time}
              onChange={ChangeTime}
              mode={"time"}
              is24Hour={false}
            />
          )}
          <Text
            style={[styles.inp, { width: "45%" }]}
            onPress={() => {
              setShow_time(10);
              setWhich(day_end);
            }}
          >
            {e}{" "}
          </Text>
        </View>
        {selected == "First In First Out" ? (
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "black",
                paddingLeft: 12,
                paddingTop: 12,
                width: "85%",
              }}
            >
              {" "}
              Number of bookings{" "}
            </Text>
            <TextInput
              style={[styles.inp, { width: "95%" }]}
              defaultValue={booking + ""}
              keyboardType="phone-pad"
              //placeholder={"last name"}
              onChangeText={bookings_number(booking)}
              // onSubmitEditing={bookings_number(booking)}
              value={booking + ""}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "black",
                paddingLeft: 12,
                width: "85%",
              }}
            >
              {" "}
              Exmination Duration (Minutes){" "}
            </Text>
            <TextInput
              style={styles.inp}
              keyboardType="phone-pad"
              defaultValue={exmin + ""}
              placeholder={"30 Mins"}
              onChangeText={exmin_duration(exmin)}
              // onSubmitEditing={handleSubmit(exmination_duration)}
              value={exmin + ""}
            />
          </View>
        )}
      </View>
    );
  };
  const update_booking = (i, newValue) => {
    let array = { ...doctor_booking };
    array[i] = newValue;
    setDoctor_booking(array);
  };

  const app_days = (i) => {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const DAYS = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const tomorrow = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    const day = DAYS[tomorrow.getDay()];
    const date = tomorrow.getDate();
    const month = MONTHS[tomorrow.getMonth()];

    const x = date + "  " + month;

    return [day, x];
  };
  const plane = (i) => {
    let arr = { ...color_plane };
    arr[i] == "#ccc" ? (arr[i] = "#288771") : (arr[i] = "#ccc");
    setColor_plane(arr);
  };
  const appoint = (i) => {
    return (
      <View
        style={[
          styles.content,
          {
            flexDirection: "row",
            padding: 15,
            marginHorizontal: 7,
            marginBottom: 7,
          },
        ]}
      >
        <View style={{ width: "30%", merginRight: 30 }}>
          <Text style={{ color: main_color }}>
            {i === 0 ? "Today" : i === 1 ? "Tomorrow" : app_days(i)[0]}
          </Text>
          <Text>{app_days(i)[1]}</Text>
        </View>
        <View style={{ width: "55%", alignSelf: "center" }}>
          <Text>
            {doctor_booking[i] === 0
              ? "No Bookings"
              : doctor_booking[i] + " Bookings"}
          </Text>
        </View>
        <Icon5
          onPress={() => plane(i)}
          name={icon26}
          size={30}
          color={color_plane[i]}
          style={{ alignSelf: "center", width: "10%", marginLeft: 15 }}
        />
      </View>
    );
  };

  const appoints = () => {
    return (
      <View>
        <View>{appoint(0)}</View>
        <View>{appoint(1)}</View>
        <View>{appoint(2)}</View>
        <View>{appoint(3)}</View>
        <View>{appoint(4)}</View>
        <View>{appoint(5)}</View>
        <View>{appoint(6)}</View>
        <View>{appoint(7)}</View>
        <View>{appoint(8)}</View>
        <View>{appoint(9)}</View>
      </View>
    );
  };

  // **************************************************************************************************************************

  const Header = () => {
    return (
      <View style={[styles.header, { flexDirection: "row" }]}>
        <Icon2
          name={icon14}
          size={30}
          color="white"
          onPress={back}
          style={{ width: "7%", marginHorizontal: 10 }}
        />
        <Text style={[styles.label, { width: "78%" }]}> {page} </Text>

        <Icon6
          name={icon15}
          size={30}
          color="white"
          onPress={save}
          style={{ width: "20%" }}
        />
      </View>
    );
  };

  // **************************************************************************************************************************

  const ProCard = () => {
    return (
      <View style={styles.content}>
        <View style={{ marginVertical: 5, flexDirection: "row" }}>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              width: "90%",
            }}
          >
            {" Doctor "}
            {doctor.name}
          </Text>
          <Icon
            onPress={edit_name}
            name={icon6}
            size={30}
            color="#288759"
            style={{ alignSelf: "flex-end" }}
          />
        </View>
        <Text style={{ color: "black", fontSize: 15 }}>{fullpro_title}</Text>
        <View style={{ marginVertical: 5, flexDirection: "row" }}>
          <Image
            source={doctor.image?{uri:doctor.image}:require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
            style={[styles.image]}
          />

          <View style={{ width: "55%", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Icon name={icon1} size={35} color="gold" />
              <Icon name={icon2} size={35} color="gold" />
              <Icon name={icon3} size={35} color="gold" />
              <Icon name={icon4} size={35} color="gold" />
              <Icon name={icon5} size={35} color="gold" />
            </View>

            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                {" "}
                {reviews} {" Reviews "}
              </Text>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={account_settings}
              >
                <Text
                  style={{
                    backgroundColor: "#288759",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: "white",
                    margin: 20,
                  }}
                >
                  {" "}
                  My Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // **************************************************************************************************************************

  const ProViewsAndBookings = () => {
    return (
      <View style={{ marginVertical: 5, flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <View style={styles.content}>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {profile_views}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              {" "}
              {" Profile Views "}{" "}
            </Text>
          </View>
        </View>

        {/* ////////////////////////////////////////////////// */}

        <View style={{ width: "50%" }}>
          <View style={styles.content}>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {bookings}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              {" "}
              {" Bookings "}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // **************************************************************************************************************************

  const DoctorClinicTab = () => {
    return (
      <View
        style={[
          styles.content,
          {
            flexDirection: "row",
            width: "100%",
            margin: 3,
            paddingVertical: 15,
          },
        ]}
      >
        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={Doctor_info}
        >
          <Text
            style={{
              color: color1,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Doctor info "}{" "}
          </Text>
        </TouchableOpacity>

        {/* /////////////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={Clinic_info}
        >
          <Text
            style={{
              color: color2,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Clinic info "}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const DocInfo = () => {
    return (
      <View>
        <TouchableOpacity onPress={about_doctor}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginTop: 5,
              },
            ]}
          >
            <Icon2
              name={icon7}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              About the Doctor{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>

          {about_the_doctor !== "" ? (
            <View style={[styles.content, { paddingVertical: 15 }]}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                    width: "80%",
                  }}
                >
                  {about_the_doctor}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* ///////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon2
              name={icon8}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Education{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
        </TouchableOpacity>

        {/* /////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              name={icon9}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Spoken Languages{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const ClinicInfo = () => {
    return (
      <View>
        <TouchableOpacity onPress={clinic_name}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginTop: 5,
              },
            ]}
          >
            <Icon2
              name={icon7}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Name and Number{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>

          {nameClinic !== "" || numberClinic !== "" ? (
            <View style={[styles.content, { paddingVertical: 15 }]}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
              >
                {nameClinic}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingHorizontal: 20,
                }}
              >
                {numberClinic}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* //////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              name={icon10}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Photos{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
        </TouchableOpacity>

        {/* /////////////////////////////////////////////////////////////// */}

        <TouchableOpacity onPress={exmination}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
              },
            ]}
          >
            <Icon4
              name={icon11}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Exmination and Follow-up{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
          {exmain !== "" || follow_up !== "" ? (
            <View style={[styles.content, { paddingVertical: 15 }]}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                    width: "80%",
                  }}
                >
                  {" "}
                  Exmaination Fees{" "}
                </Text>
                <Text>{exmain} EGP</Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    width: "80%",
                  }}
                >
                  {" "}
                  Follow-up Fees{" "}
                </Text>
                <Text> {follow_up} EGP </Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 20,
                    width: "80%",
                  }}
                >
                  {" "}
                  Follow-up Duration{" "}
                </Text>
                <Text> {duration} Days </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* ////////////////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon2
              name={icon12}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Address{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
        </TouchableOpacity>

        {/* ///////////////////////////////////////////////////////////// */}

        <TouchableOpacity onPress={assistant}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginTop: 5,
              },
            ]}
          >
            <Icon2
              name={icon7}
              size={25}
              color="#288759"
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Assistant Name and Number{" "}
            </Text>
            <Icon name={icon6} size={25} color="#288759" />
          </View>
          {nameAssistant !== "" || numberAssistant !== "" ? (
            <View
              style={[styles.content, { paddingVertical: 15, marginDown: 10 }]}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
              >
                {nameAssistant}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingHorizontal: 20,
                }}
              >
                {numberAssistant}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const ProsonalInformation = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon2
            name={icon7}
            size={25}
            color="#288759"
            style={{ width: "5%", marginLeft: 5 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Basic Information{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            // fontStyle: "italic",
            // fontWeight: "bold",
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Full Name{" "}
        </Text>
        <TextInput
          style={styles.inp}
          defaultValue={doctor.name}
          //placeholder={"last name"}
          onChangeText={setfName}
        />

        
        <Text
          style={{
            fontSize: 16,
            // fontStyle: "italic",
            // fontWeight: "bold",
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Birth Date{" "}
        </Text>
        <Text style={styles.inp} onPress={() => setShow(true)}>
          {" "}
          {birth}{" "}
        </Text>
        {show && <DateTimePicker value={date} onChange={ChangeDate} />}

        <Text
          style={{
            color: "black",
            fontSize: 15,
            paddingBottom: 5,
            marginTop: 20,
            paddingHorizontal: 15,
          }}
        >
          Gender
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 40,
            marginTop: 10,
          }}
        >
          <RadioButton
            status={male}
            color={main_color}
            value="male"
            uncheckedColor="black"
            onPress={clickMale}
          />
          <Text
            style={{
              color: "black",
              paddingBottom: 5,
              width: "40%",
              paddingHorizontal: 5,
            }}
          >
            Male
          </Text>
          <RadioButton
            status={female}
            color={main_color}
            value="female"
            uncheckedColor="black"
            onPress={clickFemale}
          />
          <Text
            style={{
              color: "black",
              paddingBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            Female
          </Text>
        </View>

        <TouchableOpacity>
          {practise_licence === "" ? (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 40,
                alignItems: "center",
              }}
            >
              <Icon5
                name={icon13}
                size={25}
                color={main_color}
                style={{ width: "10%", marginLeft: 15 }}
              />

              <Text style={{ fontSize: 16 }}>
                {" "}
                Upload Practice License ID photo
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 40,
                alignItems: "center",
              }}
            >
              <Image
                source={doctor.image?{uri:doctor.image}:require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
                style={[
                  styles.image,
                  { width: "20%", marginLeft: 15, height: 50 },
                ]}
              />
              <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
                {" "}
                Practice License ID photo
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon2
            name={icon8}
            size={25}
            color="#288759"
            style={{ width: "7%", marginLeft: 15 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Professional Title{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 15,
          }}
        >
          {" "}
          Full Professional Title{" "}
        </Text>
        <TextInput
          style={styles.inp}
          defaultValue={fullpro_title}
          onChangeText={setFullpro_title}
        />
        <TouchableOpacity>
          {professional_licence !== "" ? (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 40,
                alignItems: "center",
              }}
            >
              <Icon5
                name={icon13}
                size={25}
                color={main_color}
                style={{ width: "10%", marginLeft: 15 }}
              />

              <Text style={{ fontSize: 16 }}>
                {" "}
                Upload Professional Title License photo
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 40,
                alignItems: "center",
              }}
            >
              <Image
                source={doctor.image?{uri:doctor.image}:require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
                style={[
                  styles.image,
                  { width: "20%", marginLeft: 15, height: 50 },
                ]}
              />
              <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
                {" "}
                Professional Title License photo
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const AccountSettings = () => {
    return (
      <View>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon6
            name={icon17}
            size={30}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            Email address{" "}
          </Text>
        </View>
        <TextInput
          style={styles.inp}
          defaultValue={doctor.email}
          keyboardType="email-address"
          //placeholder={"last name"}
          onChangeText={setDoctor_email}
        />
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon6
            name={icon18}
            size={30}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            Mobile number{" "}
          </Text>
        </View>
        <TextInput
          style={styles.inp}
          defaultValue={CurrentUser.user.phone}
          keyboardType="phone-pad"
          //placeholder={"last name"}
          onChangeText={setDoctor_phone}
        />
        <TouchableOpacity onPress={change_password}>
          <View
            style={[
              {
                marginHorizontal: 15,
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <Icon4
              name={icon16}
              size={25}
              color={main_color}
              style={{ width: "10%" }}
            />
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Change Password{" "}
            </Text>
          </View>
        </TouchableOpacity>

        {open_password ? (
          <View>
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Current Password{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={current_password}
              secureTextEntry
              onChangeText={setCurrent_password}
            />

            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              New Password{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={new_password}
              secureTextEntry
              onChangeText={setNew_password}
            />

            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Confirm New Password{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={confirm_new_password}
              secureTextEntry
              onChangeText={setConfirm_new_password}
            />
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() =>
            logout().then(() => {
              navigation.navigate("StackNavigator");
            })
          }
        >
          <Text
            style={{
              backgroundColor: "#288759",
              paddingHorizontal: 20,
              paddingVertical: 10,
              color: "white",
              margin: 20,
            }}
          >
            {" "}
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const AboutTheDoctor = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon2
            name={icon7}
            size={25}
            color="#288759"
            style={{ width: "5%", marginLeft: 5 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            About the Doctor{" "}
          </Text>
        </View>
        <TextInput
          style={[styles.inp, { height: height }]}
          defaultValue={about_the_doctor}
          multiline
          onContentSizeChange={(event) =>
            setHeight(event.nativeEvent.contentSize.height)
          }
          onChangeText={setAbout_theDoctor}
          numberOfLines={10}
          maxLength={250}
        />
        <Text style={{ alignSelf: "flex-end", marginHorizontal: 30 }}>
          {about_the_doctor.length} / 250
        </Text>
      </View>
    );
  };

  // **************************************************************************************************************************

  const ClinicNameAndNumber = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon2
            name={icon7}
            size={25}
            color="#288759"
            style={{ width: "5%", marginLeft: 5 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Basic Clinic Information{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Clinic Name{" "}
        </Text>
        <TextInput
          style={styles.inp}
          defaultValue={nameClinic}
          onChangeText={setNameClinic}
        />

        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Clinic Phone number{" "}
        </Text>
        <TextInput
          style={styles.inp}
          keyboardType="phone-pad"
          defaultValue={CurrentUser.user.phone}
          onChangeText={setNumberClinic}
        />
      </View>
    );
  };

  // **************************************************************************************************************************

  const ExminationAndFollowUp = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 15,
          }}
        >
          <Icon4
            name={icon11}
            size={25}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Exmination{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Exmination Fees (EGP){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={exmain + ""}
          onChangeText={setExmain}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 5,
            marginHorizontal: 15,
          }}
        >
          <Icon4
            name={icon11}
            size={25}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Follow-up{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Follow-up Fees (EGP){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={follow_up + ""}
          onChangeText={setFollow_up}
        />
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Duration (Days){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={duration + ""}
          onChangeText={setDuration}
        />
      </View>
    );
  };

  // **************************************************************************************************************************

  const AssistantNameAndNumber = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginHorizontal: 10,
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Icon4
            name={icon19}
            size={25}
            color="#288759"
            style={{ width: "5%", marginLeft: 5 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Basic Assistant Information{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Assistant Name{" "}
        </Text>
        <TextInput
          style={styles.inp}
          defaultValue={nameAssistant}
          onChangeText={setNameAssistant}
        />

        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Assistant number{" "}
        </Text>
        <TextInput
          style={styles.inp}
          keyboardType="phone-pad"
          defaultValue={numberAssistant}
          onChangeText={setNumberAssistant}
        />
      </View>
    );
  };

  // **************************************************************************************************************************

  const ScheduleTab = () => {
    return (
      <View
        style={[
          {
            // borderBottomWidth :2 ,
            // borderColor : main_color,
            flexDirection: "row",
            width: "95%",
            alignItems: "center",
            // justifyContent : "space-between",
            marginHorizontal: 15,
            paddingVertical: 5,
          },
        ]}
      >
        <TouchableOpacity style={{ width: "50%" }} onPress={summary}>
          <Text
            style={{
              color: color1_sechedule,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Schedule Summary "}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "50%" }} onPress={management}>
          <Text
            style={{
              color: color2_sechedule,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Schedule Management "}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const ScheduleSummaryEmpty = () => {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text
            style={{
              color: "#555555",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Get started! "}{" "}
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text
            style={{
              color: "#555555",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Add your working hours and confirm availability to  "}{" "}
          </Text>
          <Text
            style={{
              color: "#555555",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" recieve new Doctor Now bookings "}{" "}
          </Text>
        </View>

        <Image
          source={require("../assets/splash.png")}
          style={[
            styles.image,
            { alignSelf: "center", marginVertical: 50, height: 220 },
          ]}
        />

        <TouchableOpacity style={{ alignItems: "center" }} onPress={management}>
          <Text
            style={{
              backgroundColor: main_color,
              paddingHorizontal: 20,
              paddingVertical: 10,
              color: "white",
              margin: 20,
            }}
          >
            {" "}
            Add working hours
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // **************************************************************************************************************************

  const WorkingHourSettings = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon6
            name={icon23}
            size={30}
            color={main_color}
            style={{ marginLeft: 5 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Working hours settings{" "}
          </Text>
        </View>
        <Text
          style={{
            color: "black",
            paddingLeft: 10,
            width: "85%",
            // marginHorizontal : 20,
          }}
        >
          {" "}
          Examination Type{" "}
        </Text>
        <SelectList
          data={[{ value: "First In First Out" }, { value: "On Appointments" }]}
          setSelected={setSelected}
          placeholder={selected}
          search={false}
          boxStyles={{
            borderWidth: 0,
            borderBottomWidth: 2,
            borderRadius: 0,
            marginHorizontal: 10,
            borderColor: main_color,
            paddingLeft: 5,
          }}
          arrowicon={<Icon4 name={icon24} size={12} color={main_color} />}
          dropdownStyles={{
            marginHorizontal: 10,
            borderWidth: 0,
            backgroundColor: "white",
            marginTop: 2,
          }}
        />
        <Text
          style={{
            color: "black",
            paddingLeft: 10,
            marginTop: 10,
            width: "85%",
            // marginHorizontal : 20,
          }}
        >
          {" "}
          Bookings prevention{" "}
        </Text>
        <SelectList
          data={[
            { value: "Accept all bookings" },
            { value: "By starting of working hours" },
            { value: "1 Hour before working hours" },
            { value: "Block same day bookings" },
          ]}
          setSelected={setSelected2}
          placeholder={selected2}
          search={false}
          boxStyles={{
            borderWidth: 0,
            borderBottomWidth: 2,
            borderRadius: 0,
            marginHorizontal: 10,
            borderColor: main_color,
            paddingLeft: 5,
          }}
          arrowicon={<Icon4 name={icon24} size={12} color={main_color} />}
          dropdownStyles={{
            marginHorizontal: 10,
            borderWidth: 0,
            backgroundColor: "white",
            marginTop: 2,
          }}
        />
      </View>
    );
  };

  // **************************************************************************************************************************

  const ClinicWorkingHours = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon6
            name={icon25}
            size={30}
            color={main_color}
            style={{ marginLeft: 5 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Clinic working hours{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            // paddingVertical: 15,
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Saturday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled1 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled1}
            value={isEnabled1}
          />
        </View>

        {isEnabled1 ? (
          shift(
            "Saturday",
            "sat_start",
            "sat_end",
            start,
            end,
            startTime,
            endTime,
            exmination_duration,
            number_of_bookings
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            // paddingVertical: 15,
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Sunday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled2 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled2}
            value={isEnabled2}
          />
        </View>
        {isEnabled2 ? (
          shift(
            "Sunday",
            "sun_start",
            "sun_end",
            start1,
            end1,
            startTime1,
            endTime1,
            exmination_duration1,
            number_of_bookings1
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Monday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled3 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled3}
            value={isEnabled3}
          />
        </View>
        {isEnabled3 ? (
          shift(
            "Monday",
            "mon_start",
            "mon_end",
            start2,
            end2,
            startTime2,
            endTime2,
            exmination_duration2,
            number_of_bookings2
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Tuesday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled4 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled4}
            value={isEnabled4}
          />
        </View>
        {isEnabled4 ? (
          shift(
            "Tuesday",
            "tues_start",
            "tues_end",
            start3,
            end3,
            startTime3,
            endTime3,
            exmination_duration3,
            number_of_bookings3
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Wednesday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled5 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled5}
            value={isEnabled5}
          />
        </View>
        {isEnabled5 ? (
          shift(
            "Wendesday",
            "wen_start",
            "wen_end",
            start4,
            end4,
            startTime4,
            endTime4,
            exmination_duration4,
            number_of_bookings4
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Thursday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled6 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled6}
            value={isEnabled6}
          />
        </View>
        {isEnabled6 ? (
          shift(
            "Thursday",
            "thurs_start",
            "thurs_end",
            start5,
            end5,
            startTime5,
            endTime5,
            exmination_duration5,
            number_of_bookings5
          )
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
              width: "85%",
            }}
          >
            {" "}
            Friday{" "}
          </Text>

          <Switch
            trackColor={{ false: "#777777", true: main_color }}
            thumbColor={!isEnabled7 ? "#bbbbbb" : "#009900"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled7}
            value={isEnabled7}
          />
        </View>
        {isEnabled7 ? (
          shift(
            "Friday",
            "fri_start",
            "fri_end",
            start6,
            end6,
            startTime6,
            endTime6,
            exmination_duration6,
            number_of_bookings6
          )
        ) : (
          <></>
        )}
      </View>
    );
  };

  // **************************************************************************************************************************

  const NevigateTab = () => {
    return (
      <View style={[styles.content, { backgroundColor: main_color }]}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "7%" }}></View>
          <View style={{ width: "37%", justifyContent: "flex-end" }}>
            <Icon5
              name={icon21}
              size={25}
              color={color_schedule}
              onPress={schedule}
              style={{ paddingHorizontal: 20 }}
            />
            {page === "Schedule" ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                }}
              >
                {" "}
                Schedule{" "}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={{ width: "37%", justifyContent: "flex-end" }}>
            <Icon4
              name={icon20}
              size={25}
              color={color_profile}
              onPress={profile}
              style={{ paddingHorizontal: 12 }}
            />
            {page === "Profile" ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                }}
              >
                {" "}
                Profile{" "}
              </Text>
            ) : (
              <></>
            )}
          </View>

          <View style={{ justifyContent: "flex-end" }}>
            <Icon4
              name={icon22}
              size={25}
              color={color_more}
              onPress={more}
              style={{ paddingHorizontal: 10 }}
            />
            {page === "More" ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                }}
              >
                {" "}
                More{" "}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    );
  };

  // **************************************************************************************************************************

  const More = () => {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={HandleHistory}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={HandleAppointments}
          >
            <Text style={styles.buttonText}>Appointments</Text>
          </TouchableOpacity>
        </View>
        <Appointments />
      </View>
    );
  };

  // **************************************************************************************************************************
if(Object.keys(doctor).length !== 0){
  return (
    <View style={{ flex: 1 }}>
      {page === "Profile" ||
      (page === "Schedule" && schedule_summary) ||
      page === "More" ? (
        <View style={[styles.header, { alignItems: "center" }]}>
          <Text style={styles.label}> {page} </Text>
        </View>
      ) : (
        Header()
      )}
      <ScrollView>
        {page === "Profile" ? (
          <View>
            {ProCard()}
            {ProViewsAndBookings()}
            {DoctorClinicTab()}

            {flag ? DocInfo() : ClinicInfo()}
          </View>
        ) : page === "Professional Information" ? (
          ProsonalInformation()
        ) : page === "Account Settings" ? (
          AccountSettings()
        ) : page === "About the Doctor" ? (
          AboutTheDoctor()
        ) : page === "Clinic Name and Number" ? (
          ClinicNameAndNumber()
        ) : page === "Exmination and Follow-up" ? (
          ExminationAndFollowUp()
        ) : page === "Assistant Name and Number" ? (
          AssistantNameAndNumber()
        ) : page === "Schedule" ? (
          <View>
            {ScheduleTab()}
            <View
              style={{ backgroundColor: "white", height: 15, marginTop: 10 }}
            ></View>

            {schedule_summary ? (
              empty ? (
                ScheduleSummaryEmpty()
              ) : (
                appoints()
              )
            ) : (
              <View>
                {WorkingHourSettings()}
                {ClinicWorkingHours()}
              </View>
            )}
          </View>
        ) : page === "More" ? (
          More()
        ) : (
          <></>
        )}
      </ScrollView>
      {page === "Profile" ||
      (page === "Schedule" && schedule_summary) ||
      page === "More" ? (
        NevigateTab()
      ) : (
        <></>
      )}
      <StatusBar style="light" backgroundColor="#288759" />
    </View>
  );
}
  
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    // alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  content: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 7,

    // marginBottom: 3,
    marginHorizontal: 3,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },

  inp: {
    width: "90%",
    height: 40,
    borderBottomWidth: 2,
    borderColor: "#288771",
    // borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
    // fontStyle: "italic",
    padding: 6,
    color: "#000000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#008080",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  button1: {
    backgroundColor: "#ff6347",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

export default Info;
