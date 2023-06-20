import React, { useState, useEffect } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  list,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";

import ProCard from "./ProCard";
import Personal_Information from "./Personal_Information";
import My_Account from "./My_Account";
import About_The_Doctor from "./About_The_Doctor";
import Doctor_Info from "./Doctor_Info";
import Clinic_Info from "./Clinic_Info";
import Clinic_Name_And_Number from "./Clinic_Name_And_Number";
import Exmination_And_FollowUp from "./Exmination_And_FollowUp";
import Assistant_Name_And_Number from "./Assistant_Name_And_Number";
import Number_Views_bookings_And_Tab from "./Number_Views_bookings_And_Tab";
import Schedule_Summary from "./Schedule_Summary";
import More from "./More";
import Appointments_History from "./Appointments_History";
import Comments from "./Comments";
import Address from "./Address";

import {
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_doc_by_email,
  logout,
  getAppointment_by_doc_id,
  getReviews,
  getCurrentUser,
  editUser,
} from "../../database/Users";
import Appointments from "./Appointments";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import CurrentUser from "../consts/CurrentUser";
import {
  editDoctor,
  getDocSchedule,
  updateSchedule,
  updateDoctor,
} from "../../database/Doctors";

const Info = ({ navigation }) => {
  const main_color = "#288771";

  const [doctor_booking, setDoctor_booking] = useState({});
  const [date, setDate] = useState(new Date());
  const [birth, setBirth] = useState("select your birth day");
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  const [number_of_bookings, setNumber_of_bookings] = useState("6");
  const [number_of_bookings1, setNumber_of_bookings1] = useState("6");
  const [number_of_bookings2, setNumber_of_bookings2] = useState("6");
  const [number_of_bookings3, setNumber_of_bookings3] = useState("6");
  const [number_of_bookings4, setNumber_of_bookings4] = useState("6");
  const [number_of_bookings5, setNumber_of_bookings5] = useState("6");
  const [number_of_bookings6, setNumber_of_bookings6] = useState("6");

  const [exmination_duration, setExmination_duration] = useState(30);
  const [exmination_duration1, setExmination_duration1] = useState(30);
  const [exmination_duration2, setExmination_duration2] = useState(30);
  const [exmination_duration3, setExmination_duration3] = useState(30);
  const [exmination_duration4, setExmination_duration4] = useState(30);
  const [exmination_duration5, setExmination_duration5] = useState(30);
  const [exmination_duration6, setExmination_duration6] = useState(30);

  const [selected, setSelected] = useState("First In First Out");
  const [selected2, setSelected2] = useState("Accept all bookings");
  const [selected3, setSelected3] = useState("Pulmonologist");
  const [profile_views, setProfileviews] = useState("10");
  const [bookings, setBookings] = useState("9");
  const [reviews, setReviews] = useState("25");
  const [doc_radio, setDoc_radio] = useState("unchecked");
  const [center_radio, setCenter_radio] = useState("unchecked");
  const [practise_licence, setPractise_licence] = useState("");
  const [professional_licence, setProfessional_licence] = useState("");
  const [page, setPage] = useState("Profile");
  const [color_more, setColor_more] = useState("#666");
  const [color_profile, setColor_profile] = useState("white");
  const [color_schedule, setColor_schedule] = useState("#666");
  const [fName, setfName] = useState("");
  const [fullpro_title, setFullpro_title] = useState(" Consultant of dinstiy ");

  const [doctor_email, setDoctor_email] = useState();
  const [doctor_phone, setDoctor_phone] = useState();
  const [open_password, setOpen_password] = useState(false);

  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");

  const [about_the_doctor, setAbout_theDoctor] = useState("");
  const [height, setHeight] = useState(0);
  const { rev, setRev } = useContext(AppContext);
  const [nameClinic, setNameClinic] = useState("Essam Clinic");
  const [numberClinic, setNumberClinic] = useState("01012453522");
  const [nameAssistant, setNameAssistant] = useState("doctor sheeka");
  const [numberAssistant, setNumberAssistant] = useState("01016232521");
  const [exmain, setExmain] = useState("100");
  const [follow_up, setFollow_up] = useState("55");
  const [duration, setDuration] = useState("7");
  const [flag, setFlag] = useState(true);
  const [schedule_summary, setSchedule_summary] = useState(true);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [color1, setColor1] = useState(main_color);
  const [color2, setColor2] = useState("black");
  const [color1_sechedule, setColor1_sechedule] = useState(main_color);
  const [color2_sechedule, setColor2_sechedule] = useState("black");
  const [rate, setRate] = useState();
  const [views, setViews] = useState();
  const [address, setAddress] = useState();
  const [x_coordnate, setX_coordnate] = useState(null);
  const [y_coordnate, setY_coordnate] = useState(null);

  const [whichDay, setWhichDay] = useState(0);

  const icon20 = "user-md";
  const icon21 = "calendar";
  const icon22 = "bars";
  const icon23 = "calendar-clock";
  const icon24 = "chevron-down";
  const icon25 = "calendar-month";
  const icon26 = "plane";

  const empty = false;

  const { schedules, setSchedules } = useContext(AppContext);
  const { appointments, setAppointments } = useContext(AppContext);
  const { setType } = useContext(AppContext);
  const { curruser } = useContext(AppContext);
  const { doctor, setDoctor } = useContext(AppContext);
  const [image, setImage] = useState();

  async function getDoc() {
    let email = CurrentUser.user.email;
    return await get_doc_by_email(email);
  }
  async function handleExaminType(type) {
    setSelected(type);
    let doc = { ...doctor };
    if (type == "First In First Out") {
      doc["schedule_type"] = "fifo";
    } else if (type == "On Appointments") {
      doc["schedule_type"] = "on appointment";
    } else if (type == "Special") {
      doc["schedule_type"] = "special";
    }
    update_Doctor_info(doc);
    console.log(doc);
  }
  const handleSave = (i) => {
    updateSchedule({
      day: schedules[i].day,
      doctor_id: schedules[i].doctor_id,
      start: schedules[i].start,
      end: schedules[i].end,
      id: schedules[i].id,
      avilable: schedules[i].avilable,
      number:
        i == 0
          ? number_of_bookings
          : i == 1
          ? number_of_bookings1
          : i == 2
          ? number_of_bookings2
          : i == 3
          ? number_of_bookings3
          : i == 4
          ? number_of_bookings4
          : i == 5
          ? number_of_bookings5
          : number_of_bookings6,
    }).then((res) => {
      if (res.status == "success") setModalVisible(true);
    });
  };
  async function getRev(id) {
    getReviews(id).then((res) => {
      setRev(res);
    });
  }
  async function getSchedule(id) {
    const res = await getDocSchedule(id).then((res1) => {
      setSchedules(res1);
      setIsEnabled1(res1[0].avilable == "yes" ? true : false);
      setIsEnabled2(res1[1].avilable == "yes" ? true : false);
      setIsEnabled3(res1[2].avilable == "yes" ? true : false);
      setIsEnabled4(res1[3].avilable == "yes" ? true : false);
      setIsEnabled5(res1[4].avilable == "yes" ? true : false);
      setIsEnabled6(res1[5].avilable == "yes" ? true : false);
      setIsEnabled7(res1[6].avilable == "yes" ? true : false);
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
      setNumber_of_bookings(res1[0].number);
      setNumber_of_bookings1(res1[1].number);
      setNumber_of_bookings2(res1[2].number);
      setNumber_of_bookings3(res1[3].number);
      setNumber_of_bookings4(res1[4].number);
      setNumber_of_bookings5(res1[5].number);
      setNumber_of_bookings6(res1[6].number);
      setBookings(appointments.length);
      setReviews(rev.length);
      // setStartTime(res1[0].start);
      // setStartTime1(res1[1].start);
      // setStartTime2(res1[2].start);
      // setStartTime3(res1[3].start);
      // setStartTime4(res1[4].start);
      // setStartTime5(res1[5].start);
      // setStartTime6(res1[6].start);
      // setEndTime(res1[0].end);
      // setEndTime1(res1[1].end);
      // setEndTime2(res1[2].end);
      // setEndTime3(res1[3].end);
      // setEndTime4(res1[4].end);
      // setEndTime5(res1[5].end);
      // setEndTime6(res1[6].end);
    });
    return res;
  }

  async function update_Doctor_info(doctor) {
    await updateDoctor({
      ...doctor,
    }).then(() => {
      getDoc();
    });
  }

  async function get_number_of_booking(id, date) {
    await getAppointment_by_doc_id(id, date).then((res) => {
      // console.log(res);
      let x;
      if (res.status !== "failed") x = res.length;
      else x = 0;
      for (let i = 0; i < 10; i++) {
        setDoctor_booking({ ...doctor_booking, [i]: x });
      }
      console.log(doctor_booking);
    });
  }

  async function updateSchedules(schedule) {
    await updateSchedule({
      ...schedule,
    }).then(() => {
      getSchedule(doctor.id);
    });
  }

  useEffect(() => {
    getDoc().then((res) => {
      setDoctor_email(res[0].email);
      setfName(res[0].name);
      setAbout_theDoctor(res[0].describtion);
      setDoctor_phone(res[0].number);
      setSelected3(res[0].title);
      setFullpro_title(res[0].specialization1);
      setImage(res[0].image);
      setExmain(res[0].price);
      setRate(res[0].rate);
      setViews(res[0].views);
      setAddress(res[0].address);
      setX_coordnate(res[0].x_coordnate);
      setY_coordnate(res[0].y_coordnate);
      getRev(res[0].id);

      if (res[0].schedule_type == "fifo") {
        setSelected("First In First Out");
      } else if (res[0].schedule_type == "on appointment") {
        setSelected("On Appointments");
      } else if (res[0].schedule_type == "special") {
        setSelected("Special");
      }
      res[0].title1 == "Doctor"
        ? setDoc_radio("checked")
        : setCenter_radio("checked");
      setDoctor(res[0]);
      getSchedule(res[0].id);
    });
  }, []);

  const back = () => {
    setDoc_radio("unchecked");
    setCenter_radio("unchecked");
    setfName(doctor.name);
    setAbout_theDoctor(doctor.describtion);
    setDoctor_phone(doctor.number);
    setSelected3(doctor.title);
    setFullpro_title(doctor.specialization1);
    setExmain(doctor.price);
    doctor.title1 == "Doctor"
      ? setDoc_radio("checked")
      : setCenter_radio("checked");

    page === "Schedule" ? summary() : profile();
    setOpen_password(false);
  };

  const save = () => {
    if (fName.length < 10) {
      alert("you must insert the full name");
      return;
    }

    if (doctor_phone.length != 5 && doctor_phone.length != 11) {
      alert("you must insert the correct number");
      return;
    }

    update_Doctor_info({
      ...doctor,
      name: fName,
      describtion: about_the_doctor,
      number: doctor_phone,
      title: selected3,
      specialization1: fullpro_title,
      title1: doc_radio == "checked" ? "Doctor" : "Clinic",
      price: exmain,
    }).then(() => {
      getDoc().then((res) => {
        setDoctor(res[0]);
        console.log(res[0]);
      });
    });

    setPage("Profile");
    setOpen_password(false);
  };

  let email = CurrentUser.user.email;

  /////////////////////////////////////

  const Doctor_info = () => {
    setFlag(true);
    setColor1(main_color);
    setColor2("black");
  };

  const Clinic_info = () => {
    setFlag(false);
    setColor1("black");
    setColor2(main_color);
  };

  const summary = () => {
    setSchedule_summary(true);
    setColor1_sechedule(main_color);
    setColor2_sechedule("black");
  };

  const management = () => {
    setSchedule_summary(false);
    setColor1_sechedule("black");
    setColor2_sechedule(main_color);
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

  // const exmin_duration = (exmin) => {
  //   if (exmin === exmination_duration) return setExmination_duration;
  //   else if (exmin === exmination_duration1) return setExmination_duration1;
  //   else if (exmin === exmination_duration2) return setExmination_duration2;
  //   else if (exmin === exmination_duration3) return setExmination_duration3;
  //   else if (exmin === exmination_duration4) return setExmination_duration4;
  //   else if (exmin === exmination_duration5) return setExmination_duration5;
  //   else if (exmin === exmination_duration6) return setExmination_duration6;
  // };
  const bookings_number = (book) => {
    if (book === number_of_bookings) return setNumber_of_bookings;
    else if (book === number_of_bookings1) return setNumber_of_bookings1;
    else if (book === number_of_bookings2) return setNumber_of_bookings2;
    else if (book === number_of_bookings3) return setNumber_of_bookings3;
    else if (book === number_of_bookings4) return setNumber_of_bookings4;
    else if (book === number_of_bookings5) return setNumber_of_bookings5;
    else if (book === number_of_bookings6) return setNumber_of_bookings6;
  };
  const ChangeTime = async (event, selectedTime) => {
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
      updateSchedules({
        day: schedules[0].day,
        doctor_id: schedules[0].doctor_id,
        start: fTime,
        end: schedules[0].end,
        id: schedules[0].id,
        avilable: schedules[0].avilable,
      });
    } else if (which === "sat_end") {
      updateSchedules({
        day: schedules[0].day,
        doctor_id: schedules[0].doctor_id,
        start: schedules[0].start,
        end: fTime,
        id: schedules[0].id,
        avilable: schedules[0].avilable,
      });
    } else if (which === "sun_start") {
      updateSchedules({
        day: schedules[1].day,
        doctor_id: schedules[1].doctor_id,
        start: fTime,
        end: schedules[1].end,
        id: schedules[1].id,
        avilable: schedules[1].avilable,
      });
    } else if (which === "sun_end") {
      updateSchedules({
        day: schedules[1].day,
        doctor_id: schedules[1].doctor_id,
        start: schedules[1].start,
        end: fTime,
        id: schedules[1].id,
        avilable: schedules[1].avilable,
      });
    } else if (which === "mon_start") {
      updateSchedules({
        day: schedules[2].day,
        doctor_id: schedules[2].doctor_id,
        start: fTime,
        end: schedules[2].end,
        id: schedules[2].id,
        avilable: schedules[2].avilable,
      });
    } else if (which === "mon_end") {
      updateSchedules({
        day: schedules[2].day,
        doctor_id: schedules[2].doctor_id,
        start: schedules[2].start,
        end: fTime,
        id: schedules[2].id,
        avilable: schedules[2].avilable,
      });
    } else if (which === "tues_start") {
      updateSchedules({
        day: schedules[3].day,
        doctor_id: schedules[3].doctor_id,
        start: fTime,
        end: schedules[3].end,
        id: schedules[3].id,
        avilable: schedules[3].avilable,
      });
    } else if (which === "tues_end") {
      updateSchedules({
        day: schedules[3].day,
        doctor_id: schedules[3].doctor_id,
        start: schedules[3].start,
        end: fTime,
        id: schedules[3].id,
        avilable: schedules[3].avilable,
      });
    } else if (which === "wen_start") {
      updateSchedules({
        day: schedules[4].day,
        doctor_id: schedules[4].doctor_id,
        start: fTime,
        end: schedules[4].enad,
        id: schedules[4].id,
        avilable: schedules[4].avilable,
      });
    } else if (which === "wen_end") {
      updateSchedules({
        day: schedules[4].day,
        doctor_id: schedules[4].doctor_id,
        start: schedules[4].start,
        end: fTime,
        id: schedules[4].id,
        avilable: schedules[4].avilable,
      });
    } else if (which === "thurs_start") {
      updateSchedules({
        day: schedules[5].day,
        doctor_id: schedules[5].doctor_id,
        start: fTime,
        end: schedules[5].end,
        id: schedules[5].id,
        avilable: schedules[5].avilable,
      });
    } else if (which === "thurs_end") {
      updateSchedules({
        day: schedules[5].day,
        doctor_id: schedules[5].doctor_id,
        start: schedules[5].start,
        end: fTime,
        id: schedules[5].id,
        avilable: schedules[5].avilable,
      });
    } else if (which === "fri_start") {
      //setStartTime6(currentTime);
      //setStart6(fTime);
      updateSchedules({
        day: schedules[6].day,
        doctor_id: schedules[6].doctor_id,
        start: fTime,
        end: schedules[6].end,
        id: schedules[6].id,
        avilable: schedules[6].avilable,
      });
    } else if (which === "fri_end") {
      //setEndTime6(currentTime);
      //setEnd6(fTime);
      updateSchedules({
        day: schedules[6].day,
        doctor_id: schedules[6].doctor_id,
        start: schedules[6].start,
        end: fTime,
        id: schedules[6].id,
        avilable: schedules[6].avilable,
      });
    }
  };
  const ChangeTime1 = async (event, selectedTime) => {
    ChangeTime(event, selectedTime).then(() => {
      // console.log("dasssssssssssss" + start);
    });
  };

  const shift = (
    day,
    day_start,
    day_end,
    s,
    e,
    start_time,
    end_time,
    booking,
    setbooking
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
              onChange={ChangeTime1}
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
              onChange={ChangeTime1}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
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
              // defaultValue={booking + ""}
              keyboardType="phone-pad"
              //placeholder={"last name"}
              onChangeText={setbooking}
              onSubmitEditing={() => {
                if (day == "Saturday") {
                  handleSave(0);
                } else if (day == "Sunday") {
                  handleSave(1);
                } else if (day == "Monday") {
                  handleSave(2);
                } else if (day == "Tuesday") {
                  handleSave(3);
                } else if (day == "Wednesday") {
                  handleSave(4);
                } else if (day == "Thursday") {
                  handleSave(5);
                } else if (day == "Friday") {
                  handleSave(6);
                }
              }}
              value={booking}
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              if (day == "Saturday") {
                handleSave(0);
              } else if (day == "Sunday") {
                handleSave(1);
              } else if (day == "Monday") {
                handleSave(2);
              } else if (day == "Tuesday") {
                handleSave(3);
              } else if (day == "Wednesday") {
                handleSave(4);
              } else if (day == "Thursday") {
                handleSave(5);
              } else if (day == "Friday") {
                handleSave(6);
              }
            }}
            style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}
          >
            <Icon6
              style={{ marginLeft: 10 }}
              name="content-save-check-outline"
              size={45}
              color={main_color}
            />
            <Text style={{ fontSize: 20 }}>Save</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  // **************************************************************************************************************************

  const Header = () => {
    return (
      <View style={[styles.header, { flexDirection: "row" }]}>
        <Icon2
          name={"arrow-left"}
          size={30}
          color="white"
          onPress={back}
          style={{ width: "7%", marginHorizontal: 10 }}
        />
        <Text style={[styles.label, { width: "75%" }]}> {page} </Text>
        {page == "Appointments" ||
        page == "Appointments History" ||
        page == "Comments" ||
        page == "Schedule" ? (
          <></>
        ) : (
          <Icon6
            name={"content-save-check"}
            size={30}
            color="white"
            onPress={save}
            style={{ width: "20%" }}
          />
        )}
      </View>
    );
  };

  // **************************************************************************************************************************
  let url = "";
  const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    console.log("ok");
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);
    let downloadUrl;
    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          downloadUrl = await getDownloadURL(uploadTask.snapshot.ref).then(
            (res) => {
              url = res;
            }
          );

          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].uri.split("/").pop();
      const { uri } = result.assets[0];
      console.log(image);
      setImage(result.assets[0].uri);
      // console.log(result.assets[0].uri);

      await uploadToFirebase(uri, fileName, (v) => console.log(v)).then(
        async () => {
          await update_Doctor_info({
            ...doctor,
            image: url,
          }).then(() => {
            getDoc().then((res) => {
              setDoctor(res[0]);
              console.log(res[0]);
            });
          });
          const user = curruser;
          console.log(user);
          let updateUser = {};
          const set = async () => {
            updateUser = {
              ...user,
              image: url,
            };
          };
          await set().then(() => {
            editUser(updateUser).then((res) => {
              console.log(res);
            });
          });
        }
      );
      alert("Your Photo has been sended");
    } else {
      alert("You did not select any image.");
      return;
    }
  };

  // **************************************************************************************************************************

  // **************************************************************************************************************************

  // **************************************************************************************************************************

  // **************************************************************************************************************************
  const click_doctor = () => {
    setDoc_radio("checked");
    setCenter_radio("unchecked");
  };
  const click_center = () => {
    setDoc_radio("unchecked");
    setCenter_radio("checked");
  };

  // **************************************************************************************************************************

  // **************************************************************************************************************************

  // **************************************************************************************************************************

  // **************************************************************************************************************************

  // **************************************************************************************************************************

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
              alignSelf: "center",
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
              alignSelf: "center",
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
          data={[
            { value: "First In First Out" },
            { value: "On Appointments" },
            { value: "Special" },
          ]}
          setSelected={handleExaminType}
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
            onValueChange={(e) => {
              setIsEnabled1(e);
              console.log(e);
              updateSchedules({
                day: schedules[0].day,
                doctor_id: schedules[0].doctor_id,
                start: schedules[0].start,
                end: schedules[0].end,
                id: schedules[0].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings,
            setNumber_of_bookings
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
            onValueChange={(e) => {
              setIsEnabled2(e);
              updateSchedules({
                day: schedules[1].day,
                doctor_id: schedules[1].doctor_id,
                start: schedules[1].start,
                end: schedules[1].end,
                id: schedules[1].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings1,
            setNumber_of_bookings1
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
            onValueChange={(e) => {
              setIsEnabled3(e);
              console.log(e);
              updateSchedules({
                day: schedules[2].day,
                doctor_id: schedules[2].doctor_id,
                start: schedules[2].start,
                end: schedules[2].end,
                id: schedules[2].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings2,
            setNumber_of_bookings2
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
            onValueChange={(e) => {
              setIsEnabled4(e);
              console.log(e);
              updateSchedules({
                day: schedules[3].day,
                doctor_id: schedules[3].doctor_id,
                start: schedules[3].start,
                end: schedules[3].end,
                id: schedules[3].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings3,
            setNumber_of_bookings3
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
            onValueChange={(e) => {
              setIsEnabled5(e);
              console.log(e);
              updateSchedules({
                day: schedules[4].day,
                doctor_id: schedules[4].doctor_id,
                start: schedules[4].start,
                end: schedules[4].end,
                id: schedules[4].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings4,
            setNumber_of_bookings4
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
            onValueChange={(e) => {
              setIsEnabled6(e);
              console.log(e);
              updateSchedules({
                day: schedules[5].day,
                doctor_id: schedules[5].doctor_id,
                start: schedules[5].start,
                end: schedules[5].end,
                id: schedules[5].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings5,
            setNumber_of_bookings5
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
            onValueChange={(e) => {
              setIsEnabled7(e);
              console.log(e);
              updateSchedules({
                day: schedules[6].day,
                doctor_id: schedules[6].doctor_id,
                start: schedules[6].start,
                end: schedules[6].end,
                id: schedules[6].id,
                avilable: e ? "yes" : "no",
              });
            }}
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
            number_of_bookings6,
            setNumber_of_bookings6
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
  // **************************************************************************************************************************
  if (Object.keys(doctor).length !== 0) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign name="checkcircle" size={120} style={styles.icon2} />
              {/* <Image source={""}/> */}
              <Text style={styles.modalText}>Saved successfully</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
              {
                <ProCard
                  title1={doc_radio == "checked" ? "Doctor" : "Center"}
                  fullName={fName}
                  specialization={selected3}
                  specialization2={fullpro_title}
                  image={image}
                  rate={rate}
                  views={views}
                  fun1={() => setPage("Professional Information")}
                  fun2={selectFile}
                  fun3={() => setPage("Account Settings")}
                />
              }
              <Number_Views_bookings_And_Tab
                profile_views={profile_views}
                bookings={bookings}
                fun1={Doctor_info}
                fun2={Clinic_info}
                color1={color1}
                color2={color2}
              />

              {flag ? (
                <Doctor_Info
                  navigation={navigation}
                  desc={about_the_doctor}
                  fun1={() => setPage("About the Doctor")}
                />
              ) : (
                <Clinic_Info
                  nameClinic={nameClinic}
                  numberClinic={numberClinic}
                  exmain={exmain}
                  follow_up={follow_up}
                  duration={duration}
                  address = {address}
                  nameAssistant={nameAssistant}
                  numberAssistant={numberAssistant}
                  fun1={() => setPage("Clinic Name and Number")}
                  fun2={() => setPage("Exmination and Follow-up")}
                  fun3={() => setPage("Assistant Name and Number")}
                  fun4={() => setPage("Clinic Address")}
                />
              )}
            </View>
          ) : page === "Professional Information" ? (
            <Personal_Information
              fullName={fName}
              fun1={setfName}
              doc_radio={doc_radio}
              fun2={click_doctor}
              center_radio={center_radio}
              fun3={click_center}
              specialization={selected3}
              fun4={setSelected3}
              specialization2={fullpro_title}
              fun5={setFullpro_title}
            />
          ) : page === "Account Settings" ? (
            <My_Account
              email={doctor_email}
              fun1={setDoctor_email}
              number={doctor_phone}
              fun2={setDoctor_phone}
              current_password={current_password}
              fun3={setCurrent_password}
              new_password={new_password}
              fun4={setNew_password}
              confirm_password={confirm_new_password}
              fun5={setConfirm_new_password}
              fun6={() =>
                logout().then(() => {
                  navigation.navigate("StackNavigator");
                })
              }
            />
          ) : page === "About the Doctor" ? (
            <About_The_Doctor
              desc={about_the_doctor}
              fun1={setAbout_theDoctor}
              height={height}
              fun2={(event) => setHeight(event.nativeEvent.contentSize.height)}
            />
          ) : page === "Clinic Name and Number" ? (
            <Clinic_Name_And_Number
              nameClinic={nameClinic}
              fun1={setNameClinic}
              numberClinic={numberClinic}
              fun2={setNumberClinic}
            />
          ) : page === "Exmination and Follow-up" ? (
            <Exmination_And_FollowUp
              exmain={exmain}
              fun1={setExmain}
              follow_up={follow_up}
              fun2={setFollow_up}
              duration={duration}
              fun3={setDuration}
            />
          ) : page === "Assistant Name and Number" ? (
            <Assistant_Name_And_Number
              nameAssistant={nameAssistant}
              fun1={setNameAssistant}
              numberAssistant={numberAssistant}
              fun2={setNumberAssistant}
            />
          ) : page === "Schedule" ? (
            <View>
              {ScheduleTab()}
              <View
                style={{ backgroundColor: "white", height: 15, marginTop: 10 }}
              ></View>

              {schedule_summary ? (
                <Schedule_Summary
                  fun1={setWhichDay}
                  fun2={() => setPage("Appointments")}
                  doctor_booking={doctor_booking}
                  id={doctor.id}
                  fun3={get_number_of_booking}
                  color_plane={color_plane}
                  fun4={setColor_plane}
                  empty={empty}
                  fun5={() => management()}
                />
              ) : (
                <View>
                  {WorkingHourSettings()}
                  {ClinicWorkingHours()}
                </View>
              )}
            </View>
          ) : page === "More" ? (
            <More
              fun1={() => setPage("Appointments History")}
              fun2={() => setPage("Comments")}
              navigation={navigation}
            />
          ) : page === "Appointments" ? (
            <Appointments
              id={doctor.id}
              date={new Date(
                new Date().getTime() + whichDay * 24 * 60 * 60 * 1000
              ).toDateString()}
              fun1={() => profile()}
            />
          ) : page === "Appointments History" ? (
            <Appointments_History id={doctor.id} />
          ) : page === "Comments" ? (
            <Comments id={doctor.id} />
          ) : page === "Clinic Address" ? (
            <Address
              navigation={navigation}
              doctor={doctor}
            />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#288771",
  },
  buttonClose: {
    backgroundColor: "#288771",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon2: {
    color: "#288771",
    padding: 20,
  },
});

export default Info;
