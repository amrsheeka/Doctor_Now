import {
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
import { sighnup } from "../../database/Users";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";


const SignUpScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showPasswordIcon2, setShowPasswordIcon2] = useState(false);

  const main_color = "#288771";

  const handleSignUp = async () => {

    if (!email) {
      setEmailErr("Enter your email address.");
    } else if (!ValidateEmail(email)) {
      setEmailErr(
        "The email address should have the format: (user@example.com)."
      );
    } else {
      setEmailErr("");
    }

    if (!password) {
      setPasswordErr("Enter your password.");
    } else if (password.length < 8) {
      setPasswordErr("password should be at least 8 letters.");
    } else if (!ValidatePassword(password)) {
      setPasswordErr(
        "password should have at least one letter and one number"
      );
    } else {
      setPasswordErr("");
    }

    if (confirm != password) {
      setConfirmErr("Password and Confirm password does not match")
    } else {
      setConfirmErr("");
    }



    if (ValidateEmail(email) && ValidatePassword(password) && confirm === password) {

      sighnup(route.params.name,
        email, password,
        route.params.phone,
        route.params.address,
        // route.params.address2,
        route.params.age,
        route.params.gender,
        confirm
      )
        .then((res) => {
          //console.log("res:", res);
          if (res.status == "success") {
            alert("Register Successfully go to login ->");
            navigation.navigate("LoginScreen");
          } else {
            alert(res);
          }

        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  function ValidateEmail(x) {
    let input = "";
    input = x;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  function ValidatePassword(x) {
    let input = "";
    input = x;
    var validRegex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.icon, { marginTop: 100 }]}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../assets/splash.png")}
          />
        </View>
        <View style={styles.icon}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Register your account!
          </Text>
        </View>


        <TextInput
          label={"Email"}
          mode="outlined"
          style={{ marginTop: 30 }}
          value={email}
          onChangeText={setEmail}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={
            <TextInput.Icon icon={'email'} />
          }
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{emailErr}</Text>


        <TextInput
          label={"Password"}
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPasswordIcon}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={<TextInput.Icon icon={'lock'} />}
          right={<TextInput.Icon icon={showPasswordIcon ? 'eye-off' : 'eye'} onPress={() => setShowPasswordIcon(!showPasswordIcon)} iconColor="grey" />}
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{passwordErr}</Text>

        <TextInput
          label={"Confirm password"}
          mode="outlined"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={!showPasswordIcon2}
          outlineStyle={{
            borderColor: main_color,
            borderRadius: 10,
            color: "red",
          }}
          left={<TextInput.Icon icon={'lock'} />}
          right={<TextInput.Icon icon={showPasswordIcon2 ? 'eye-off' : 'eye'} onPress={() => setShowPasswordIcon2(!showPasswordIcon2)} iconColor="grey" />}
          activeOutlineColor={main_color}
        />
        <Text style={{ color: "red" }}>{confirmErr}</Text>


        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: main_color,
            width: "70%",
            borderRadius: 20,
            height: 45,
            marginTop: 40,
            marginBottom: 5,
          }}
          onPress={() => handleSignUp()}
        >
          <Text style={{ alignSelf: "center", color: "white", marginTop: 10 }}>
            Register
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

export default SignUpScreen;
