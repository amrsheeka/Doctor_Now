import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import {
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_doc_by_email,
  getAppointment_by_doc_id,
} from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
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
    if (date == ""){
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

  const click_date = () => {
    setDate_radio("checked");
    setPhone_radio("u  nchecked");
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
          value="Doctor"
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
          value="Center"
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
            Get_Appointment_By_Date(Date_Value);
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

    <Text style ={{color : "red" , marginTop : -15 , marginHorizontal : 10}}> {TextErr} </Text>

      {appointments_History.length !== 0 ? (
        <View>
          <ScrollView>
            {appointments_History.map((ele, idx) => {
              return (
                <Doc_card_appointment
                  number={idx + 1}
                  key={idx}
                  date={ele.date}
                  time={ele.time}
                  name_patient={ele.name_patient}
                  doc_name={ele.doc_name}
                  gender={ele.gender}
                  notes={ele.notes}
                  date_now={ele.date_now}
                  specialization1={ele.specialization1}
                  image={ele.doc_image}
                  doctor_id={ele.doctor_id}
                  users_id={ele.users_id}
                  age={ele.age}
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
