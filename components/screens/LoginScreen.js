import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  // TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput } from 'react-native-paper';
import CurrentUser from "../consts/CurrentUser";
import { login } from "../../database/Users";
import { AppContext } from "../consts/AppContext";
import { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const LoginScreen = ({ navigation }) => {
  const { curruser, setCurrUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [porder, setPorder] = useState("white");
  const [porder2, setPorder2] = useState("white");
  const main_color = "#288771";

  const navigateSignUp = () => {
    navigation.navigate("Sign_UP_2th_Screen");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      if (!email) {
        setEmailErr("Enter your email");
      } else {
        setEmailErr("");
      }
      if (!password) {
        setPasswordErr("Enter your password");
      } else {
        setPasswordErr("");
      }
    } else {
      login(email, password).then((res) => {
        setCurrUser(res);
        if (CurrentUser.user.is_admin == "yes") {
          navigation.navigate('AdminStackNavigator');
        } else if (CurrentUser.user.is_doctor == "yes") {
          navigation.navigate('DoctorStackNavigator');
        } else {
          navigation.navigate('Homefunc');
        }

      }).catch((err) => { });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image style = {{height : 150 , width: 150 }}source={require("../assets/splash.png")} />
      </View>
      <View >
        <Text style={styles.greeting}>Welcome to Doctor Now!</Text>
      </View>
      <View style={styles.inputContainer}>
    <Pressable>
        <TextInput
          label= {"Email"}
          mode = 'outlined'
          keyboardType= {"email-address"}
          style={{marginTop : 30,backgroundColor: "#eceff1", }}
          value={email}
          onChangeText={setEmail}
          outlineStyle = {{borderColor : porder, borderRadius : 10, color : "red"  }}
          left = {<TextInput.Icon icon = 'email' />}
          onFocus={()=>{setPorder(main_color)}}
          onBlur={()=>{setPorder("white")}}
          activeOutlineColor = {main_color} 
        />
        </Pressable>
        <Text style={{ color: "red" }}>{emailErr}</Text>
        <TextInput
          label= {"password"}
          mode = 'outlined'
          style={{marginTop : 20,backgroundColor: "#eceff1",}}
          value={password}
          onChangeText={setPassword}
          outlineStyle = {{borderColor : porder2, borderRadius : 10}}
          secureTextEntry={!showPasswordIcon}
          activeOutlineColor = {main_color} 
          left = {<TextInput.Icon icon = 'lock' />}
          right={<TextInput.Icon icon ={showPasswordIcon ? 'eye-off' : 'eye'} onPress={() => setShowPasswordIcon(!showPasswordIcon)} iconColor = "grey" />}
          onFocus={()=>{setPorder2(main_color)}}
          onBlur={()=>{setPorder2("white")}}
        />
          <Text style={{ color: "red" }}>{passwordErr}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin()}

          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text> Not have account?</Text>
            <TouchableOpacity onPress={() => navigateSignUp()}>
              <Text style={styles.text}> SignUp</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <StatusBar style ='auto' backgroundColor="#fafafa" />
    </View>
    
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "",
  },
  inputContainer: {
    width: "80%",
    
  },
  input: {
    // backgroundColor: "#eceff1",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 10,
    // marginTop: 10,
    flexDirection:"row",
    width:"100%",
    justifyContent:"center"

  },
  input2: {
    backgroundColor: "#eceff1",
    // paddingHorizontal: 15,
    // paddingVertical: 14,
    // borderRadius: 20,
    marginTop: 10,
    borderColor : "#288771",
    // flexDirection:"row",
    width:"100%",
    justifyContent:"center"

  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,

  },
  button: {
    width: "80%",
    height: "28%",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#288771",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "white",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "#288771",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,

  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  passwordContainer:{
    flexDirection:"row",
    // width:"100%",
    // justifyContent:"center",
    // backgroundColor: "#eceff1",
    // paddingHorizontal: 20,
    //paddingVertical: 10,
    // borderRadius: 10,
  },
  passwordIcon:{
    alignSelf:"center",
  },
});

export default LoginScreen;
