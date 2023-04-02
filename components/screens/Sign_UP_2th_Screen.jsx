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
import { ScrollView } from "react-native";
const Sign_UP_2th_Screen = ({ navigation }) => {
    const [phone, setphone] = useState("");
    const [name, setname] = useState("");
    const [address2, setaddress2] = useState("");
    const [address, setaddress] = useState("");
    const [age, setAge] = useState("");
    const [nameErr, setnameErr] = useState("");
    const handle_To_go_next_Screen = () => {
        if (!name) {
            if (!name) {
                setnameErr("Enter your your name.");
            } else {
                setnameErr("");
            }
        } else {
            navigation.navigate("SignUpScreen", { name, phone, address, address2, age });
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView style={{ paddingHorizontal: "10%" }} >
                
                <View style={styles.icon}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.Go_Back}>
                        <View style={{display:"flex",alignItems:"flex-start"}}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                            <Text >back</Text>
                        </View>
                        <View style={styles.textContainer}>
                        <Text>Already have account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableOpacity>
                    <Image source={require("../assets/splash.png")} />
                    <View>
                        <Text style={styles.greeting}>Fill your Information</Text>
                    </View>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handle_To_go_next_Screen()}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#fafafa",



    },
    Go_Back: {
        flexDirection: "row",
    },
    picker: {
        //paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#efefef",
    },
    greeting: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    inputContainer: {
        //width: "80%",
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
        marginTop: 20,
        //justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: "23%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#288771",
    },
    buttonOutline: {
        backgroundColor: "white",
        //marginTop: 5,
        borderColor: "#288771",
        borderWidth: 2,
    },
    buttonText: {
        flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    buttonOutlineText: {
        color: "#288771",
        fontSize: 16,
        fontWeight: "700",
    },
    textContainer: {
        flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
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
