import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Number_Views_bookings_And_Tab = ({
  profile_views,
  bookings,
  color1,
  color2,
  fun1,
  fun2,
}) => {
  const main_color = "#288771";

  return (
    <View>
      <View style={{ marginVertical: 5, flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <View style={styles.content}>
            <Text
              style={{
                color: main_color,
                fontSize: 15,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {profile_views}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              {" "}
              {" Profile Views "}{" "}
            </Text>
          </View>
        </View>

        <View style={{ width: "50%" }}>
          <View style={styles.content}>
            <Text
              style={{
                color: main_color,
                fontSize: 15,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {bookings}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              {" "}
              {" Bookings "}{" "}
            </Text>
          </View>
        </View>
      </View>

      {/* tab ///////////////////////////////////////////////////////////////////////////////////////  */}

      <View
        style={[
          styles.content,
          {
            flexDirection: "row",
            width: "100%",
            margin: 3,
            paddingVertical: 15,
          },
        ]}
      >
        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={fun1}
        >
          <Text
            style={{
              color: color1,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Doctor info "}{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={fun2}
        >
          <Text
            style={{
              color: color2,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {" "}
            {" Clinic info "}{" "}
          </Text>
        </TouchableOpacity>
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
});

export default Number_Views_bookings_And_Tab;
