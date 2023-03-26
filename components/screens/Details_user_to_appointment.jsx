import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "react-native";
const Details_user_to_appointment = ({ navigation, route }) => {
    // let item = { id: 1, name: 'Dr. John Doe', photo: require('../assets/Herbal_Medicine_Male_Avatar.png') }
    const [text, onChangeText] = useState("")
    const [text2, onChangeText2] = useState("")
    const ages = ["15+", "25+", "35+", "45+"]
    const [gender, setGender] = useState('Unknown');
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.header}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={"Enter Full Name"}
                />
                <Text style={styles.text}>Select Your Age</Text>
                <View style={styles.Bigbox}>
                    {ages.map((element, idx) => (
                        <View key={idx} style={styles.Smallbox}>
                            <TouchableOpacity >
                                <Text>{element}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View>
                    <Text style={styles.text}>Gender</Text>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value, index) => setGender(value)}
                        mode="dropdown" // Android only
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
                    <Text style={styles.text}>Add Nodes </Text>
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
                                placeholder={"don't exceed  600 characters . . . "}
                            />
                        </View>
                    </KeyboardAvoidingView>
            </View>
            <View style={styles.footer}>
                <Button title="NEXT" color={"#288771"}
                    onPress={() => navigation.navigate("Thk", {route})}
                 ></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 2,
        borderRadius: 10,
        elevation: 6,
        backgroundColor: '#e0dcdc',
        marginHorizontal: 4,
        marginVertical: 6
    },
    body: {
        flex: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: '#a09b9b',
        flexDirection: "column",
        justifyContent: "space-between",
    },
    footer: {
        flex: 1,
        borderRadius: 10,
        elevation: 6,
        backgroundColor: '#dcd7d7',
        marginHorizontal: 4,
        marginVertical: 6,
        paddingHorizontal:40,
        paddingVertical:10
    },
    text: {
        fontSize: 15,
        height: 40,
        margin: 12,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderColor: "#288771"
    },
    Bigbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginHorizontal: 10,
        paddingHorizontal: 10
    },
    Smallbox: {
        borderWidth: 2,
        borderRadius: 9,
        paddingHorizontal: 10,
        borderColor: "#288771"
    },
    picker: {
        marginHorizontal: '10%',
        // width: '50%',
        padding: 15,
        borderWidth: 2,
        borderColor: "#288771",
        // color: "#000"
    },
    input2: {
        height: "70%",
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderColor: "#288771"
    },
    btn1:{
        fontSize: 18,
        paddingHorizontal:"40%",
        borderWidth: 2,
        borderColor: "#288771",
        justifyContent: "center",
    }
});

export default Details_user_to_appointment;
