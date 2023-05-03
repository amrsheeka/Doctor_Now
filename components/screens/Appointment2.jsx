import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator, Image,TouchableOpacity } from "react-native";
// import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

import { AppContext } from "../consts/AppContext";
import All_details_to_appointment from "../subcomponents/All_details_to_appointment";
const Appointment2 = ({ navigation ,route }) => {
    let appointment = route.params.obj
    console.log(appointment)
    let id = CurrentUser.user.id
//   const { appointments, setAppointments } = useContext(AppContext);
//   const [flag, setFlag] = useState(true)
//   useEffect(() => {
//     getAppointment(id).then((res) => {
//       console.log(res);
//       res.length >= 1 ? setAppointments(res) : setFlag(false);
//     })
//   }, [])
const { night} = useContext(AppContext);

  return (

    <View style={[styles.container,night && styles.buttonDark]}>
    <View style={[styles.header, night && styles.buttonDark]}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("Appointment")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={[styles.heading,night&&styles.textdark]}>My Appointment</Text>
        </View>
      </View>
          <View style={styles.content}> 
          <View style={styles.profile}>
          <Image source={appointment.image ? { uri: appointment.image } : require("../assets/Herbal_Medicine_Male_Avatar.png")}
        defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")} style={styles.photo} />
               <Text style={[styles.text,night&&styles.textdark]}>{appointment.doc_name}</Text>
          </View>
          <View style={styles.bigblock}>
        <Text style={[styles.text2,night&&styles.textdark]}>Patient Information</Text>
        <View style={styles.block}>
        <Text numberOfLines={2} ellipsizeMode='tail'
            style={[styles.cardTitle, night && styles.dark2]}>Patient Name:</Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}> {appointment.name_patient}</Text>
        </View>
        
        <View style={styles.block}>
            <Text numberOfLines={2} ellipsizeMode='tail'
            style={[styles.cardTitle, night && styles.dark2]}>Date: </Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}>{appointment.date}</Text>
            </View>
          
            <View style={styles.block}>
            <Text numberOfLines={2} ellipsizeMode='tail'
            style={[styles.cardTitle, night && styles.dark2]}>Time:</Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}> {appointment.time}</Text>
            </View>
          
            <View style={styles.block}>
            <Text numberOfLines={2} ellipsizeMode='tail'
            style={[styles.cardTitle, night && styles.dark2]}>gender: </Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}>{appointment.gender}</Text>
            </View>
          
            <View style={styles.block}>
            <Text numberOfLines={5} ellipsizeMode='tail'
            style={[styles.cardTitle, night && styles.dark2]}>notes: </Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}>{appointment.notes}</Text>
            </View>
            <View style={styles.block}>
            <Text style={[styles.cardTitle, night && styles.dark2]}>create at:  </Text>
            <Text style={[styles.cardTitle1, night && styles.dark2]}>{appointment.date_now}</Text>
            </View>

        </View>
        <View style={{flexDirection:"row", gap:60}}>
        <TouchableOpacity style={[styles.cardButton, night && styles.darklist]}
          onPress={() =>""}
        >
          <Text style={styles.cardButtonText}>Update </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardButton, night && styles.darklist]}
          onPress={() => ""}
        >
          <Text style={styles.cardButtonText}>Decline </Text>
        </TouchableOpacity>
        </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
 
  header: {
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 30,
    // marginBottom: 20,
    

  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    

  },
  text: {
    alignContent:"center",
    alignItems:"center",
    margin:10,
    left:"50%",
    fontWeight:"bold",
    fontSize:20
  },
  text2: {
    fontWeight:"bold",
    fontSize:15
  },
  
  Go_Back: {
    // marginTop:15,
    // // width:"10%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",
    width:"10%",
    // left:1
    },
    Go_Back1: {
      // marginTop:15,
      width:"35%",
      // justifyContent: "flex-start",
      // justifyContent: "flex-start",
  
      },
      photo: {
        width:"70%",
        height:"70%",
        borderRadius:20,
        marginLeft:"50%"
        },
        content: {
            paddingHorizontal: 10,
            flexDirection:"column",
            // paddingTop:10,
          },
          profile: {
            // backgroundColor: "#ffffff",
            width:"50%",
            flexDirection:"column",
            height:"40%",
          },
    block: {
        flexDirection: "row",
        gap: 20,
        
    },
          bigblock:{
            flexDirection:"column",
            gap:15
          },
          cardTitle:{
            width:"30%",
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#f7eceb",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            paddingHorizontal:10,
            paddingVertical:5
          },
          cardTitle1:{
            width:"60%",
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#f7eceb",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            paddingHorizontal:10,
            paddingVertical:5
          },
          cardButton: {
            backgroundColor: "#288771",
            padding: 8,
            borderRadius: 5,
            width: "30%",
            marginTop: "5%",
            marginHorizontal:"5%"
        
          },
          cardButtonText: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }, inputContainer: {
            width: "100%",
          },
          buttonDark: {
            backgroundColor: '#0D1E3D',
          },
          darklist: {
            backgroundColor: '#142E5E',
            borderWidth: 0,
        
          },
          dark2: {
            backgroundColor: "#BDD3FF",
          },
          textdark: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            paddingTop: 10,
            color:"white"
          },
});

export default Appointment2;
