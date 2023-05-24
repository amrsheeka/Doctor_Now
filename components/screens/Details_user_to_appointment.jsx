import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  // TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Fontisto";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "react-native";
import {
  getAppointment_by_doc_id,
  insertAppointment,
} from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { AppContext } from "../consts/AppContext";
import { getAppointment } from "../../database/Users";
import getTimeList from "../../database/getTimeList";
import { updateSchedule } from "../../database/Doctors";
const Details_user_to_appointment = ({ navigation, route }) => {
  const { appointments, setAppointments } = useContext(AppContext);
  const { timeList, setTimeList } = useContext(AppContext);
  const [full_name, setFull_name] = useState(CurrentUser.user.name);
  const [age, setAge] = useState(CurrentUser.user.age);
  const [phone_number, setPhone_number] = useState(CurrentUser.user.phone);
  const [gender, setGender] = useState(CurrentUser.user.gender);
  const [notes, setNotes] = useState("");
  const [height, setHeight] = useState(0);
  const [male_radio, setMale_radio] = useState("checked");
  const [female_radio, setFemale_radio] = useState("unchecked");
  const [name_err, setName_err] = useState("");
  const [age_err, setAge_err] = useState("");
  const [phone_err, setPhone_err] = useState("");
  const { night } = useContext(AppContext);
  const { length, setLength } = useContext(AppContext);
  const main_color = "#288771";
  const patient_image = CurrentUser.user.image;
  let doc = route.params.item;
  let id = CurrentUser.user.id;

  const handleInsertAppointment = async () => {
    if (!full_name) {
      setName_err("Enter your name.");
    } else if (full_name.length < 10) {
      setName_err("Enter your full name, at least 10 letters");
    } else {
      setName_err("");
    }

    if (!age) {
      setAge_err("Enter your age.");
    } else if (age < 15) {
      setAge_err("you should older than 15 years old");
    } else if (age > 70) {
      setAge_err("you should younger than 70 years old");
    } else {
      setAge_err("");
    }

    if (!phone_number) {
      setPhone_err("Enter your phone number.");
    } else if (phone_number.length != 11 || !phone_number.startsWith("01")) {
      setPhone_err("Enter correct phone number.");
    } else {
      setPhone_err("");
    }

    if (
      full_name.length >= 10 &&
      age >= 15 &&
      age <= 70 &&
      phone_number.length == 11 &&
      phone_number.startsWith("01")
    ) {
      await insertAppointment(
        CurrentUser.user.id,
        doc.id,
        route.params.date,
        route.params.Time,
        full_name,
        age,
        gender,
        phone_number,
        notes,
        patient_image,
        doc.name,
        doc.image,
        doc.specialization1
      ).then((response) => {
        console.log(response);
        if (response == "fail") {
          alert("fail");
        } else {
          // alert("success");
          console.log("its ok");
          navigation.navigate("Thk", { doc });
          getAppointment(id).then((res) => {
            res.status != "failed"
              ? setAppointments(res)
              : setAppointments(appointments);
          });
          var timeList1 = getTimeList(doc.start, doc.end);
          getAppointment_by_doc_id(doc.id, new Date().toDateString()).then(
            (res) => {
              res.status != "failed"
                ? res.map((e) => {
                    timeList1 = timeList1.filter(
                      (ele) => ele !== e.time.toString()
                    );
                  })
                : setTimeList(timeList1);
              setTimeList(timeList1);
            }
          );
        }
      });
      setLength(length - 1);
      // console.log(CurrentUser.user.age)
    }
  };

  const click_male = () => {
    setMale_radio("checked");
    setFemale_radio("unchecked");
    setGender("male");
  };
  const click_female = () => {
    setMale_radio("unchecked");
    setFemale_radio("checked");
    setGender("female");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.label}> Appointment </Text>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          <View style={[styles.content, { marginTop: 10 }]}>
            <View style={[styles.icon]}>
              <Image
                source={
                  doc.image
                    ? { uri: doc.image }
                    : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
                }
                // defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")}
                style={{ height: 100, width: 100, borderRadius: 75 }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={[{ textAlign: "center", fontSize: 16 }]}>
                {doc.title1} {doc.name}
              </Text>
              <Text style={[{ textAlign: "center", fontSize: 16 }]}>
                {doc.title}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                alignItems: "center",
                // marginHorizontal: 5,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              style={{ marginVertical: 10, marginRight: 10 }}
              name={"wallet"}
              size={30}
              color={main_color}
            />
            <Text style={{ color: "black", width: "70%" }}> Fees</Text>
            <Text style={{ color: "black" }}>
              {" "}
              {doc.price} {"EGP"}
            </Text>
          </View>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                alignItems: "center",
                // marginHorizontal: 5,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              style={{ marginVertical: 10, marginRight: 10 }}
              name={"calendar"}
              size={30}
              color={main_color}
            />

            <Text style={{ color: "black", width: "70%" }}> Date </Text>
            <View>
              {route.params.date == new Date().toDateString() ? (
                <Text style={{ color: main_color, marginLeft: 20 }}>
                  {"Today"}
                </Text>
              ) : route.params.date ==
                new Date(new Date().getDate() + 1).toDateString() ? (
                <Text style={{ color: main_color }}>{"Tomorrow"}</Text>
              ) : (
                <Text style={{ color: main_color, marginLeft: 25 }}>
                  {route.params.date.split(" ")[0]}
                </Text>
              )}
              <Text style={{ color: "black", marginLeft: 12 }}>
                {" "}
                {route.params.date.split(" ").slice(1, 3).join(" ")}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                alignItems: "center",
                // marginHorizontal: 5,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              style={{ marginVertical: 10, marginRight: 10 }}
              name={"clock"}
              size={30}
              color={main_color}
            />
            <Text style={{ color: "black", width: "70%" }}> Time </Text>

            <Text style={{ color: "black" }}> {route.params.time}</Text>
          </View>

          <View style = {styles.content}>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 5,
                  marginTop: 20,
                },
              ]}
            >
              <Icon3
                style={{ marginRight: 10 }}
                name={"info"}
                size={30}
                color={main_color}
              />
              <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
                {" "}
                Confirm Your Information{" "}
              </Text>
            </View>
            {/* <Text style={{ color: main_color ,alignSelf : "center", marginTop : 10, fontSize : 16 , fontBold: "bold"}}> Confirm Your Information</Text> */}
            <View style={{ paddingHorizontal: 25 }}>
              <TextInput
                label={"Full Name"}
                mode="outlined"
                style={{ marginTop: 30 }}
                value={full_name}
                onChangeText={setFull_name}
                outlineStyle={{
                  borderColor: main_color,
                  borderRadius: 10,
                }}
                left={
                  <TextInput.Icon
                    icon={() => <Icon name={"user"} size={25} />}
                  />
                }
                activeOutlineColor={main_color}
              />
              <Text style={{ color: "red" }}>{name_err}</Text>

              <TextInput
                label={"Age"}
                mode="outlined"
                value={age}
                keyboardType="number-pad"
                onChangeText={setAge}
                outlineStyle={{
                  borderColor: main_color,
                  borderRadius: 10,
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon2
                        name={"numeric-9-plus-box-multiple-outline"}
                        size={25}
                      />
                    )}
                  />
                }
                activeOutlineColor={main_color}
              />
              <Text style={{ color: "red" }}>{age_err}</Text>

              <TextInput
                label={"phone number"}
                mode="outlined"
                value={phone_number}
                keyboardType="number-pad"
                onChangeText={setPhone_number}
                outlineStyle={{
                  borderColor: main_color,
                  borderRadius: 10,
                }}
                left={
                  <TextInput.Icon
                    icon={() => <Icon name={"phone"} size={25} />}
                  />
                }
                activeOutlineColor={main_color}
              />
              <Text style={{ color: "red" }}>{phone_err}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  //   marginLeft: 10,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    // fontWeight: "bold",
                    marginRight: 15,
                  }}
                >
                  {" "}
                  Gender:{" "}
                </Text>
                <RadioButton
                  status={male_radio}
                  color={main_color}
                  value="male"
                  uncheckedColor="black"
                  onPress={click_male}
                />
                <Text
                  style={{
                    color: "black",
                    paddingBottom: 3,
                    width: "35%",
                    // paddingHorizontal: 5,
                  }}
                >
                  Male
                </Text>
                <RadioButton
                  status={female_radio}
                  color={main_color}
                  value="female"
                  uncheckedColor="black"
                  onPress={click_female}
                />
                <Text
                  style={{
                    color: "black",
                    paddingBottom: 3,
                    // paddingHorizontal: 5,
                  }}
                >
                  Female
                </Text>
              </View>

              <TextInput
                label={"Explain your problem"}
                mode="outlined"
                value={notes}
                //  keyboardType="number-pad"
                onChangeText={setNotes}
                outlineStyle={{
                  borderColor: main_color,
                  borderRadius: 10,
                }}
                multiline
                activeOutlineColor={main_color}
              />

              <Text style={{ alignSelf: "flex-end", marginTop: 10 }}>
                {notes.length} / 250
              </Text>
            </View>
          </View>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: main_color,
                width: "90%",
                borderRadius: 10,
                height: 45,
                marginTop: 30,
                marginBottom: 5,
              }}
              onPress={() => handleInsertAppointment()}
            >
              <Text
                style={{ alignSelf: "center", color: "white", marginTop: 10 }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#288759" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
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
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    // shadowColor: "#000",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 5,
    padding: 7,

    marginVertical: 7,
    marginHorizontal: 7,
  },
});

