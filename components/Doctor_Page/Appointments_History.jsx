import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";

import {
  get_History_Apps_for_Doctor,
  get_History_Apps_for_Doctor_by_Number,
  deleteAppointment_fromHistory,
} from "../../database/Users";
import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
import DateTimePicker from "@react-native-community/datetimepicker";

const Appointments_History = ({ id }) => {
  const [date_radio, setDate_radio] = useState("checked");
  const [phone_radio, setPhone_radio] = useState("unchecked");
  const [label, setLabel] = useState("Date");
  const [phone_number, setPhone_number] = useState("");
  const [show_Date, setShow_Date] = useState(false);
  const [selected_Date, setSelected_Date] = useState(new Date());
  const [Date_Value, setDate_Value] = useState("");
  const [TextErr, setTextErr] = useState("");
  const main_color = "#288771";

  const { appointments_History, setAppointments_History } =
    useContext(AppContext);

  //

  const Get_Appointment_By_Date = (date) => {
    if (date == "") {
      setTextErr("Select the date");
      return;
    }
    setTextErr("");
    get_History_Apps_for_Doctor(id, date).then((res) => {
      console.log(res);
      if (res.status !== "failed") setAppointments_History(res);
      else setAppointments_History([]);

      console.log(" date: ", date);
      console.log(appointments_History);
    });
  };

  const Get_Appointment_By_Number = (number) => {
    if (!number) {
      setTextErr("Enter phone number.");
      return;
    } else if (number.length != 11 || !number.startsWith("01")) {
      setTextErr("Enter correct phone number.");
      return;
    }
    setTextErr("");

    get_History_Apps_for_Doctor_by_Number(id, number).then((res) => {
      console.log(res);
      if (res.status !== "failed") setAppointments_History(res);
      else setAppointments_History([]);

      // console.log(" date: ", date);
      console.log(appointments_History);
    });
  };

  // const Delete = async () => {
  //   await deleteAppointment_fromHistory(users_id, id).then(() => {
  //     console.log("its ok");
  //     if (CurrentUser.user.is_doctor == "yes") {
  //       get_History_Apps_for_Doctor(id, date_value).then((res) => {
  //         console.log(res);
  //         if (res.status !== "failed") setAppointments_History(res);
  //         else setAppointments_History([]);

  //         console.log(" date: ", date);
  //         console.log(appointments_History);
  //       });
  //     }
  //     // else if (CurrentUser.user.is_admin == "yes") {
  //     //   getAllAppointment_from_history().then((res) => {
  //     //     res.status != "failed" ? setAppointments(res) : setAppointments([]);
  //     //   });
  //     // }
  //     // else {
  //     //     get_History_Apps_for_User(users_id).then((res) => {
  //     //       res.status != "failed" ? setAppointments(res) : setAppointments([]);
  //     //     });
  //     //   }
  //   });
  // };

  const click_date = () => {
    setDate_radio("checked");
    setPhone_radio("unchecked");
    setLabel("Date");
  };
  const click_phone = () => {
    setDate_radio("unchecked");
    setPhone_radio("checked");
    setLabel("Phone Number");
  };

  const ChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    let tempDate = new Date(currentDate).toDateString();

    setShow_Date(false);
    setSelected_Date(currentDate);
    setDate_Value(tempDate);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          //   marginLeft: 10,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: main_color,
            fontWeight: "bold",
            marginHorizontal: 10,
          }}
        >
          {" "}
          Search by:{" "}
        </Text>
        <RadioButton
          status={date_radio}
          color={main_color}
          value="Date"
          uncheckedColor="black"
          onPress={click_date}
        />
        <Text
          style={{
            color: "black",
            paddingBottom: 3,
            width: "20%",
            // paddingHorizontal: 5,
          }}
        >
          Date
        </Text>
        <RadioButton
          status={phone_radio}
          color={main_color}
          value="phone"
          uncheckedColor="black"
          onPress={click_phone}
        />
        <Text
          style={{
            color: "black",
            paddingBottom: 3,
            // paddingHorizontal: 5,
          }}
        >
          Phone Number
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          //   marginLeft: 10,
          marginVertical: 20,
        }}
      >
        {label == "Date" ? (
          <TextInput
            label={"Date"}
            mode="outlined"
            style={{ marginHorizontal: 10, width: "80%" }}
            onPressIn={() => setShow_Date(true)}
            value={Date_Value}
            showSoftInputOnFocus={false}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={<TextInput.Icon icon="calendar" />}
            activeOutlineColor={main_color}
          />
        ) : (
          <TextInput
            label={"Phone Number"}
            mode="outlined"
            keyboardType="number-pad"
            style={{ marginHorizontal: 10, width: "80%" }}
            value={phone_number}
            onChangeText={setPhone_number}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={<TextInput.Icon icon="phone" />}
            activeOutlineColor={main_color}
          />
        )}
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
          }}
          onPress={() => {
            label == "Date"
              ? Get_Appointment_By_Date(Date_Value)
              : Get_Appointment_By_Number(phone_number);
          }}
        >
          <Icon6 name={"file-search"} size={40} color={main_color} />
        </TouchableOpacity>
      </View>
      {show_Date && (
        <DateTimePicker
          value={selected_Date}
          onChange={ChangeDate}
          maximumDate={new Date()}
          mode="date"
        />
      )}

      <Text style={{ color: "red", marginTop: -15, marginHorizontal: 10 }}>
        {" "}
        {TextErr}{" "}
      </Text>

      {appointments_History.length !== 0 ? (
        <View>
          <ScrollView>
            {appointments_History.map((ele, idx) => {
              return (
                <Doc_card_appointment
                  number={idx + 1}
                  key={idx}
                  users_id={ele.users_id}
                  doctor_id={ele.doctor_id}
                  date={ele.date}
                  time={ele.time}
                  name_patient={ele.name_patient}
                  age={ele.age}
                  gender={ele.gender}
                  phone_number={ele.phone_number}
                  notes={ele.notes}
                  diagnosis={ele.diagnosis}
                  therapeutic={ele.therapeutic}
                  patient_image={ele.patient_image}
                  doc_name={ele.doc_name}
                  doc_image={ele.doc_image}
                  specialization1={ele.specialization1}
                  date_now={ele.date_now}
                  appointment_history={true}
                  //   schedule_type={schedule_type}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text
              style={{
                color: "#555555",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" It looks like there are no bookings in  "}{" "}
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text
              style={{
                color: "#555555",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" this day or this patient ... choose another day "}{" "}
            </Text>
          </View>

          <Image
            source={require("../assets/splash.png")}
            style={[
              styles.image,
              { alignSelf: "center", marginVertical: 50, height: 220 },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 75,

    // marginBottom: 3,
    marginHorizontal: 5,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },
});

export default Appointments_History;
