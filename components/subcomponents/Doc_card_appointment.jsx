import React, { memo, useContext } from "react";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { deleteAppointment, getAllAppointment } from "../../database/Users";
import { AppContext } from "../consts/AppContext";
import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
function Doc_card_appointment({
  navigation,
  image,
  date,
  time,
  name_patient,
  doc_name,
  gender,
  notes,
  date_now,
  specialization1,
  doctor_id,
  users_id,
}) {
  const { appointments, setAppointments } = useContext(AppContext);
  let obj = {
    image: image,
    date: date,
    time: time,
    name_patient: name_patient,
    doc_name: doc_name,
    gender: gender,
    notes: notes,
    date_now: date_now,
    specialization1: specialization1,
    doctor_id: doctor_id,
    users_id: users_id,
  };
  let id = CurrentUser.user.id;
  let is_doctor = CurrentUser.user.is_doctor;
  console.log(obj)
  const Delete = async () => {
    await deleteAppointment(users_id, doctor_id).then((res) => {
      console.log("its ok");
      if (CurrentUser.user.is_admin == "yes") {
        getAllAppointment().then((res) => {
          res.status != "failed" ? setAppointments(res) : setAppointments([]);
        });
      } else {
        getAppointment(id).then((res) => {
          res.status != "failed" ? setAppointments(res) : setAppointments([]);
        });
      }
    });
  }
  return (
    is_doctor == "no" ?
      <TouchableOpacity
        onPress={() => navigation.navigate("Appointment2", { obj })}
      >
        <View style={styles.card}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../assets/Herbal_Medicine_Male_Avatar.png")
            }
            defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")}
            style={styles.cardPhoto}
          />
          <View style={styles.cardContent}>
            <View style={styles.cardContent1}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.cardTitle}
              >
                Doctor: {doc_name}
              </Text>
              {/* <Text numberOfLines={3} ellipsizeMode='tail'
            style={styles.cardTitle}> {specialization1}</Text> */}
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.cardTitle}
              >
                Patient Name: {name_patient}
              </Text>
              {/* <Text numberOfLines={2} ellipsizeMode='tail'
            style={styles.cardTitle}>Date: {date}</Text>
          <Text numberOfLines={2} ellipsizeMode='tail'
            style={styles.cardTitle}>Time: {time}</Text>
          <Text numberOfLines={2} ellipsizeMode='tail'
            style={styles.cardTitle}>gender: {gender}</Text>
          <Text numberOfLines={5} ellipsizeMode='tail'
            style={styles.cardTitle}>notes: {notes}</Text> */}
            </View>
            <View style={{ flexDirection: "row", gap: 60 }}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => navigation.navigate("Update_patient", obj)}
              >
                <Text style={styles.cardButtonText}>Update </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => Delete()}
              >
                <Text style={styles.cardButtonText}>Decline </Text>
              </TouchableOpacity>
            </View>

            {/* <Text style={styles.cardTitle}>create at  {date_now}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
      :
      
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardContent1}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.cardTitle}
              >
                User Name: {name_patient}
              </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.cardTitle}
            >
              Gender : {gender}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.cardTitle}
            >
              Nodes: {notes}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.cardTitle}
            >
              Date: {date}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.cardTitle}
            >
              Time: {time}
            </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 60 }}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => Delete()}
              >
                <Text style={styles.cardButtonText}>Decline </Text>
              </TouchableOpacity>
            </View>

            {/* <Text style={styles.cardTitle}>create at  {date_now}</Text> */}
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fc",
    borderRadius: 20,
    marginBottom: 20,
    // marginHorizontal: 20,
    gap: 20,
  },
  cardPhoto: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  cardContent1: {
    gap: 10,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  cardDoctor: {
    fontSize: 14,
    color: "#555",
  },
  cardButton: {
    backgroundColor: "#288771",
    padding: 8,
    borderRadius: 5,
    width: "30%",
    marginTop: "10%",
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#eceff1",
    paddingVertical: 10,
    borderRadius: 10,
  },
});
export default memo(Doc_card_appointment);
