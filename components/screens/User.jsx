import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const User = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Profile</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.xx}>
          <MaterialCommunityIcons name="history" size={24} color="black" />
          <Text> History</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Userpage")}>
        <View style={styles.xx}>
          <Ionicons name="md-person-outline" size={24} color="black" />
          <Text> Personal Details</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <Ionicons name="md-location-outline" size={24} color="black" />
          <Text> Addres </Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <AntDesign name="exclamationcircleo" size={24} color="black" />
          <Text> About </Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <SimpleLineIcons name="logout" size={24} color="black" />
          <Text> Logout </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  xx: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});

export default User;
