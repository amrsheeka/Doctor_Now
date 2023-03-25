import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, FlatList } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AppointmentConfirmation = ({ navigation, route }) => {
    let Days = ["Monday", "Friday", "Sunday", "Tuesday", "Wednesday", "Thursday", "Saturday"]
    let item = route.params.doctor;
    let image = item.image;
    const renderDays = ({item}) => (
        <TouchableOpacity>
            <Text style={{ paddingHorizontal: 10, fontSize: 20, borderWidth: 1, borderRadius: 3, height: "20%", marginHorizontal: 10 }} >
                {item}
            </Text></TouchableOpacity>
    )
    // let item = { id: 1, name: 'Dr. John Doe', photo: require('../assets/Herbal_Medicine_Male_Avatar.png') }
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={styles.header}>
                <Text style={styles.text}> {item.name}</Text>
                <Image source={image?{uri: image}:require("../assets/Herbal_Medicine_Male_Avatar.png")} style={styles.cardPhoto} />
            </View>
            <View style={styles.body}>
                <View style={styles.box}>
                    <AntDesign style={{ paddingLeft: 20 }} name="barschart" size={24} color="black" />
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
                    <Text style={styles.titleText}>Biography : </Text>
                    <ScrollView  >
                        <Text style={{ borderRadius: 5, borderColor: "#030303", borderWidth: 1, fontSize: 15 }} numberOfLines={10}>
                            Doctors, also known as physicians,
                            are licensed health professionals who maintain and restore human health through the practice of medicine.
                            They examine patients, review their medical history, diagnose illnesses or injuries,
                            administer treatment,
                            and counsel patients on their health and well-being.
                        </Text>
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>
                        Working Hours
                    </Text>
                    <Text style={{ justifyContent: "center", paddingHorizontal: 10, fontSize: 16 }}>From 8:00 AM To 8:00 PM </Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={styles.titleText}>
                        Working Days
                    </Text>
                    <FlatList
                        data={Days}
                        renderItem={renderDays}
                        keyExtractor={(item, index) => (index)}
                        horizontal ={true}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 10 }}>

                    <TouchableOpacity style={{ flexDirection: "row", alignContent: "space-between", padding: 10 }} onPress={() => navigation.navigate("Chatbox")}>
                        <Entypo name="chat" size={24} color="black" />
                        <Text style={styles.text}>Chat Now !</Text>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 20 }}>
                        <Button color={"#288771"} title="Book Appointment"
                        onPress={() => navigation.navigate("Appointment", navigation={navigation})}
                    >
                    </Button>
                    </View></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 2,
        borderRadius: 10,
        elevation: 6,
        backgroundColor: '#f0ebeb',
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    body: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footer: {
        flex: 5,
        borderRadius: 10,
        elevation: 6,
        backgroundColor: '#f0ebeb',
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    text: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 10,
    },
    cardPhoto: {
        marginHorizontal: 10,
        marginVertical: 5,
        width: 150,
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    box: {
        height: "80%",
        width: "32%",
        borderWidth: 1,
        borderStyle: "dotted",
        backgroundColor: '#ded7d7'
    }, titleText: {
        fontSize: 20,
        paddingBottom: 7
    },
});

export default AppointmentConfirmation;
