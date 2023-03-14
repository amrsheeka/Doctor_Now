import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from "react-native";

const User = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>User</Text>
      <Button
        containerStyle={styles.button}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("LoginScreen")}
        title="Logout"
        titleStyle={styles.buttonText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default User;
