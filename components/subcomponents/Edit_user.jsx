import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../consts/AppContext";
import { editUser, getCurrentUser, login } from "../../database/Users";
const Edit_user = ({ navigation, route }) => {
  const [nameerr, setNameErr] = useState("");
  const [phoneerr, onChangePhoneErr] = useState("");
  const [Address1err, onChangeAddress1Err] = useState("");
  const [name, setName] = useState(route.params.user.name);
  const [phone, onChangePhone] = useState(route.params.user.phone);
  const [Address1, onChangeAddress1] = useState(route.params.user.address);
  const [Address2, onChangeAddress2] = useState(route.params.user.address_2);
  const [age, setAge] = useState(route.params.user.age);
  const [gender, setGender] = useState(route.params.user.gender);
  const { curruser, setCurrUser } = useContext(AppContext);
  const { night} = useContext(AppContext);
  const handleSave = async () => {
    if (!name||!phone||!Address1) {
      if (!name) {
        setNameErr("Enter your your name.");
      } 
       else {
        setNameErr("");
      }
      if (!phone) {
        onChangePhoneErr("Enter your your phone.");
      } 
       else {
        onChangePhoneErr("");
      }
      if (!Address1) {
        onChangeAddress1Err("Enter your your address.");
      } 
       else {
        onChangeAddress1Err("");
      }
    } else {
      let user = {};
      user = route.params.user;
      const set = async () => {
        user = {
          ...user,
          address: Address1,
          address_2: Address2,
          age: age,
          gender: gender,
          phone: phone,
          name, name
        }
      }
      await set().then(
        () => {
          editUser(user).then(
            () => {
              getCurrentUser().then((res) => {
                setCurrUser(res);
                navigation.navigate("Thk3");
                console.log(user);
              }
              );
            }
          );
        }
      );
    }
  }

  

  return (
    <View style={[styles.container,night && styles.buttonDark]}>
    <View style={[styles.header, night && styles.buttonDark]}>
        <View style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={[styles.heading,night&&styles.textdark]}>Edit User</Text>
        </View>
      </View>
      <ScrollView>
        <View>
        <Text style={[styles.text,night&&styles.textdark]}>Name</Text>
          <TextInput
            style={[styles.input ,night && styles.dark2]}
            onChangeText={setName}
            value={name}
            placeholder={"Enter your name"}
          />
          <Text style={{ color: "red" }}>{nameerr}</Text>
          <Text style={[styles.text,night&&styles.textdark]}>Phone Number</Text>
          <TextInput
            style={[styles.input ,night && styles.dark2]}
            onChangeText={onChangePhone}
            value={phone}
            placeholder={"Enter Phone Number"}
          />
          <Text style={{ color: "red" }}>{phoneerr}</Text>
          <Text style={[styles.text,night&&styles.textdark]}>Address1</Text>
          <TextInput
            style={[styles.input ,night && styles.dark2]}
            onChangeText={onChangeAddress1}
            value={Address1}
            placeholder={"Enter Address1"}
          />
          <Text style={{ color: "red" }}>{Address1err}</Text>
          <Text style={[styles.text,night&&styles.textdark]}>Address2</Text>
          <TextInput
           style={[styles.input ,night && styles.dark2]}
            onChangeText={onChangeAddress2}
            value={Address2}
            placeholder={"Enter Address2"}
          />

<Text style={[styles.text,night&&styles.textdark]}>Select Your Age</Text>
          <View>
            <Picker
              selectedValue={age}
              onValueChange={(value, index) => setAge(value)}
              mode="dropdown"
              style={[styles.picker ,night&&styles.darklist]}
            >
              <Picker.Item label="15+" value="15+" />
              <Picker.Item label="25+" value="25+" />
              <Picker.Item label="35+" value="35+" />
              <Picker.Item label="45+" value="45+" />
            </Picker>
          </View>
          <View>
          <Text style={[styles.text,night&&styles.textdark]}>Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(value, index) => setGender(value)}
              mode="dropdown"
              style={[styles.picker ,night&&styles.darklist]}
            >
              <Picker.Item label="male" value="male" />
              <Picker.Item label="female" value="female" />
            </Picker>
          </View>
        </View>

      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button ,night&&styles.darklist]}


          onPress={() => { handleSave(); }}
        >
          <Text style={[styles.buttonText]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
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
    width: "10%",
    // left:1
  },
  Go_Back1: {
    // marginTop:15,
    width: "35%",

  },
  footer:{
paddingVertical:50
  },
  input: {
    height: 50,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    backgroundColor: "#efefef",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  ageBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ageItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    width: "20%",
  },
  picker: {
    height: 50,
    margin: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  body: {
    flex: 1,
  },

  input2: {
    height: "70%",
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: "#ffffff",
    backgroundColor: "#efefef",
    borderRadius: 10,
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
  buttonText: {
    textAlign: "center",
  },
  buttonDark: {
    backgroundColor: '#1d1c1c',
    },
  darklist: {
    backgroundColor: '#262424',
    color:"white",
    borderColor:'#262424'

  },
  dark2: {
    backgroundColor: '#262424',
    color:"white",
    borderColor:'#262424'
  },
  textdark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
    color:"white"
  },
});

export default Edit_user;
