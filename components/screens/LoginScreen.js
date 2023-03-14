import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignUp = () => {
    navigation.navigate("SignUpScreen");
  };
  const handleLogin = ()=>{

  }

  return (
    
    <View style={styles.container}>
      <View >
         <Text >Welcome to Doctor Now!</Text>
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
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Homefunc')}
          title="Login"
          titleStyle={styles.buttonText}
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={[styles.button, styles.buttonOutline]}
          onPress={navigateSignUp}
          title="Register"
          titleStyle={styles.buttonOutlineText}
        />
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
    fontFamily:"",
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
  textContainer: {},
  text: {},
});

export default LoginScreen;
