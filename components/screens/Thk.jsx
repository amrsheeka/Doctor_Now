
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useContext } from "react";
import { AppContext } from "../consts/AppContext";

const Thk = ({ navigation, route }) => { 
    // const { night } = useContext(AppContext);

    let name=route.params.doc.name;
    return (
        <View style={[{ flex: 1, padding: 20,display:"flex" },
        //  night && styles.buttonDark
         ]}
         
         >
            <View style={styles.header}>
            <Text style={[styles.heading
            // ,night && styles.buttonDark
            
            ]}>Confirmation</Text>
                <AntDesign name="checkcircle" size={120} style={styles.icon}/>
            </View>
            <View style={styles.body}>
                <Text numberOfLines={5}  style={[styles.text
                // ,night && styles.buttonDark
                ]}>
                    Your appointment booking has successfully completed
                    with {name}  and he will massage you soon.
                </Text>
            </View>
            <View style={styles.footer}>
                {/* <Button title="Thanks" color={"#288771"}
                    onPress={() => navigation.navigate("Home")}
                ></Button> */}
                <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>Thanks</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:15

    },
    body: {
        flex: 2,
        padding:10
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign:"center"
    },
    footer: {
        flex: 1,
        borderRadius: 10,
        // elevation: 6,
        // borderColor: '#288771',
        marginHorizontal: 4,
        marginVertical: 6,
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    text: {
        fontSize: 18,
        lineHeight: 35 * 0.75,
        paddingTop: 35 - (38 * 0.75),
        marginVertical:20, 
    },
    button:{
        fontSize: 18,
        paddingHorizontal:"40%",
        borderWidth: 2,
        borderRadius:20,
        borderColor: "#ffffff",
        backgroundColor:"#288771",
        justifyContent: "center",
        height:50
    },
    buttonText:{
        textAlign:"center",
    },
    icon:{
        
        color:"#288771",
        padding:20,

    },
    buttonDark: {
        backgroundColor: '#1d1c1c',
        color:"white"
      },
      // darklist: {
      //   backgroundColor: '#288771',
      //   borderColor:'#1d1c1c'
    
      // },
      dark2: {
        backgroundColor: '#262424',
        borderColor:'#262424',
        color:"white"
      },
});

export default Thk;
