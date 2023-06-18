import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";


const My_Account = ({
  email,
  number,
  current_password,
  new_password,
  confirm_password,
  fun1,
  fun2,
  fun3,
  fun4,
  fun5,
  fun6,
}) => {
  const [open_password, setOpen_password] = useState(false);
  const main_color = "#288771";


  return (
    <View>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Icon6
          name={"email"}
          size={30}
          color={main_color}
          style={{ width: "7%" }}
        />
        <Text
          style={{
            fontSize: 16,
            // fontStyle: "italic",
            // fontWeight: "bold",
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Email address{" "}
        </Text>
      </View>
      <TextInput
        style={styles.inp}
        defaultValue={email}
        keyboardType="email-address"
        //placeholder={"last name"}
        onChangeText={fun1}
      />
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Icon6
          name={"phone"}
          size={30}
          color={main_color}
          style={{ width: "7%" }}
        />
        <Text
          style={{
            fontSize: 16,
            // fontStyle: "italic",
            // fontWeight: "bold",
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Mobile number{" "}
        </Text>
      </View>
      <TextInput
        style={styles.inp}
        defaultValue={number}
        keyboardType="phone-pad"
        //placeholder={"last name"}
        onChangeText={fun2}
      />
      <TouchableOpacity
        onPress={() => {
          setOpen_password(!open_password);
        }}
      >
        <View
          style={[
            {
              marginHorizontal: 15,
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Icon4
            name={"user-lock"}
            size={25}
            color={main_color}
            style={{ width: "10%" }}
          />
          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            Change Password{" "}
          </Text>
        </View>
      </TouchableOpacity>

      {open_password ? (
        <View>
          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            Current Password{" "}
          </Text>
          <TextInput
            style={styles.inp}
            defaultValue={current_password}
            secureTextEntry
            onChangeText={fun3}
          />

          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            New Password{" "}
          </Text>
          <TextInput
            style={styles.inp}
            defaultValue={new_password}
            secureTextEntry
            onChangeText={fun4}
          />

          <Text
            style={{
              fontSize: 16,
              // fontStyle: "italic",
              // fontWeight: "bold",
              marginHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {" "}
            Confirm New Password{" "}
          </Text>
          <TextInput
            style={styles.inp}
            defaultValue={confirm_password}
            secureTextEntry
            onChangeText={fun5}
          />
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={fun6}
      >
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
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inp: {
    width: "90%",
    height: 40,
    borderBottomWidth: 2,
    borderColor: "#288771",
    // borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
    // fontStyle: "italic",
    padding: 6,
    color: "#000000",
  },
});

export default My_Account;
