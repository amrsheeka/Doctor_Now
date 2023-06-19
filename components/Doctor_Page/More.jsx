import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Icon3 from "react-native-vector-icons/Fontisto";

const More = ({ navigation, fun1 , fun2 }) => {
  const main_color = "#288771";
  return (
    <View style = {{backgroundColor : 'white'}}>
      <View style={{ marginVertical: 10, alignSelf: "center" }}>
        <Image
          source={require("../assets/doctor.png")}
          style={{ height: 250, width: 250 }}
        />
      </View>
      <TouchableOpacity onPress={fun1}>
        <View
          style={[
            styles.content,
            {
              flexDirection: "row",
              paddingVertical: 15,
              marginTop: 5,
              alignItems: "center",
            },
          ]}
        >
          <Icon3
            name={"history"}
            size={30}
            color={main_color}
            style={{ width: "10%", marginLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Appointemnts History{" "}
          </Text>
          {/* <Icon name={"edit"} size={25} color={main_color} /> */}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PricingPlanBadge");
        }}
      >
        <View
          style={[
            styles.content,
            {
              alignItems: "center",
              flexDirection: "row",
              paddingVertical: 15,
              marginTop: 5,
            },
          ]}
        >
          <Icon3
            name={"wallet"}
            size={30}
            color={main_color}
            style={{ width: "10%", marginLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Subscription Packages{" "}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat_D")}>
        <View
          style={[
            styles.content,
            {
              flexDirection: "row",
              paddingVertical: 15,
              marginTop: 5,
              alignItems: "center",
            },
          ]}
        >
          <Icon3
            name={"messenger"}
            size={30}
            color={main_color}
            style={{ width: "10%", marginLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Chats{" "}
          </Text>

        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={fun2}>
        <View
          style={[
            styles.content,
            {
              flexDirection: "row",
              paddingVertical: 15,
              marginTop: 5,
              alignItems: "center",
            },
          ]}
        >
          <Icon3
            name={"comments"}
            size={30}
            color={main_color}
            style={{ width: "10%", marginLeft: 10 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Comments{" "}
          </Text>
          {/* <Icon name={"edit"} size={25} color={main_color} /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
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
    height: 75,

    marginBottom: 3,
    marginHorizontal: 5,
  },
});

export default More;
