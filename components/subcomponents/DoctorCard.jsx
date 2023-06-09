import React,{useContext, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import CurrentUser from "../consts/CurrentUser";
import { getDoctors } from "../../database/Doctors";
import { deleteDoctor } from "../../database/Doctors";
import { AppContext } from "../consts/AppContext";
const DoctorCard = ({ navigation, doctor, user }) => {
  const image = doctor.image;
  let currentUser = CurrentUser.user;
    const { night} = useContext(AppContext);
  const {setDoctors} = useContext(AppContext);
  async function fetchDoctors() {
    const doc = await getDoctors();
    setDoctors(doc);
  }
  const handelDelete =async ()=>{
    deleteDoctor(doctor.id).then(()=>{
      // console.log(doctor.name);
      fetchDoctors();
    }
    );
  }
  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate("Doctorbage", { doctor })}
    >
      <View style={[styles.card,night && styles.dark2]}>
        <View style={styles.photo}>
          <Image source={image ? { uri: image } : require("../assets/Herbal_Medicine_Male_Avatar.png")}
            style={styles.cardPhoto} />
        </View>
        <View style={styles.cardContent}>
          <View>
            <Text numberOfLines={1} ellipsizeMode='tail'
              style={[styles.cardTitle,night && styles.dark2]}>{doctor.name}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail'
              style={[styles.cardDoctor,night && styles.dark2]}>{doctor.title + "," + doctor.specialization1 + "," + doctor.specialization1}</Text>
          </View>
          {
            currentUser.is_admin=="yes"?(<View style={styles.adminComponent}>
              <TouchableOpacity onPress={() => {handelDelete()}}
            style={styles.delete}>
              <MaterialCommunityIcons name="delete" size={50} color={"#288771"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}
            style={{}}>
              <View style={styles.edit}>
              <FontAwesome name="edit" size={50} color={"#288771"}/>
              </View>
              
            </TouchableOpacity>
            </View>):(
              <TouchableOpacity onPress={() => navigation.navigate("AppointmentConfirmation", { doctor })}
              style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Make Appointment</Text>
              </TouchableOpacity>
            )
            
          }
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
    margin: 10,
  },
  cardPhoto: {
    width: 80,
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
  photo: {
    alignItems: "center",
    marginTop: "20%",
  },
  adminComponent:{
    flexDirection:"row",
    height:"35%",
    margin:10,
    gap:10,
  },
  delete:{
    flex:1,
  },
  edit:{
    flex:1,
  },
  dark2: {
    backgroundColor: '#262424',
    color:"white",
    borderColor:'#262424'
  },
});
export default DoctorCard;
