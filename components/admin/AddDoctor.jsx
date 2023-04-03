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
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [Title, setTitle] = useState("");
  const [address, setaddress] = useState("");
  const [Price, setPrice] = useState("");
  const [Status, setStatus] = useState("");

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
                    <Text style={{ fontSize: 17, fontWeight: "bold",justifyContent:"center",alignItems:"center" }}>
                        Doctor Name
                    </Text>
                    <TextInput
                        placeholder="Enter The Doctor Name"
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setname(text)}
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
                        onChangeText={(text) => setaddress(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Doctor Title
                    </Text>
                    <TextInput
                        placeholder="Enter the specialty of Doctor"
                        style={styles.input}
                        value={Title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Doctor Describtion
                    </Text>
                    <TextInput
                        placeholder="Enter the description of Doctor"
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setdescription(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Doctor Price
                    </Text>
                    <TextInput
                        placeholder="Enter the Price of Doctor"
                        style={styles.input}
                        value={Price}
                        onChangeText={(text) => setPrice(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 5 }}>
                    Doctor Status
                    </Text>
                    <TextInput
                        placeholder="Enter the description of Doctor"
                        style={styles.input}
                        value={Status}
                        onChangeText={(text) => setStatus(text)}
                    />
                </View>
            </ScrollView>

        </View>

        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={() => ("")}>
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
marginTop:15,
width:"10%"
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
    flex:1
},
body: {
    flex: 6,
    flexDirection: "column",
    justifyContent:"center"        
}
});

export default AddDoctor;

