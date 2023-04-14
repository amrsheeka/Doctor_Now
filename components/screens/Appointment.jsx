import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
const Appointment = ({ navigation }) => {
  let id = CurrentUser.user.id
  const [appointments, setAppointments] = useState([])
  const [flag, setFlag] = useState(true)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call the function that updates your data here
      getAppointment(id).then((res) => {
        console.log(res)
        res.length >= 1 ? (setAppointments(res),setFlag(true)) : setFlag(false)
      })
    }, 10000);

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    flag ? (

    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Appointments</Text>
        </View>
      <View style={{ flex: 10, flexDirection: "column" }}>
        <ScrollView>
          {
            appointments.map((ele, idx) => {
              return <Doc_card_appointment key={idx} navigation={navigation} date={ele.date} time={ele.time} name_patient={ele.name_patient} doc_name={ele.doc_name} gender={ele.gender} notes={ele.notes} date_now={ele.date_now} specialization1={ele.specialization1} image={ele.image} doctor_id={ele.doctor_id} users_id={ele.users_id} />
            })
          }
        </ScrollView>
      </View>
    </View>)
      :(
      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Appointments</Text>
        </View>
        <View style={{ padding: "18%" ,flex:6}}>
          <ActivityIndicator size={100} color="#00ff00" />
        </View>
      </View>)
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 20,
    flex: 1
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Appointment;
