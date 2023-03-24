import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import doctors from "../consts/Doctor";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons } from "@expo/vector-icons";

const AllDoctors = ({ navigation }) => {
  const renderDoctor = ({ item }) => (
    <DoctorCard doctor={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>All Doctors</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.xx}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text>back</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    // flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 18,
    color: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  xx: {
    flexDirection: "row",
  },
});

export default AllDoctors;
