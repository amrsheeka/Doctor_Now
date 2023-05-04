import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { getAppointment_for_Doctor, get_History_Apps_for_Doctor, get_doc_by_email } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { AppContext } from "../consts/AppContext";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
const Appointments = () => {
    let email = CurrentUser.user.email

    const { appointments, setAppointments } = useContext(AppContext);
    const { type } = useContext(AppContext);
    useEffect(() => {
        if (type == "history") {
            get_doc_by_email(email).then((ans) => {
                if (ans.status !== "failed") {
                    get_History_Apps_for_Doctor(ans[0].id).then((res) => {
                        if (res.status !== "failed")
                            res.length >= 1 ? setAppointments(res) : setFlag(false);
                    })
                }
            })
        } else {
            get_doc_by_email(email).then((ans) => {
                if (ans.status !== "failed") {
                    getAppointment_for_Doctor(ans[0].id).then((res) => {
                        if (res.status !== "failed")
                            res.length >= 1 ? setAppointments(res) : setFlag(false);
                    })
                }
            })
        }

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{paddingHorizontal:"25%"}}>
                    {
                        type == "history" ?
                         <Text style={styles.heading}>My History</Text> :
                            <Text style={styles.heading}>My Appointments</Text>
                    }
                </View>
            </View>
            {appointments.length !== 0 ?
                (
                    <View style={{ flex: 10, flexDirection: "column" }}>
                        <ScrollView>
                            {
                                appointments.map((ele, idx) => {

                                    return <Doc_card_appointment key={idx} date={ele.date} time={ele.time} name_patient={ele.name_patient} doc_name={ele.doc_name} gender={ele.gender} notes={ele.notes} date_now={ele.date_now} specialization1={ele.specialization1} image={ele.doc_image} doctor_id={ele.doctor_id} users_id={ele.users_id} age={ele.age} />
                                })
                            }
                        </ScrollView>
                    </View>
                ) :
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image style={{ height: "100%", width: "100%", alignItems: "center" }} source={require("../assets/empty.png")} />
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 30,

    },
    // header: {
    //   backgroundColor: "#288771",
    //   width: "100%",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   paddingVertical: 30,
    //   marginBottom: 20,
    //   flex: 1
    // },
    // heading: {
    //   fontSize: 24,
    //   fontWeight: "bold",
    //   color: "#fff",
    // },
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 30,
        // marginBottom: 20,


    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",


    },

    Go_Back: {
        // marginTop:15,
        // // width:"10%",
        // justifyContent: "flex-start",
        // justifyContent: "flex-start",
        width: "10%",
        // left:1
    },
    Go_Back1: {
        // marginTop:15,
        width: "35%",
        // justifyContent: "flex-start",
        // justifyContent: "flex-start",

    },
});

export default Appointments;
