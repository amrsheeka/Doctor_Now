import React, { memo, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { deleteAppointment, deleteAppointment_fromHistory, getAllAppointment, getAllAppointment_from_history, getAppointment_for_Doctor, get_History_Apps_for_Doctor, get_History_Apps_for_User, insertAppointment_toHistory } from "../../database/Users";
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
  age
}) {
  const { appointments, setAppointments } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const { type } = useContext(AppContext);

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
    await insertAppointment_toHistory(users_id, doctor_id, date, time, name_patient, age, gender, notes, doc_name, image, specialization1
    ).then(
      async() => {
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
    })
  }
  const Delete2 = async () => {
    await deleteAppointment_fromHistory(users_id, doctor_id).then((res) => {
      console.log("its ok");
      if (CurrentUser.user.is_admin == "yes") {
        getAllAppointment_from_history().then((res) => {
          res.status != "failed" ? setAppointments(res) : setAppointments([]);
        });
      } else {
        if (CurrentUser.user.is_doctor == "yes  ") {
          get_History_Apps_for_Doctor(doctor_id).then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        }else{
          get_History_Apps_for_User(users_id).then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        }
      }
    });
  }
  const Finish = async () => {
    await insertAppointment_toHistory(users_id, doctor_id, date, time, name_patient, age, gender, notes, doc_name, image, specialization1
    ).then(
      await deleteAppointment(users_id, doctor_id).then((res) => {
        console.log("its ok");
        if (CurrentUser.user.is_admin == "yes") {
          getAllAppointment().then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        } else {
          getAppointment_for_Doctor(doctor_id).then((res) => {
            console.log(res);
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        }
      })
    )

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
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.cardTitle}
              >
                Patient Name: {name_patient}
              </Text>
            </View>
        
              {
                type != "history" ?
                  (
                  <View style={{ flexDirection: "row", gap: 60 }}>
                      <TouchableOpacity
                        style={[styles.cardButton, night && styles.buttonDark]}
                        onPress={() => navigation.navigate("Update_patient", obj)}
                      >
                        <Text style={styles.cardButtonText}>Update </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.cardButton, night && styles.buttonDark]}
                        onPress={() => Delete()}
                      >
                        <Text style={styles.cardButtonText}>Decline </Text>
                      </TouchableOpacity>
                    </View>
                  ) :
                  (
                    <TouchableOpacity
                      style={[styles.cardButton, night && styles.buttonDark]}
                      onPress={() => Delete2()}
                    >
                      <Text style={styles.cardButtonText}>Delete </Text>
                    </TouchableOpacity>
                  )
              }


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

          {
            type === "history" ? (
              <View style={{ flexDirection: "row", gap: 60 }}>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => Delete2()}
                >
                  <Text style={styles.cardButtonText}>Delete </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row", gap: 60 }}>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => Finish()}
                >
                  <Text style={styles.cardButtonText}> Finish </Text>
                </TouchableOpacity>
              </View>

            )
          }
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
  cardTitle1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "white"
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
  buttonDark: {
    backgroundColor: '#0D1E3D',
  },
  darklist: {
    backgroundColor: '#142E5E',
  },
  dark2: {
    backgroundColor: "#BDD3FF",
  },
});
export default memo(Doc_card_appointment);
