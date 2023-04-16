import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "react-native";
import { getAppointment_by_doc_id, insertAppointment } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { AppContext } from "../consts/AppContext";
import { getAppointment } from "../../database/Users";
import getTimeList from "../../database/getTimeList";
const Details_user_to_appointment = ({ navigation, route }) => {
  const [text, onChangeText] = useState("");
  const { appointments, setAppointments } = useContext(AppContext);
  const { timeList, setTimeList } = useContext(AppContext)
  const [text2, onChangeText2] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Unknown");
  let doc = route.params.item
  let id = CurrentUser.user.id;
  const handleInsertAppointment = async () => {
    console.log(doc)
    await insertAppointment(CurrentUser.user.id, doc.id, route.params.date, route.params.Time, text, CurrentUser.user.age, CurrentUser.user.gender, text2, doc.name, doc.image, doc.specialization1).then(
      (res) => {
        
        console.log("its ok");
        getAppointment(id).then((res) => {
          setAppointments(res);
        })
        var timeList1 = getTimeList(doc.start, doc.end);
        getAppointment_by_doc_id(doc.id, new Date().toDateString()).then((res) => {
          console.log(res)
          res.map((e) => {
            timeList1 = timeList1.filter(ele => ele !== e.time.toString())
          })
          
          setTimeList(timeList1)
        }
        )
      }
    )
    // console.log(CurrentUser.user.age)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Appointment</Text>
      </View>
      <ScrollView>
      <View>
        <Text style={styles.text}>Full Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Enter Full Name"}
        />
        <Text style={styles.text}>Select Your Age</Text>
        <View>
          <Picker
            selectedValue={age}
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
            selectedValue={gender}
            onValueChange={(value, index) => setGender(value)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="Unknown" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Not Willing" value="NA" />
          </Picker>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.text}>Compose Your Problem</Text>
        </View>
        <KeyboardAvoidingView enabled={true}>
          <View>
            <TextInput
              style={styles.input2}
              onChangeText={onChangeText2}
              value={text2}
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


          onPress={() => handleInsertAppointment().then(navigation.navigate("Thk", { doc }))}
        >
          <Text style={styles.buttonText}>NEXT</Text>
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
    marginBottom: 10,
    paddingTop: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
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

export default Details_user_to_appointment;
