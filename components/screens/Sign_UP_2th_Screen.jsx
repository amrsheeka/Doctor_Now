import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { sighnup } from "../../database/Users";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
const Sign_UP_2th_Screen = ({ navigation }) => {
    const [Is_a_doctor_or_user, set_Is_a_doctor_or_user] = useState("");
    const [phone, setphone] = useState("");
    const [name, setname] = useState("");
    const [address2, setaddress2] = useState("");
    const [address, setaddress] = useState("");
    const [age, setage] = useState("");
    const [nameErr, setnameErr] = useState("");
    const handle_To_go_next_Screen =  () => {
        if (!name) {
            if (!name) {
                setnameErr("Enter your your name.");
            } else {
                setnameErr("");
            }
        } else {
            navigation.navigate("SignUpScreen",{name,phone,address,address2,age,Is_a_doctor_or_user});
        }
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.Go_Back}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text>back</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.icon}>
                <Image source={require("../assets/splash.png")} />
            </View>

            <View>
                <Text style={styles.greeting}>Fill your Information</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Full Name
                </Text>
                <TextInput
                    placeholder="Enter Your Name"
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setname(text)}
                />
                <Text style={{ color: "red" }}>{nameErr}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Age
                </Text>
                <TextInput
                    placeholder="Enter Your Age"
                    style={styles.input}
                    value={age}
                    onChangeText={(text) => setage(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    address
                </Text>
                <TextInput
                    placeholder="Enter Your address"
                    style={styles.input}
                    value={address}
                    onChangeText={(text) => setaddress(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    address2
                </Text>
                <TextInput
                    placeholder="Enter Your address"
                    style={styles.input}
                    value={address2}
                    onChangeText={(text) => setaddress2(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    phone
                </Text>
                <TextInput
                    placeholder="Enter Your phone"
                    style={styles.input}
                    value={phone}
                    onChangeText={(text) => setphone(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>Act As ?</Text>
                <Picker
                    selectedValue={Is_a_doctor_or_user}
                    onValueChange={(value, index) => set_Is_a_doctor_or_user(value)}
                    mode="dropdown"
                    style={styles.picker}
                    >
                    <Picker.Item label="Select" value="Unknown" />
                    <Picker.Item label="User" value="User" />
                    <Picker.Item label="Doctor" value="doctor" />
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handle_To_go_next_Screen()}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text>Already have account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    Go_Back: {
        flexDirection: "row",
    },
    picker: {
        height: 50,
        margin: 12,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#efefef",
    },
    greeting: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    inputContainer: {
        width: "80%",
        marginTop: 20,
    },
    input: {
        backgroundColor: "#eceff1",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: "23%",
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#288771",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#288771",
        borderWidth: 2,
    },
    buttonText: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        color: "white",
    },
    buttonOutlineText: {
        color: "#288771",
        fontSize: 16,
        fontWeight: "700",
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    text: {
        fontSize: 15,
        color: "#288771",
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});

export default Sign_UP_2th_Screen;
