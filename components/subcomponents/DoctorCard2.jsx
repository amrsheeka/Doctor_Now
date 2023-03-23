import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const DoctorCard2 = ({ navigation, doctor }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Doctorbage", { doctor })}>
      <View style={styles.card}>
        <Image source={doctor.photo} style={styles.cardPhoto} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{doctor.name}</Text>
          <Text style={styles.cardDoctor}>{doctor.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDoctor: {
    fontSize: 14,
    color: "#555",
  },
});
export default DoctorCard2;
