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
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../consts/AppContext";
const Edit_user = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [name, setName] = useState(route.params.user.name);
  const [email, setEmail] = useState(route.params.user.email);
  const [phone, onChangePhone] = useState(route.params.user.phone);
  const [Address1, onChangeAddress1] = useState(route.params.user.address);
  const [Address2, onChangeAddress2] = useState(route.params.user.address_2);
  const [age, setAge] = useState(route.params.user.age);
  const [gender, setGender] = useState(route.params.user.gender);
  
  const handleSave=async()=>{
    setUser({...user,
      email:email,
      address:Address1,
      address_2:Address2,
      age:age,
      gender:gender,
      phone:phone,
      name,name
    });
    navigation.navigate("Thk3");
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={styles.heading}>Edit User</Text>
        </View>
      </View>
      <ScrollView>
      <View>
        <Text style={styles.text}>Email address</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={"Enter Email address"}
        />
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder={"Enter your name"}
        />
        <Text style={styles.text}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={phone}
          placeholder={"Enter Phone Number"}
        />
         <Text style={styles.text}>Address1</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress1}
          value={Address1}
          placeholder={"Enter Address1"}
        />
        <Text style={styles.text}>Address2</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress2}
          value={Address2}
          placeholder={"Enter Address2"}
        />
        
        <Text style={styles.text}>Select Your Age</Text>
        <View>
          <Picker
            selectedValue={age}
            onValueChange={(value, index) => setAge(value)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="15+" value="15+" />
            <Picker.Item label="25+" value="25+" />
            <Picker.Item label="35+" value="35+" />
            <Picker.Item label="45+" value="45+" />
          </Picker>
        </View>
        <View>
          <Text style={styles.text}>Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(value, index) => setGender(value)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value={null} />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Not Willing" value="NA" />
          </Picker>
        </View>
      </View>
      
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}


          onPress={() => {handleSave()}}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection:"row",
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
    width:"10%",
    // left:1
    },
    Go_Back1: {
      // marginTop:15,
      width:"35%",
     
  
      },
  input: {
    height: 50,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 5,
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
});

export default Edit_user;
