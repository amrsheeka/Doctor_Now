import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_doc_by_email,
  getAppointment_by_doc_id,
} from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
const Appointments = ({ id, date, fun1 }) => {
  //   let email = CurrentUser.user.email;
  //   const [schedule_type, set_schedule_type] = useState("");
  const { appointments, setAppointments } = useContext(AppContext);
  //   const { type } = useContext(AppContext);
  const main_color = "#288771";
  useEffect(() => {
    getAppointment_by_doc_id(id, date).then((res) => {
      console.log(res);
      if (res.status !== "failed") setAppointments(res);
      else setAppointments([]);
      console.log(appointments);
    });

    // if (type == "history") {
    //   get_doc_by_email(email).then((ans) => {
    //     set_schedule_type(ans[0].schedule_type);

    //     if (ans.status !== "failed") {
    //       get_History_Apps_for_Doctor(ans[0].id).then((res) => {
    //         if (res.status !== "failed")
    //           res.length >= 1 ? setAppointments(res) : setAppointments([]);
    //       });
    //     }
    //   });
    // } else {
    //   get_doc_by_email(email).then((ans) => {
    //     set_schedule_type(ans[0].schedule_type);

    // if (ans.status !== "failed") {
    // }
    //   });
    // }
    // console.log(schedule_type);
  }, []);

  return (
    <View>
      {/* <Text style = {{color : "black"}}> hello </Text> */}

      {/* <View style={styles.header}>
                <View style={{ paddingHorizontal: "25%" }}>
                    {
                        type == "history" ?
                            <Text style={styles.heading}>My History</Text> :
                            <Text style={styles.heading}>My Appointments</Text>
                    }
                </View>
            </View> */}

      {appointments.length !== 0 ? (
        <View>
          <ScrollView>
            {appointments.map((ele, idx) => {
              return (
                <Doc_card_appointment
                  number={idx + 1}
                  key={idx}
                  users_id={ele.users_id}
                  doctor_id={ele.doctor_id}
                  date={ele.date}
                  time={ele.time}
                  name_patient={ele.name_patient}
                  age={ele.age}
                  gender={ele.gender}
                  phone_number={ele.phone_number}
                  notes={ele.notes}
                  patient_image={ele.patient_image}
                  doc_name={ele.doc_name}
                  doc_image={ele.doc_image}
                  specialization1={ele.specialization1}
                  date_now={ele.date_now}
                  appointment_history={false}
                  //   schedule_type={schedule_type}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text
              style={{
                color: "#555555",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" No work available at this time "}{" "}
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text
              style={{
                color: "#555555",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" Please check back later as more appointments  "}{" "}
            </Text>
            <Text
              style={{
                color: "#555555",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" will be booked soon. "}{" "}
            </Text>
          </View>

          <Image
            source={require("../assets/splash.png")}
            style={[
              styles.image,
              { alignSelf: "center", marginVertical: 50, height: 220 },
            ]}
          />

          <TouchableOpacity style={{ alignItems: "center" }} onPress={fun1}>
            <Text
              style={{
                borderRadius: 10,
                backgroundColor: main_color,
                //   paddingHorizontal: 20,
                paddingVertical: 10,
                color: "white",
                margin: 20,
                textAlign: "center",
                width: "50%",
              }}
            >
              {" "}
              Go To Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
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
    // marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
});

export default Appointments;