export default Details_user_to_appointment;

// <View style={[styles.container, night && styles.buttonDark]}>
//       <View style={[styles.header, night && styles.buttonDark]}>
//         <View style={styles.Go_Back1}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <View style={styles.Go_Back}>
//               <Ionicons name="arrow-back" size={24} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <Text style={styles.heading}>Appointment</Text>
//         </View>
//       </View>

//       <View style={styles.body}>
//         <ScrollView>

//           <View >
//             <Text style={[styles.text, night && styles.textdark]}>Full Name</Text>
//             <TextInput
//               style={[styles.input, night && styles.dark2]}
//               onChangeText={onChangeText}
//               value={text}
//               placeholder={"Enter Full Name"}
//             />
//             <Text style={{ color: "red" }}>{nameerr}</Text>
//             <Text style={[styles.text, night && styles.textdark]}>Select Your Age</Text>
//             <View>
//               <Picker
//                 selectedValue={age}
//                 onValueChange={(value, index) => setAge(value)}
//                 mode="dropdown"
//                 style={[styles.picker, night && styles.darklist]}
//               >
//                 <Picker.Item label="15+" value="15+" />
//                 <Picker.Item label="25+" value="25+" />
//                 <Picker.Item label="35+" value="35+" />
//                 <Picker.Item label="45+" value="45+" />
//               </Picker>
//             </View>
//             <View>
//               <Text style={[styles.text, night && styles.textdark]}>Gender</Text>
//               <Picker
//                 selectedValue={gender}
//                 onValueChange={(value, index) => setGender(value)}
//                 mode="dropdown"
//                 style={[styles.picker, night && styles.darklist]}
//               >
//                 <Picker.Item label="Male" value="Male" />
//                 <Picker.Item label="Female" value="Female" />
//               </Picker>
//             </View>
//           </View>
//           <View>
//             <View>
//               <Text style={[styles.text, night && styles.textdark]}>Compose Your Problem</Text>
//             </View>
//             <KeyboardAvoidingView enabled={true}>
//               <View>
//                 <TextInput
//                   style={[styles.input2, night && styles.dark2]}
//                   onChangeText={onChangeText2}
//                   value={text2}
//                   numberOfLines={10}
//                   multiline={true}
//                   maxLength={600}
//                   placeholder={"Don't exceed 600 characters..."}
//                 />
//               </View>
//             </KeyboardAvoidingView>
//           </View>
//         </ScrollView>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={[styles.button, night && styles.darklist]}
//           onPress={() => handleInsertAppointment()}
//         >
//           <Text style={styles.buttonText}>NEXT</Text>
//         </TouchableOpacity>
//       </View>
//     </View>

