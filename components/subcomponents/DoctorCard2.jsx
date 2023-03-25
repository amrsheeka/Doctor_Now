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
          <TouchableOpacity style={styles.cardButton}
            onPress={() => navigation.navigate("AppointmentConfirmation", { doctor })}
          >
            <Text style={styles.cardButtonText}>Make Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fc",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    height:200,
    
  },
  cardPhoto: {
    width: "30%",
    height: "80%",
    margin:5,
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
  cardButton: {
    backgroundColor: "#288771",
    padding: 8,
    borderRadius: 5,
    width:"50%" ,
    marginBottom:12,
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default DoctorCard2;
