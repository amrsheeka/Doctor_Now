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
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
const AddDoctor = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [name, setName] = useState("");
    const [nameerr, setNameErr] = useState("");
    const [image, setImage] = useState("");
    const [specialty1, setSpecialty1] = useState("");
    const [specialty2, setSpecialty2] = useState("");
    const [type, setType] = useState("Doctor");
    const [description, setDescription] = useState("");
    const [descriptionerr, setDescriptionErr] = useState("");
    const [title, setTitle] = useState("");
    const [titleerr, setTitleErr] = useState("");
    const [address, setAddress] = useState("");
    const [addresserr, setAddressErr] = useState("");
    const [price, setPrice] = useState("100");
    const [priceerr, setPriceErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [start, setStart] = useState("9:30 PM");
    const [end, setEnd] = useState("11:00 PM");
    async function handleNext() {
        if (!email || !ValidateEmail(email) || password.length <= 8 ||
            !ValidatePassword(password) || !name || !type || !title ||
            !address || !price || !password || !description) {
            if (!email) {
                setEmailErr("Enter an email.");
            } else if (!ValidateEmail(email)) {
                setEmailErr(
                    "The email address should have the format: (user@example.com)."
                );
            } else {
                setEmailErr("");
            }
            if (!name) {
                setNameErr("Enter the doctor's name.");
            } else {
                setNameErr("");
            }
            if (!password) {
                setPasswordErr("Enter your password.");
            } else if (password.length <= 8) {
                setPasswordErr("password should be greater than 7 letters.");
            } else if (!ValidatePassword(password)) {
                setPasswordErr(
                    "password should have at least one letter and one number"
                );
            } else {
                setPasswordErr("");
            }
            if(!address){
                setAddressErr("Enter the doctor's address.");
            }else{
                setAddressErr("");
            }
            if(!title){
                setTitleErr("Enter the doctor's speciality");
            }else{
                setTitleErr("");
            }
            if(!description){
                setDescriptionErr("Enter the doctor's describtion");
            }else{
                setDescriptionErr("");
            }
            if(!price){
                setPriceErr("Enter the doctor's describtion");
            }
        }
        else {
            navigation.navigate("MapSelect",
                {
                    email: email,
                    name: name,
                    image: image,
                    specialization1: specialty1,
                    specialization2: specialty2,
                    title: title,
                    title1: type,
                    describtion: description,
                    address: address,
                    price: price,
                    password: password,
                    start: start,
                    end: end,
                    x_coordnate: "",
                    y_coordnate: ""
                }
            )
        }
    }
    function ValidateEmail(x) {
        let input = "";
        input = x;
        var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (input.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }
    function ValidatePassword(x) {
        let input = "";
        input = x;
        var validRegex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;

        if (input.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.Go_Back}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        <Text >back</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.icon}>
                    <Image source={require("../assets/splash.png")} />
                </View>
                <View style={styles.icon}>
                    <Text style={styles.greeting}>Add Doctor</Text>
                </View>
            </View>

            <View style={styles.body}>
                <ScrollView >
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}>
                            Doctor Email
                        </Text>
                        <TextInput
                            placeholder="Enter The Doctor Email"
                            keyboardType="email-address"
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={{ color: "red" }}>{emailErr}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}>
                            Doctor Name
                        </Text>
                        <TextInput
                            placeholder="Enter The Doctor Name"
                            style={styles.input}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <Text style={{ color: "red" }}>{nameerr}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}>
                            Doctor Password
                        </Text>
                        <TextInput
                            placeholder="Enter The Doctor Password"
                            keyboardType="visible-password"
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Text style={{ color: "red" }}>{passwordErr}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                            Doctor Address
                        </Text>
                        <TextInput
                            placeholder="Enter The Doctor Address"
                            style={styles.input}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        <Text style={{ color: "red" }}>{addresserr}</Text>
                    </View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        Doctor specialty
                    </Text>
                    <Picker
                        selectedValue={title}
                        onValueChange={(value, index) => setTitle(value)}
                        mode="dropdown"
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Specialization" value="" />
                        <Picker.Item label="Pulmonologist" value="Pulmonologist" />
                        <Picker.Item label="Psychiatrist" value="Psychiatrist" />
                        <Picker.Item label="Internist" value="Internist" />
                        <Picker.Item label="Hematologist" value="Hematologist" />
                        <Picker.Item label="Plastic Surgeon" value="Plastic Surgeon" />
                        <Picker.Item label="Cardiologist" value="Cardiologist" />
                        <Picker.Item label="Neurosurgeon" value="Neurosurgeon" />
                        <Picker.Item label="Endocrinologist" value="Endocrinologist" />
                        <Picker.Item label="ENT Doctor" value="ENT Doctor" />
                        <Picker.Item label="Infertility Specialist" value="Infertility Specialist" />
                        <Picker.Item label="Andrologist" value="Andrologist" />
                    </Picker>
                    <Text style={{ color: "red" }}>{titleerr}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                            Doctor Specialization 1
                        </Text>
                        <TextInput
                            placeholder="Enter the specialty 1 of Doctor"
                            style={styles.input}
                            value={specialty1}
                            onChangeText={(text) => setSpecialty1(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                            Doctor Specialization 2
                        </Text>
                        <TextInput
                            placeholder="Enter the specialty 2 of Doctor"
                            style={styles.input}
                            value={specialty2}
                            onChangeText={(text) => setSpecialty2(text)}
                        />
                    </View>

                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        Service Type
                    </Text>
                    <Picker
                        selectedValue={type}
                        onValueChange={(value, index) => setType(value)}
                        mode="dropdown"
                        style={styles.picker}
                    >
                        <Picker.Item label="Doctor" value="Doctor" />
                        <Picker.Item label="Center" value="Center" />
                    </Picker>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                            Doctor Describtion
                        </Text>
                        <TextInput
                            placeholder="Enter the description of Doctor"
                            style={styles.input}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <Text style={{ color: "red" }}>{descriptionerr}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                            Doctor Price
                        </Text>
                        <TextInput
                            placeholder="Enter the Price of Doctor"
                            keyboardType="number-pad"
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        />
                        <Text style={{ color: "red" }}>{priceerr}</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => { handleNext() }}>
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
        padding: 20
    },
    header: {
        flex: 3,
    },
    Go_Back: {
        marginTop: 15,
        width: "10%"
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
        flex: 1
    },
    body: {
        flex: 6,
        flexDirection: "column",
        justifyContent: "center"
    }
});

export default AddDoctor;

