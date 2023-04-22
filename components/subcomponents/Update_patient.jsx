
import { memo } from "react";
import { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Update_Appointment, getAppointment } from "../../database/Users";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
const Update_patient = ({ navigation, route }) => {
  let obj = { image: route.params.image, date: route.params.date, time: route.params.time, name_patient: route.params.name_patient, doc_name: route.params.doc_name, gender: route.params.gender, notes: route.params.notes, date_now: route.params.date_now, specialization1: route.params.specialization1, doctor_id: route.params.doctor_id, users_id: route.params.users_id }
  const [name_patient1, setName_patient] = useState("");
  const [nameerr, setNameErr] = useState("");
  const [gender1, setGender] = useState("")
  const [notes1, setNotes] = useState("")
  const [age1, setAge] = useState("")
  const { appointments, setAppointments } = useContext(AppContext);
  useEffect(() => {
    setName_patient(obj.name_patient)
    setGender(obj.gender)
    setNotes(obj.notes)
    setAge(obj.age)

  }, [])
  const HandleUpdate = () => {
    if (!name_patient1) {
      setNameErr("Enter your your name.");
    } else{
      Update_Appointment(obj.users_id, obj.doctor_id, obj.date, obj.time, name_patient1, gender1, notes1, age1).then((res) => (
        console.log(res)
      )).then(() => {
        getAppointment(obj.users_id).then((res) => {
          console.log(res);
          setAppointments(res)
        })
        navigation.goBack();
      })
    }
    
  }

  //     return (
  //         <View style={{ flex: 1,justifyContent:"center",alignItems:"center",padding:20 }}>
  //             <View style={styles.inputContainer}>
  //                 <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
  //                     name_patient1
  //                 </Text>
  // <TextInput
  //     placeholder="Enter Your Name"
  //     style={styles.input}
  //     value={name_patient1}
  //     onChangeText={(text) => setName_patient(text)}
  // />
  //             </View>
  //             <View style={styles.inputContainer}>
  //                 <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
  //                     Gender
  //                 </Text>
  //                 <TextInput
  //                     placeholder="Enter Your Gender"
  //                     style={styles.input}
  //                     value={gender1}
  //                     onChangeText={(text) => setGender(text)}
  //                 />
  //             </View> 
  //             <View style={styles.inputContainer}>
  //                 <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
  //                     Enter Notes
  //                 </Text>
  //                 <TextInput
  //                     placeholder="Enter Your Name"
  //                     style={styles.input}
  //                     value={notes1}
  //                     onChangeText={(text) => setNotes(text)}
  //                 />
  //             </View>
  //             <Button title="Confirm" color={"#288771"} onPress={HandleUpdate} ></Button>
  //         </View>
  //     );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={styles.heading}>Edit Patient</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.text}>Patient Name</Text>
          <TextInput
            placeholder="Enter Your Name"
            style={styles.input}
            value={name_patient1}
            onChangeText={(text) => setName_patient(text)}
          />
          <Text style={{ color: "red" }}>{nameerr}</Text>
          <Text style={styles.text}>Select Your Age</Text>
          <View>
            <Picker
              selectedValue={age1}
              onValueChange={(value, index) => setAge(value)}
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item label="15+" value="15+" />
              <Picker.Item label="25+" value="25+" />
              <Picker.Item label="35+" value="35+" />
              <Picker.Item label="45+" value="45+" />
            </Picker>
          </View>
          <View>
            <Text style={styles.text}>Gender</Text>
            <Picker
              selectedValue={gender1}
              onValueChange={(value, index) => setGender(value)}
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.text}>Add Notes</Text>
          </View>
          <KeyboardAvoidingView enabled={true}>
            <View>
              <TextInput
                style={styles.input2}
                onChangeText={setNotes}
                value={notes1}
                numberOfLines={10}
                multiline={true}
                maxLength={600}
                placeholder={"Don't exceed 600 characters..."}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}


          onPress={HandleUpdate}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
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

    width: "10%",
    // left:1
  },
  Go_Back1: {
    // marginTop:15,
    width: "35%",


  },
  input: {
    height: 50,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 5,
  },
  ageBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ageItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    width: "20%",
  },
  picker: {
    height: 50,
    margin: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  body: {
    flex: 1,
  },

  input2: {
    height: "70%",
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: "#ffffff",
    backgroundColor: "#efefef",
    borderRadius: 10,
  },
  button: {
    fontSize: 18,
    paddingHorizontal: "40%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#ffffff",
    backgroundColor: "#288771",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default memo(Update_patient);
