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
const AllDoctors = ({ navigation }) => {
  const renderDoctor = ({ item }) => (
    <DoctorCard doctor={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>All Doctors</Text>
      </View>
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
});

export default AllDoctors;
