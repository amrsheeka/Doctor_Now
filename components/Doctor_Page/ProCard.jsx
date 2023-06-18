import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProCard = ({
  title1,
  fullName,
  specialization,
  specialization2,
  image,
  reviews,
  fun1,
  fun2,
  fun3,
}) => {
  const [icon1, setIcon1] = useState("star");
  const [icon2, setIcon2] = useState("star");
  const [icon3, setIcon3] = useState("star");
  const [icon4, setIcon4] = useState("star");
  const [icon5, setIcon5] = useState("star");

  const main_color = "#288771";


  
  return (
    <View style={styles.content}>
      <View style={{ marginVertical: 5, flexDirection: "row" }}>
        <Text
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 5,
            width: "90%",
          }}
        >
          {title1} {fullName}
        </Text>
        <Icon
          onPress={fun1}
          name={"edit"}
          size={30}
          color={main_color}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
      <Text style={{ color: "black", fontSize: 15 }}>
        {specialization} - {specialization2}{" "}
      </Text>

      <View style={{ marginVertical: 5, flexDirection: "row", width: "100%" }}>
        <TouchableOpacity style={{ width: "45%" }} onPress={fun2}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
            }
            style={[styles.image, { width: "100%" }]}
          />
        </TouchableOpacity>

        <View style={{ width: "55%", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Icon name={icon1} size={35} color="gold" />
            <Icon name={icon2} size={35} color="gold" />
            <Icon name={icon3} size={35} color="gold" />
            <Icon name={icon4} size={35} color="gold" />
            <Icon name={icon5} size={35} color="gold" />
          </View>

          <View>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              {" "}
              {reviews} {" Reviews "}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={fun3}
            >
              <Text
                style={{
                  backgroundColor: main_color ,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  color: "white",
                  margin: 20,
                }}
              >
                {" "}
                My Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

    // marginBottom: 3,
    marginHorizontal: 3,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },
});

export default ProCard;
