
import { memo } from "react";
import { useState,useEffect } from "react";
import { View, Text, Button, TextInput,StyleSheet} from "react-native";

const Update_patient=({navigation,route})=> {
    let obj = { image: route.params.image, date: route.params.date, time: route.params.time, name_patient: route.params.name_patient, doc_name: route.params.doc_name, gender: route.params.gender, notes: route.params.notes, date_now: route.params.date_now, specialization1: route.params.specialization1, doctor_id: route.params.doctor_id, users_id: route.params.users_id }
    const [name_patient1, setName_patient] = useState("")
    const [gender1, setGender] = useState("")
    const [notes1, setNotes] = useState("")
    useEffect(() => {
        console.log(route.params)
        setName_patient(route.params.name_patient)
        setGender(route.params.gender)
        setNotes(route.params.notes)
    }, [])
    const HandleUpdate=()=>{
      //write y 3m 3sam
        navigation.navigate("Appointment")
    }
    return (
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center",padding:20 }}>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    name_patient1
                </Text>
                <TextInput
                    placeholder="Enter Your Name"
                    style={styles.input}
                    value={name_patient1}
                    onChangeText={(text) => setName_patient(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Gender
                </Text>
                <TextInput
                    placeholder="Enter Your Gender"
                    style={styles.input}
                    value={gender1}
                    onChangeText={(text) => setGender(text)}
                />
            </View> 
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Enter Notes
                </Text>
                <TextInput
                    placeholder="Enter Your Name"
                    style={styles.input}
                    value={notes1}
                    onChangeText={(text) => setNotes(text)}
                />
            </View>
            <Button title="Confirm" color={"#288771"} onPress={HandleUpdate} ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
});
export default memo(Update_patient);
