import React, { memo, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  deleteAppointment,
  deleteAppointment_fromHistory,
  getAllAppointment,
  getAllAppointment_from_history,
  getAppointment_for_Doctor,
  get_History_Apps_for_Doctor,
  get_History_Apps_for_User,
  insertAppointment_toHistory,
  getAppointment_by_doc_id,
} from "../../database/Users";
import Icon from "react-native-vector-icons/AntDesign";
import { AppContext } from "../consts/AppContext";
import { getAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { useState } from "react";
import FlipCard from "react-native-flip-card";

import Icon2 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
// import { TextInput } from "react-native-paper";
function Doc_card_appointment({
  navigation,
  number,
  users_id,
  doctor_id,
  date,
  time,
  name_patient,
  age,
  gender,
  phone_number,
  notes,
  diagnosis,
  therapeutic,
  patient_image,
  doc_name,
  doc_image,
  specialization1,
  date_now,
  schedule_type,
  appointment_history,
}) {
  const { appointments, setAppointments } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const { type } = useContext(AppContext);

  const [clickNotes, setClickNotes] = useState(false);
  const [finish, setFinish] = useState(false);
  const [Diagnosis, setDiagnosis] = useState("");
  const [Therapeutic_Description, setTherapeutic_Description] = useState("");
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);

  const main_color = "#288771";
  let obj = {
    number: number,
    users_id: users_id,
    doctor_id: doctor_id,
    date: date,
    time: time,
    name_patient: name_patient,
    age: age,
    gender: gender,
    phone_number: phone_number,
    notes: notes,
    diagnosis: diagnosis,
    therapeutic: therapeutic,
    patient_image: patient_image,
    doc_name: doc_name,
    doc_image: doc_image,
    specialization1: specialization1,
    date_now: date_now,
    schedule_type: schedule_type,
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
      phone_number,
      notes,
      Diagnosis,
      Therapeutic_Description,
      patient_image,
      doc_name,
      doc_image,
      specialization1
      // date_now
    ).then(async () => {
      await deleteAppointment(users_id, doctor_id).then((res) => {
        console.log("its ok");
        if (CurrentUser.user.is_admin == "yes") {
          getAllAppointment().then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        } else if (CurrentUser.user.is_doctor == "yes") {
          getAppointment_by_doc_id(doctor_id, date).then((res) => {
            console.log(res);
            if (res.status !== "failed") setAppointments(res);
            else setAppointments([]);
            console.log(appointments);
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
      } else if (CurrentUser.user.is_doctor == "yes") {
        get_History_Apps_for_Doctor(doctor_id, date_value).then((res) => {
          console.log(res);
          if (res.status !== "failed") setAppointments_History(res);
          else setAppointments_History([]);
    
          console.log(" date: ", date);
          console.log(appointments_History);
        });
        } else {
          get_History_Apps_for_User(users_id).then((res) => {
            res.status != "failed" ? setAppointments(res) : setAppointments([]);
          });
        }
    });
  };

  // const Finish = async () => {
  //   await insertAppointment_toHistory(
  //     users_id,
  //     doctor_id,
  //     date,
  //     time,
  //     name_patient,
  //     age,
  //     gender,
  //     notes,
  //     doc_name,
  //     image,
  //     specialization1
  //   ).then(
  //     await deleteAppointment(users_id, doctor_id).then((res) => {
  //       console.log("its ok");
  //       if (CurrentUser.user.is_admin == "yes") {
  //         getAllAppointment().then((res) => {
  //           res.status != "failed" ? setAppointments(res) : setAppointments([]);
  //         });
  //       } else {
  //         getAppointment_for_Doctor(doctor_id).then((res) => {
  //           console.log(res);
  //           res.status != "failed" ? setAppointments(res) : setAppointments([]);
  //         });
  //       }
  //     })
  //   );
  // };

  return is_doctor == "no" ? (
    <TouchableOpacity
      onPress={() => navigation.navigate("Appointment2", { obj })}
    >
      <View style={styles.card}>
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
        clickable={false}
        // onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
      >
        <View>
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

            {!appointment_history ? (
              <Icon4
                onPress={() => {
                  setFinish(true);
                  setClickNotes(true);
                }}
                name={"marker"}
                size={25}
                color={main_color}
                style={{ alignSelf: "flex-end" }}
              />
            ) : (
              <Icon2
                onPress={() => {
                  setFinish(true);
                  setClickNotes(true);
                }}
                name={"trash"}
                size={25}
                color={main_color}
                style={{ alignSelf: "flex-end" }}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "35%" }}>
              <Image
                source={
                  patient_image
                    ? { uri: patient_image }
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
                numberOfLines={1}
                ellipsizeMode="tail"
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
                Phone: {phone_number}
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
                    width: "60%",
                    // alignSelf: "center",
                  }}
                >
                  Age : {age}
                </Text>
                {!appointment_history ? (
                  <TouchableOpacity onPress={() => setClickNotes(true)}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginVertical: 5,
                        color: main_color,
                        marginTop: 10,
                        marginHorizontal: 15,
                        // alignSelf: "center",
                        // width: "45%",
                      }}
                    >
                      {"Notes"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setFinish(true);
                      setClickNotes(true);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginVertical: 5,
                        color: main_color,
                        marginTop: 10,
                        marginHorizontal: 15,
                        // alignSelf: "center",
                        // width: "45%",
                      }}
                    >
                      {"Report"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        {!finish ? (
          <TouchableOpacity onPress={() => setClickNotes(false)}>
            <View style={{ backgroundColor: main_color, minHeight: 200 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginVertical: 5,
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
                    fontSize: 15,
                    marginVertical: 5,
                    color: "white",
                    marginHorizontal: 10,
                    textAlign: "justify",
                    // fontWeight: "bold",
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
                    fontSize: 15,
                    // fontWeight: "bold",
                    marginVertical: 5,
                    color: "white",
                    marginTop: 50,

                    // marginHorizontal : 10,
                    alignSelf: "center",
                    justifyContent: "center",
                    // width: "45%",
                  }}
                >
                  {"No Notes"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            {!appointment_history ? (
              <View style={{ backgroundColor: "white", minHeight: 200 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon2
                    name={"arrow-left"}
                    size={30}
                    color={main_color}
                    onPress={() => {
                      setClickNotes(false);
                      setFinish(false);
                    }}
                    style={{ width: "40%", marginHorizontal: 10 }}
                  />
                  <Text
                    style={{
                      color: main_color,
                      fontSize: 15,
                      fontWeight: "bold",
                      marginVertical: 5,
                      marginTop: 10,
                      // textAlign : "center",
                      // marginHorizontal : 10,
                      // alignSelf: "center",
                      width: "45%",
                    }}
                  >
                    Report
                  </Text>
                  <TouchableOpacity onPress={() => Delete()}>
                    <Icon name={"carryout"} size={30} color={main_color} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    color: main_color,
                    fontSize: 15,
                    fontWeight: "bold",
                    marginVertical: 5,
                    marginTop: 10,
                    marginHorizontal: 5,
                    // marginHorizontal : 10,
                    // alignSelf: "center",
                    // width: "45%",
                  }}
                >
                  {"Diagnosis:"}
                </Text>
                <TextInput
                  style={[styles.inp, { height: height }]}
                  multiline
                  onContentSizeChange={(event) =>
                    setHeight(event.nativeEvent.contentSize.height)
                  }
                  value={Diagnosis}
                  onChangeText={setDiagnosis}
                  numberOfLines={10}
                  maxLength={250}
                  autoFocus
                />
                <Text
                  style={{
                    color: main_color,
                    fontSize: 15,
                    fontWeight: "bold",
                    marginVertical: 5,
                    marginTop: 10,
                    marginHorizontal: 5,
                    // marginHorizontal : 10,
                    // alignSelf: "center",
                    // width: "45%",
                  }}
                >
                  {"Therapeutic description:"}
                </Text>
                <TextInput
                  style={[styles.inp, { height: height2 }]}
                  multiline
                  onContentSizeChange={(event) =>
                    setHeight2(event.nativeEvent.contentSize.height)
                  }
                  value={Therapeutic_Description}
                  onChangeText={setTherapeutic_Description}
                  numberOfLines={10}
                  maxLength={250}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => setClickNotes(false)}>
                <View style={{ backgroundColor: main_color, minHeight: 200 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginBottom: 5,
                      marginTop: 10,
                      // textAlign : "center",
                      // marginHorizontal : 10,
                      alignSelf: "center",
                      // width: "45%",
                    }}
                  >
                    Report
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginBottom: 5,
                      marginTop: 10,
                      marginHorizontal: 5,
                      // marginHorizontal : 10,
                      // alignSelf: "center",
                      // width: "45%",
                    }}
                  >
                    {"Diagnosis:"}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginHorizontal: 20,
                      textAlign: "justify",
                    }}
                  >
                    {diagnosis}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginHorizontal: 5,
                      marginBottom: 5,
                      marginTop: 10,
                      // marginHorizontal : 10,
                      // alignSelf: "center",
                      // width: "45%",
                    }}
                  >
                    {"Therapeutic description:"}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginHorizontal: 20,
                      textAlign: "justify",
                    }}
                  >
                    {therapeutic}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    height: 150,
    marginVertical: 10,
  },
  inp: {
    width: "95%",
    height: 40,
    borderWidth: 0.5,
    borderColor: "#288771",
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
    // fontStyle: "italic",
    padding: 10,
    color: "#000000",
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
