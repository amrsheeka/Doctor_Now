import React, { memo, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  deleteAppointment,
  deleteAppointment_fromHistory,
  getAllAppointment,
  getAllAppointment_from_history,
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_History_Apps_for_User,
  insertAppointment_toHistory,
} from "../../database/Users";
import Icon from "react-native-vector-icons/AntDesign";
import { AppContext } from "../consts/AppContext";
import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { useState } from "react";
import FlipCard from "react-native-flip-card";
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
  age,
  schedule_type,
  number,
}) {
  const { appointments, setAppointments } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const { type } = useContext(AppContext);

  const [clickNotes, setClickNotes] = useState(false);
  const main_color = "#288771";
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
    schedule_type: schedule_type,
    number: number,
  };
  let id = CurrentUser.user.id;
  let is_doctor = CurrentUser.user.is_doctor;
  console.log(obj);
  const Delete = async () => {
    await insertAppointment_toHistory(
      users_id,
      doctor_id,
      date,
      time,
      name_patient,
      age,
      gender,
      notes,
      doc_name,
      image,
      specialization1
    ).then(async () => {
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
    });
  };
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
        } else {
          get_History_Apps_for_User(users_id).then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        }
      }
    });
  };
  const Finish = async () => {
    await insertAppointment_toHistory(
      users_id,
      doctor_id,
      date,
      time,
      name_patient,
      age,
      gender,
      notes,
      doc_name,
      image,
      specialization1
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
    );
  };
  return is_doctor == "no" ? (
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

          {type != "history" ? (
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
          ) : (
            <TouchableOpacity
              style={[styles.cardButton, night && styles.buttonDark]}
              onPress={() => Delete2()}
            >
              <Text style={styles.cardButtonText}>Delete </Text>
            </TouchableOpacity>
          )}

          {/* <Text style={styles.cardTitle}>create at  {date_now}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <FlipCard
        style={styles.content}
        friction={20}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={clickNotes}
        clickable = {false}
        // onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
      >
        <View >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 5,
                width: "90%",
              }}
            >
              Time: {time}
            </Text>

            <Icon
              onPress={() => alert("Do it, Fahim")}
              name={"carryout"}
              size={30}
              color={main_color}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "35%" }}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../assets/Herbal_Medicine_Male_Avatar.png")
                }
                style={[styles.image, { width: "100%" }]}
              />
            </View>

            <View style={{ width: "65%", justifyContent: "center" }}>
              {obj.schedule_type !== "special" ? (
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    marginTop: 10,
                    marginHorizontal: 10,
                    // alignSelf: "center",
                  }}
                >
                  Patient Number: {obj.number}
                </Text>
              ) : (
                <></>
              )}

              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  marginTop: 10,
                  marginHorizontal: 10,
                  // alignSelf: "center",
                }}
              >
                Name: {name_patient}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  marginTop: 10,
                  marginHorizontal: 10,
                  // alignSelf: "center",
                }}
              >
                Gender : {gender}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    marginTop: 10,
                    marginHorizontal: 10,
                    width: "70%",
                    // alignSelf: "center",
                  }}
                >
                  Age : {age}
                </Text>
                <TouchableOpacity onPress={() => setClickNotes(true)}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginVertical: 5,
                      color: main_color,
                      marginTop: 10,
                      // marginHorizontal : 10,
                      alignSelf: "center",
                      // width: "45%",
                    }}
                  >
                    Notes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress = {() => setClickNotes(false)}>
        <View style = {{backgroundColor : main_color , minHeight : 200}}>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              color: "black",
              marginTop: 10,
              // marginHorizontal : 10,
              alignSelf: "center",
              // width: "45%",
            }}
          >
            Notes: 
          </Text>
          {notes.length != 0 ? (
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              color: "white",
              marginHorizontal : 10,

              // marginHorizontal : 10,
              // alignSelf: "center",
              // width: "45%",
            }}
          >
            {notes} 
          </Text>
          ) : (
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              color: "white",
              marginTop: 50,

              // marginHorizontal : 10,
              alignSelf: "center",
              justifyContent : "center",
              // width: "45%",
            }}
          >
            {"No Notes"} 
          </Text>)}
        </View>
        </TouchableOpacity>

      </FlipCard>
    </View>

    // </View>
  );

  {
    /* 
  //     {
  //       type === "history" ? (
  //         <View style={{ flexDirection: "row", gap: 60 }}>
  //           <TouchableOpacity
  //             style={styles.cardButton}
  //             onPress={() => Delete2()}
  //           >
  //             <Text style={styles.cardButtonText}>Delete </Text>
  //           </TouchableOpacity>
  //         </View>
  //       ) : (
  //         <View style={{ flexDirection: "row", gap: 60 }}>
  //           <TouchableOpacity
  //             style={styles.cardButton}
  //             onPress={() => Finish()}
  //           >
  //             <Text style={styles.cardButtonText}> Finish </Text>
  //           </TouchableOpacity>
  //         </View>

  //       )
  //     }
  //   </View>
  // </View>
 */
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 7,
    minHeight: 200,

    marginBottom: 10,
    marginHorizontal: 7,
  },
  image: {
    width: "45%",
    height: 140,
    marginVertical: 10,
  },
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
    color: "white",
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
    backgroundColor: "#0D1E3D",
  },
  darklist: {
    backgroundColor: "#142E5E",
  },
  dark2: {
    backgroundColor: "#BDD3FF",
  },
});
export default memo(Doc_card_appointment);
