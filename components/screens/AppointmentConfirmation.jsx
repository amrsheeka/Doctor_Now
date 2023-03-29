import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, FlatList } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const AppointmentConfirmation = ({ navigation, route }) => {
    let Days = ["Monday", "Friday", "Sunday", "Tuesday", "Wednesday", "Thursday", "Saturday"]
    let item = route.params.doctor;
    let image = item.image;
    const renderDays = ({ item }) => (
        <TouchableOpacity>
            <Text style={{ paddingHorizontal: 10, fontSize: 20, borderWidth: 1, borderRadius: 3, height: "20%", marginHorizontal: 10 }} >
                {item}
            </Text></TouchableOpacity>
    )
    // let item = { id: 1, name: 'Dr. John Doe', photo: require('../assets/Herbal_Medicine_Male_Avatar.png') }
    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <Text style={styles.heading}>Appointment</Text>

            </View>
            <View style={styles.header}>
                <Image source={image ? { uri: image } : require("../assets/Herbal_Medicine_Male_Avatar.png")} style={styles.cardPhoto} />
                <View>
                    <Text style={styles.text1}> {item.name}</Text>
                    <Text style={styles.text2}> {item.describtion}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.box}>
                    <Text style={styles.text}>Patients</Text>
                    <Text style={styles.text}>1600</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Experience</Text>
                    <Text style={styles.text}>5 Years</Text>

                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Review</Text>
                    <TouchableOpacity>
                        <Text style={styles.text}>3.00 K</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text3}>Biography  </Text>

                    <ScrollView  >
                        <Text style={styles.inp} numberOfLines={10}>
                            Doctors, also known as physicians,
                            are licensed health professionals who maintain and restore human health through the practice of medicine.
                            They examine patients, review their medical history, diagnose illnesses or injuries,
                            administer treatment,
                            and counsel patients on their health and well-being.
                        </Text>
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text3}>
                        Working Hours
                    </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.box}>
                        <Text style={styles.text}>10:00 PM</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>8:00 PM</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>6:00 PM</Text>
                    </View>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={styles.text3}>
                        Working Days
                    </Text>
                    <View style={styles.body}>
                        <View style={styles.box1}>
                            <Text style={styles.text4}>Sun</Text>
                            <Text style={styles.text4}>20</Text>

                        </View>
                        <View style={styles.box1}>
                            <Text style={styles.text4}>Wen</Text>
                            <Text style={styles.text4}>13</Text>

                        </View>
                        <View style={styles.box1}>
                            <Text style={styles.text4}>Mon</Text>
                            <Text style={styles.text4}>5</Text>

                        </View>
                    </View>
                    {/* <FlatList
                        data={Days}
                        renderItem={renderDays}
                        keyExtractor={(item, index) => (index)}
                        horizontal ={true}
                    /> */}
                </View>
                {/* <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 10 }}>

                    <TouchableOpacity style={{ flexDirection: "row", alignContent: "space-between", padding: 10 }} onPress={() => navigation.navigate("Chatbox")}>
                    <Ionicons name="ios-chatbubble-ellipses-outline" size={50} color="black" />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 20 }}>
                        <Button color={"#288771"} title="Book Appointment"
                            onPress={() => navigation.navigate("Details_user_to_appointment", { item })}
                    >
                    </Button>
                    </View></View> */}
                <View style={{ flexDirection: "row", marginHorizontal: 10, height: "17%" }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Chatbox")}>
                        <Ionicons name="ios-chatbubble-ellipses-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Details_user_to_appointment", { item })}>
                        <Text style={styles.buttonText}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },
    header: {
        flex: 2,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        // marginVertical: 6,
        margin: 5,
        padding: 10
    },
    header1: {
        marginBottom: 10,
        paddingTop: 20
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    body: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footer: {
        flex: 5,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    text: {
        paddingLeft: 10,
        fontSize: 18,
        textAlign: "center"
    },
    text1: {
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    text3: {
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: "bold",
        // padding:10
    },
    text2: {
        paddingLeft: 5,
        fontSize: 16,
        // fontWeight:"bold",
        textAlign: "justify",

    },
    text4: {
        paddingLeft: 10,
        fontSize: 18,
        textAlign: "center"
    },
    cardPhoto: {
        width: "40%",
        height: "80%",
        borderRadius: 10

    },
    box: {
        height: "80%",
        width: "32%",
        borderWidth: 3,
        borderColor: "#efefef",
        borderRadius: 10,
        backgroundColor: "#ffffff",
    },
    box1: {
        height: "60%",
        width: "32%",
        borderWidth: 3,
        borderColor: "#efefef",
        borderRadius: 10,
        backgroundColor: "#ffffff",
    },
    titleText: {
        fontSize: 20,
        //paddingBottom: 7
    },
    button: {
        fontSize: 18,
        paddingHorizontal: "5%",
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "#ffffff",
        backgroundColor: "#288771",
        justifyContent: "center",
        height: "100%",
        width: "20%"
    },
    inp: {
        borderRadius: 10,
        borderColor: "#efefef",
        borderWidth: 3,
        fontSize: 15,
        padding: 10,
        width: "100%",
        backgroundColor: "#efefef",

    },
    button1: {
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#ffffff",
        backgroundColor: "#288771",
        justifyContent: "center",
        height: "100%",
        width: "80%",
        left: 10
    },
    buttonText: {
        textAlign: "center",
        color: "white"
    }
});

export default AppointmentConfirmation;
