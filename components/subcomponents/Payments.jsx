// import React from "react";
import { View, Text, StyleSheet, FlatList, Image ,Button,TouchableOpacity,TextInput} from "react-native";
import CurrentUser from "../consts/CurrentUser";
import { AntDesign, Feather,Entypo, FontAwesome,FontAwesome5,MaterialIcons, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const Payment = ({ navigation }) => {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={styles.heading}> Payment</Text>
        </View>
      </View>
      <View style={{flex:1}}>
      <View>
        <Text style={styles.text}>Choose a payment method</Text>
      </View>
      <View style={styles.icon}>
      <TouchableOpacity onPress={() => ""}>
        <View style={styles.smallicon}>
        <Entypo name="paypal" size={15} color="#2596be" />
        <Text style={{fontSize:10}}>PayPal</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => ""}>
        <View style={styles.smallicon}>
        <Text style={{fontSize:15}}>Visa</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ""}>
        <View style={styles.smallicon}>
        <FontAwesome name="cc-mastercard" size={24} color="black" />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ""}>
        <View style={styles.smallicon}>
        <FontAwesome5 name="stripe" size={24} color="black" />
        </View>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.text}>Card Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"5975 4544 7775 4454"}
        />
      </View>
      <View>
      <Text style={styles.text}>Cash Header Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Abdelfattah Hesham"}
        />
      </View>
      <View style={styles.biginput}>
        <View style={{flexDirection:"column"}}>
      <Text style={styles.text1}>Expiry Date</Text>
        <TextInput
          style={styles.input1}
          onChangeText={onChangeText}
          value={text}
          placeholder={"25/6"}
        />
        </View>
        <View style={{flexDirection:"column"}}>
        <Text style={styles.text1}>Cvv</Text>
        <TextInput
          style={styles.input1}
          onChangeText={onChangeText}
          value={text}
          placeholder={"6556"}
        />
        </View>
      </View>
      <View style={styles.content1}>
        <TextInput
          style={styles.input2}
          onChangeText={onChangeText}
          value={text}
          // placeholder={"25/6"}
        />
              <Text style={styles.text1}>Remember Me</Text>
        </View>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Thk2")}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical:35
  },
  header: {
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
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
    width:"10%",
    // left:1
    },
    Go_Back1: {
      // marginTop:15,
      width:"35%",
      // justifyContent: "flex-start",
      // justifyContent: "flex-start",
  
      },
  content: {
    paddingHorizontal: 10,
    flexDirection:"column",
    gap:5
  },
  content1: {
    flexDirection:"row",
    gap:5,
    paddingVertical:"5%"
  },
  icon: {
   flexDirection:"row",
   gap:10,
  },
  smallicon: {
    flexDirection:"row",
    borderWidth: 2,
    padding: 20,
    borderColor: "#ffffff",
    backgroundColor: "#efefef",
    borderRadius: 40,
   },
  text: {
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: 10,
    padding: 5,
  },
  text1: {
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: 10,
    padding: 5,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:10
  },
  input: {
    height: 50,
    marginHorizontal:10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  input1: {
    height: 50,
    width:"100%",
    marginHorizontal:10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  input2: {
    height: 50,
    width:"10%",
    marginHorizontal:10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  biginput: {
    flexDirection:"row",
    justifyContent:"space-between"
  },
  button: {
    fontSize: 18,
    paddingHorizontal: "40%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#ffffff",
    backgroundColor: "#288771",
    justifyContent: "center",
    height: 50,
  },
});

export default Payment;
