import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const DoctorCard = ({ navigation, doctor }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Doctorbage", { doctor })}
    >
      <View style={styles.card}>
        <View style={styles.photo}>
          <Image source={doctor.photo} style={styles.cardPhoto} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{doctor.name}</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Make Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 230,
    backgroundColor: "#eceff1",
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
    width: "60%",
    height: "60%",
    borderRadius: 50,
    alignItems: "center",

  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardButton: {
    backgroundColor: "#288771",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  photo:{
    alignItems:"center",
    justifyContent:"center",
  },
});
export default DoctorCard;
