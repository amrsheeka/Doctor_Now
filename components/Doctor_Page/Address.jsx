import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon2 from "react-native-vector-icons/Entypo";

const Address = ({ address, fun1, x, fun2, y, fun3 }) => {
  const main_color = "#288771";

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          marginVertical: 5,
        }}
      >
        <Icon2
          name={"location"}
          size={30}
          color={main_color}
          style={{ width: "7%", marginLeft: 10 }}
        />
        <Text
          style={{
            color: "black",
            paddingHorizontal: 7,
            width: "85%",
            fontSize : 16,
          }}
        >
          {" "}
          Clinic Address{" "}
        </Text>
      </View>
      <TextInput
        style={styles.inp}
        defaultValue={address}
        //placeholder={"last name"}
        onChangeText={fun1}
      />
      <TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon2
            name={"map"}
            size={30}
            color={main_color}
            style={{ width: "10%", marginLeft: 10 }}
          />

          <Text
            style={{
              color: main_color,
              marginVertical: 20,
              marginHorizontal: 5,
              fontSize : 16,
            }}
          >
            Select Clinic's Address From Map
          </Text>
        </View>
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

export default Address;
