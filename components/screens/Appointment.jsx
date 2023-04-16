import { useEffect, useState,useContext } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator ,TouchableOpacity} from "react-native";
import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
const Appointment = ({ navigation }) => {
  let id = CurrentUser.user.id
  const {appointments, setAppointments} = useContext(AppContext);
  const [flag, setFlag] = useState(true)
  useEffect(() => {
    getAppointment(id).then((res) => {
      console.log(res)
      res.length >= 1 ? setAppointments(res) : setFlag(false)
    })
  }, [])

  return (

    <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.heading}>My Appointments</Text>
        </View> */}
        <View style={styles.header}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={styles.heading}>My Appointments</Text>
        </View>
      </View>
      <View style={{ flex: 10, flexDirection: "column" }}>
        <ScrollView>
          {
            appointments.map((ele, idx) => {
              return <Doc_card_appointment key={idx} navigation={navigation} date={ele.date} time={ele.time} name_patient={ele.name_patient} doc_name={ele.doc_name} gender={ele.gender} notes={ele.notes} date_now={ele.date_now} specialization1={ele.specialization1} image={ele.doc_image} doctor_id={ele.doctor_id} users_id={ele.users_id} />
            })
          }
        </ScrollView>
      </View>
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical:30,

  },
  // header: {
  //   backgroundColor: "#288771",
  //   width: "100%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 30,
  //   marginBottom: 20,
  //   flex: 1
  // },
  // heading: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#fff",
  // },
  header: {
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    // marginBottom: 20,
    

  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    

  },
  
  Go_Back: {
    
    width:"10%",
    },
    Go_Back1: {
      width:"35%",
    
  
      },
});

export default Appointment;