// container: {
//   flex: 1,
//   // padding: 20,
//   backgroundColor: "#ffffff",
// },
// header: {
//   flexDirection: "row",
//   width: "100%",
//   alignItems: "center",
//   justifyContent: "flex-start",
//   paddingVertical: 30,
//   backgroundColor: "#288771",
//   flex: 0.5
// },
// heading: {
//   fontSize: 24,
//   fontWeight: "bold",
//   color: "white",
// },
// Go_Back: {
//   width: "10%",
//   // left:1
// },
// Go_Back1: {
//   // marginTop:15,
//   width: "35%",
// },
// input: {
//   height: 50,
//   borderColor: "#ffffff",
//   borderWidth: 1,
//   borderRadius: 10,
//   paddingLeft: 10,
//   paddingRight: 10,
//   marginBottom: 10,
//   backgroundColor: "#efefef",
// },
// text: {
//   fontSize: 18,
//   fontWeight: "bold",
//   marginBottom: 10,
//   paddingTop: 10,
// },
// textdark: {
//   fontSize: 18,
//   fontWeight: "bold",
//   marginBottom: 10,
//   paddingTop: 10,
//   color: "white"
// },
// ageBox: {
//   flexDirection: "row",
//   flexWrap: "wrap",
// },
// ageItem: {
//   backgroundColor: "#f2f2f2",
//   borderRadius: 10,
//   padding: 10,
//   marginRight: 10,
//   marginBottom: 10,
//   width: "20%",
// },
// picker: {
//   height: 50,
//   margin: 12,
//   borderRadius: 10,
//   marginBottom: 10,
//   backgroundColor: "#efefef",
// },
// body: {
//   flex: 4,
// },

// input2: {
//   height: "70%",
//   margin: 12,
//   borderWidth: 2,
//   padding: 10,
//   borderColor: "#ffffff",
//   backgroundColor: "#efefef",
//   borderRadius: 10,
// },
// button: {
//   fontSize: 18,
//   paddingHorizontal: "20%",
//   borderWidth: 2,
//   borderRadius: 20,
//   borderColor: "#ffffff",
//   backgroundColor: "#288771",
//   justifyContent: "center",
//   height: 50,

// },
// buttonText: {
//   textAlign: "center",
//   color: "white"
// },
// buttonDark: {
//   backgroundColor: '#0D1E3D',
// },
// darklist: {
//   backgroundColor: '#142E5E',
//   borderWidth: 0,

// },
// dark2: {
//   backgroundColor: "#BDD3FF",
// },
// footer: {
//   flex:1,
// }
