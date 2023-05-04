import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
// import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

import { getAppointment, get_History_Apps_for_User } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
const Appointment = ({ navigation }) => {
  let id = CurrentUser.user.id
  const { appointments, setAppointments } = useContext(AppContext);
  const { type, setType } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const HandleHistory = () => {
    setActive(true)
    setType("history")
    get_History_Apps_for_User(id).then((res) => {
      console.log(res)
      if (res.status !== "failed")
        res.length >= 1 ? setAppointments(res) : setAppointments([]);
    })
    setActive(false)
  }
  const HandleAppointments = () => {
    setActive(true)
    setType("appointments")
    getAppointment(id).then((res) => {
      if (res.status !== "failed")
        res.length >= 1 ? setAppointments(res) : setAppointments([]);
    })
    setActive(false)

  }

  useEffect(() => {
    getAppointment(id).then((res) => {
      console.log(res);
      res.length >= 1 ? setAppointments(res) : setAppointments([]);
    })
  }, [])



  return (
    <View style={[styles.container, night && styles.buttonDark]}>
      <View style={[styles.header, night && styles.buttonDark]}>
        <View style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        {
          type == "history" ?
            <Text style={styles.heading}>My History</Text> :
            <Text style={styles.heading}>My Appointments</Text>
        }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.button1]} onPress={HandleHistory} >
          <Text style={styles.buttonText}>History </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.button1]} onPress={HandleAppointments} >
          <Text style={styles.buttonText}>Appointments </Text>
        </TouchableOpacity>
      </View>
      {appointments.length !== 0 ?
        (
          active ?
           <View style={[styles.container2, styles.horizontal2]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
           :
            <View style={{ flex: 10, flexDirection: "column" }}>
              <ScrollView>
                {
                  appointments.map((ele, idx) => {
                    return <Doc_card_appointment key={idx} navigation={navigation} date={ele.date} time={ele.time} name_patient={ele.name_patient} doc_name={ele.doc_name} gender={ele.gender} notes={ele.notes} date_now={ele.date_now} specialization1={ele.specialization1} image={ele.doc_image} doctor_id={ele.doctor_id} users_id={ele.users_id} age={ele.age} />
                  })
                }
              </ScrollView>
            </View>
        )
        :
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image style={{ height: "100%", width: "100%", alignItems: "center" }} source={night ? require("../assets/empty1.png") : require("../assets/empty.png")} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingVertical:30,

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
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 30,
    marginBottom: 20,
    backgroundColor: "#288771",

    // marginBottom: 20,


  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",



  },

  Go_Back: {
    // marginTop:15,
    // // width:"10%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",
    width: "10%",
    // left:1
  },
  Go_Back1: {
    // marginTop:15,
    width: "35%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",

  },
  buttonDark: {
    backgroundColor: '#0D1E3D',
  },
  darklist: {
    backgroundColor: '#142E5E',
  },
  dark2: {
    backgroundColor: "#BDD3FF",
  }, buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  button1: {
    backgroundColor: '#ff6347',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Appointment;
