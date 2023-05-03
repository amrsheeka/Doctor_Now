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
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [specialty1, setSpecialty1] = useState("");
    const [specialty2, setSpecialty2] = useState("");
    const [type, setType] = useState("Doctor");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [password, setPassword] = useState("");
    const [start, setStart] = useState("9:30 PM");
    const [end, setEnd] = useState("11:00 PM");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
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
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
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
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}>
                            Doctor Password
                        </Text>
                        <TextInput
                            placeholder="Enter The Doctor Password"
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
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
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                            Doctor Price
                        </Text>
                        <TextInput
                            placeholder="Enter the Price of Doctor"
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => {
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
                }}>
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

