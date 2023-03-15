import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const handleSignUp = () => {
    const signupres = fetch("http://localhost/API/Auth/signup.php", {
      method: "POST",
      //mode: "no-cors",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.status);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Register your account!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={[styles.button, styles.buttonOutline]}
          onPress={handleSignUp}
          title="Register"
          titleStyle={styles.buttonOutlineText}
        />
        <View style={styles.textContainer}>
          <Text>Already have account?</Text>
          <Button
            type="clear"
            title="Log In"
            titleStyle={styles.text}
            onPress={navigateLogin}
          />
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
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "green",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
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
  },
});

export default SignUpScreen;
