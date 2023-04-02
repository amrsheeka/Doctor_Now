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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.Go_Back}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                            <Text >back</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text>Already have account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                    <Image source={require("../assets/splash.png")} />
                </View>
                <View style={styles.icon}>
                    <Text style={styles.greeting}>Fill your Information</Text>
                </View>
            </View>

            <View style={styles.body}>
                <ScrollView >
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold",justifyContent:"center",alignItems:"center" }}>
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
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
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
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
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
                </ScrollView>

            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => handle_To_go_next_Screen()}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding:20
    },
     header: {
        flex: 3,
    },
    Go_Back: {
    display:"flex",
    marginTop:15
    },
    picker: {
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#efefef",
    },
    greeting: {
        fontSize: 20,
        fontWeight: "bold",
    },
    inputContainer: {
        width: "100%",
    },
    input: {
        backgroundColor: "#eceff1",
        paddingVertical: 10,
        borderRadius: 10,
    },
    footer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 2
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
        borderColor: "#288771",
        borderWidth: 2,
    },
    buttonText: {
        flexDirection: "row",
        justifyContent: "center",
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
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 15,
        color: "#288771",
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 6,
        flexDirection: "column",
        justifyContent:"center"        
    }
});

export default Sign_UP_2th_Screen;
