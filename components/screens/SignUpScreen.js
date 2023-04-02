import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { sighnup } from "../../database/Users";
// import { TouchableOpacity } from "react-native-web";
const SignUpScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const handleSignUp = async () => {

    if (
      !email ||
      !ValidateEmail(email) ||
      !password ||
      password.length <= 8 ||
      !ValidatePassword(password)
    ) {
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
      } else if (password.length <= 8) {
        setPasswordErr("password should be greater than 7 letters.");
      } else if (!ValidatePassword(password)) {
        setPasswordErr(
          "password should have at least one letter and one number"
        );
      } else {
        setPasswordErr("");
      }
    } else {
      sighnup(route.params.name,
        email, password,
        route.params.phone,
        route.params.address,
        route.params.address2,
        route.params.age,
        gender,
        confirm
      )
        .then((res) => {
          console.log("res:",res);
          if(res=="success")
            navigation.navigate("Homefunc");
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={require("../assets/splash.png")} />
      </View>

      <View>
        <Text style={styles.greeting}>Register your account!</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
          Gender
        </Text>
        <Picker
          selectedValue={gender}
          onValueChange={(value, index) => setGender(value)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
        </Picker>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
          Email
        </Text>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ color: "red" }}>{emailErr}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
          Password
        </Text>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={{ color: "red" }}>{passwordErr}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
          Confirm Password
        </Text>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirm}
          onChangeText={(text) => setConfirm(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text>Already have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#eceff1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: "23%",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#288771",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#288771",
    borderWidth: 2,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "white",
  },
  buttonOutlineText: {
    color: "#288771",
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "#288771",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  picker: {
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
});

export default SignUpScreen;
