import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";

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
        data={Doctor.doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        initialNumToRender={7}
        maxToRenderPerBatch={7}
        windowSize={7}
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
