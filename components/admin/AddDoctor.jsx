import { all } from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
export default function AddDoctor({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>
      <View style={styles.icon}>
        <Image source={require("../assets/splash.png")} />
      </View>
      <View >
        <Text style={styles.greeting}>Add a new doctor!</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }} >Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ color: "red" }}>{emailErr}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }} >Password</Text>

        <TextInput
          placeholder="Password"

          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={{ color: "red" }}>{passwordErr}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}

        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "",
  },
  inputContainer: {
    width: "80%",

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
    marginTop: 20,

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
    borderColor: "#0782F9",
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
    color: "#0782F9",
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
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
