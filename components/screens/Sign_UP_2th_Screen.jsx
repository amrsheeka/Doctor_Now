import {
 // SignUpScreen
  Image,
  StyleSheet,
  Text,
  View,
  // TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";

import { TextInput,RadioButton } from "react-native-paper";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";


const Sign_UP_2th_Screen = ({ navigation }) => {
  const [phone, setphone] = useState("01092297298");
  const [name, setname] = useState("mohamed essam");
  const [address, setaddress] = useState("giza");
  const [age, setAge] = useState("20");
  const [gender, setGender] = useState("male");
  const [nameErr, setnameErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const main_color = "#288771";

  const handle_To_go_next_Screen = () => {
    if (!name) {
      setnameErr("Enter your name.");
    } else if (name.length < 10) {
      setnameErr("Enter your full name, at least 10 letters");
    } else {
      setnameErr("");
    }

    if (!age) {
      setAgeErr("Enter your age.");
    } else if (age < 15) {
      setAgeErr("you should older than 15 years old");
    } else if (age > 70) {
      setAgeErr("you should younger than 70 years old");
    } else {
      setAgeErr("");
    }

    if (!address) {
      setAddressErr("Enter your correct address.");
    } else {
      setAddressErr("");
    }

    if (!phone) {
      setPhoneErr("Enter your phone number.");
    } else if (phone.length != 11 || !phone.startsWith("01")) {
      setPhoneErr("Enter correct phone number.");
    } else {
      setPhoneErr("");
    }

    if (
      age >= 15 &&
      age <= 120 &&
      address &&
      phone.length == 11 &&
      phone.startsWith("01") 
    ) {
      navigation.navigate("SignUpScreen", {
        name,
        phone,
        address,
        age,
        gender
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.icon, { marginTop: 70 }]}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../assets/splash.png")}
          />
        </View>
        <View style={styles.icon}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Fill your Information
          </Text>
        </View>


          <TextInput
            label={"Full Name"}
            mode="outlined"
            style={{ marginTop: 30 }}
            value={name}
            onChangeText={setname}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={
              <TextInput.Icon icon={() => <Icon name={"user"} size={25} />} />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{nameErr}</Text>


        <TextInput
          label={"Age"}
          mode="outlined"
          value={age}
          keyboardType="number-pad"
          onChangeText={setAge}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon2 name={"numeric-9-plus-box-multiple-outline"} size={25} />
              )}
            />
          }
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{ageErr}</Text>

        <TextInput
          label={"Address"}
          mode="outlined"
          value={address}
          onChangeText={setaddress}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={
            <TextInput.Icon
              icon={() => <Icon3 name={"location-pin"} size={25} />}
            />
          }
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{addressErr}</Text>
        <TextInput
          label={"phone number"}
          mode="outlined"
          value={phone}
          keyboardType="number-pad"
          onChangeText={setphone}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={
            <TextInput.Icon icon={() => <Icon name={"phone"} size={25} />} />
          }
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{phoneErr}</Text>
        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //   marginLeft: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
                // fontWeight: "bold",
                marginRight: 15,
              }}
            >
              {" "}
              Gender:{" "}
            </Text>
            <RadioButton
              status={gender=="male"?"checked":"unchecked"}
              color={main_color}
              value={"male"}
              uncheckedColor="black"
              onPress={()=>setGender("male")}
            />
            <Text
              style={{
                color: "black",
                paddingBottom: 3,
                width: "35%",
                // paddingHorizontal: 5,
              }}
            >
              Male
            </Text>
            <RadioButton
              status={gender=="female"?"checked":"unchecked"}
              color={main_color}
              value={"female"}
              uncheckedColor="black"
              onPress={()=>setGender("female")}
            />
            <Text
              style={{
                color: "black",
                paddingBottom: 3,
                // paddingHorizontal: 5,
              }}
            >
              Female
            </Text>
          </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: main_color,
            width: "70%",
            borderRadius: 20,
            height: 45,
            marginTop: 10,
            marginBottom: 5,
          }}
          onPress={() => handle_To_go_next_Screen()}
        >
          <Text style={{ alignSelf: "center", color: "white", marginTop: 10 }}>
            Next
          </Text>
        </TouchableOpacity>
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text>Already have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: "#288771" }}> Login</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" backgroundColor="#fafafa" />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fafafa",
    padding: 25,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Sign_UP_2th_Screen;
