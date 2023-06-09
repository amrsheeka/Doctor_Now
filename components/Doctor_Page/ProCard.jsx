import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProCard = ({
  title1,
  fullName,
  specialization,
  specialization2,
  image,
  rate,
  views,
  fun1,
  fun2,
  fun3,
}) => {
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
            <Icon
              name={
                rate < 0.4
                  ? "star-border"
                  : rate < 0.9
                  ? "star-half"
                  : "star"
              }
              size={35}
              color="gold"
            />
            <Icon
              name={
                rate < 1.4
                  ? "star-border"
                  : rate < 1.9
                  ? "star-half"
                  : "star"
              }
              size={35}
              color="gold"
            />
            <Icon
              name={
                rate < 2.4
                  ? "star-border"
                  : rate < 2.9
                  ? "star-half"
                  : "star"
              }
              size={35}
              color="gold"
            />
            <Icon
              name={
                rate < 3.4
                  ? "star-border"
                  : rate < 3.9
                  ? "star-half"
                  : "star"
              }
              size={35}
              color="gold"
            />
            <Icon
              name={
                rate < 4.4
                  ? "star-border"
                  : rate < 4.9
                  ? "star-half"
                  : "star"
              }
              size={35}
              color="gold"
            />
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
              {views} {" Reviews "}
            </Text>
            <TouchableOpacity style={{ alignItems: "center" }} onPress={fun3}>
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
