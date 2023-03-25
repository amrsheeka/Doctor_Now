import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const DoctorCard = ({ navigation, doctor }) => {
  const image = doctor.image;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Doctorbage", { doctor })}
    >
      <View style={styles.card}>
        <View style={styles.photo}>
          <Image source={image?{uri: image}:require("../assets/Herbal_Medicine_Male_Avatar.png")} 
          style={styles.cardPhoto} />
        </View>
        <View style={styles.cardContent}>
          <View>
            <Text numberOfLines={1} ellipsizeMode='tail'
            style={styles.cardTitle}>{doctor.name}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' 
            style={styles.cardDoctor}>{doctor.title+","+doctor.specialization1+","+doctor.specialization1}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("AppointmentConfirmation", { doctor })}
          style={styles.cardButton}>
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
    height: 260,
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
    marginBottom: 10,
    margin:10,
  },
  cardPhoto: {
    width:80 ,
    height: 80,
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
    padding: 5,
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
    marginTop:"20%",
  },
});
export default DoctorCard;
