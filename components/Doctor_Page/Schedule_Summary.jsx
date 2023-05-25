import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import { RadioButton } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/FontAwesome";

const Schedule_Summary = ({
  doctor_booking,
  color_plane,
  id,
  empty,
  fun1,
  fun2,
  fun3,
  fun4,
  fun5,
}) => {
  const main_color = "#288771";

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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
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
    fun4(arr);
  };

  const appoint = (i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          fun1(i);
          fun2();
        }}
      >
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
          <View style={{ width: "40%", merginRight: 30 }}>
            <Text style={{ color: main_color }}>
              {i === 0 ? "Today" : i === 1 ? "Tomorrow" : app_days(i)[0]}
            </Text>
            <Text>{app_days(i)[1]}</Text>
          </View>
          <View style={{ width: "45%", alignSelf: "center" }}>
            <Text>
              {doctor_booking[i] === 0
                ? "No Bookings"
                : doctor_booking[i] + " Bookings"}
            </Text>
          </View>
          <Icon5
            onPress={() => {
              fun3(
                i,
                id,
                new Date(
                  new Date().getTime() + i * 24 * 60 * 60 * 1000
                ).toDateString()
              );
              plane(i);
            }}
            name={"plane"}
            size={30}
            color={color_plane[i]}
            style={{ alignSelf: "center", width: "10%", marginLeft: 15 }}
          />
        </View>
      </TouchableOpacity>
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

        <TouchableOpacity style={{ alignItems: "center" }} onPress={fun5}>
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

  return empty ? ScheduleSummaryEmpty() : appoints();


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

    // marginBottom: 3,
    marginHorizontal: 3,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },
});
export default Schedule_Summary;
