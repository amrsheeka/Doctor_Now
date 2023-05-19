import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, Feather, MaterialIcons, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../../database/Users";
import { AppContext } from "../consts/AppContext";
const User = ({ navigation }) => {
  const { curruser} = useContext(AppContext);
  const { night} = useContext(AppContext);
  const handlelgout = () => {
    logout().then(() => navigation.navigate("StackNavigator"));
  }
  return (
    <View style={{flex:1,marginBottom:"20%"}}>
    <ScrollView style={[styles.container,night && styles.buttonDark]}>
      <View>
        <View style={[styles.x,night && styles.darklist]}>
         <TouchableOpacity>
          <Image
            source={require("../assets/Herbal_Medicine_Male_Avatar.png")}
            style={styles.z}
          />
          </TouchableOpacity>
          <Text style={[styles.z2,night&&styles.textdark]}> {curruser.name} </Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={[styles.xx,night && styles.dark2]}>
          <MaterialCommunityIcons name="history" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> History </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Userpage")}>
      <View style={[styles.xx,night && styles.dark2]}>
          <Ionicons name="md-person-outline" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> Personal Details</Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={[styles.xx,night && styles.dark2]}>
          <Ionicons name="md-location-outline" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> Addres </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
      <View style={[styles.xx,night && styles.dark2]}>
          <MaterialIcons name="payment" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> Payment Method </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={[styles.xx,night && styles.dark2]}>
          <AntDesign name="exclamationcircleo" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> About </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={[styles.xx,night && styles.dark2]}>
          <Feather name="help-circle" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> Help </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlelgout()}>
      <View style={[styles.xx,night && styles.dark2]}>
          <SimpleLineIcons name="logout" size={28} color="black" style={styles.xxxx} />
          <Text style={styles.xxxxx}> Logout </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 30,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  x: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#288771",
    borderRadius: 40,
    width:"100%"

  },
  z: {
    marginRight: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  z1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 4,
    top: 0
  },
  z2: {
    fontSize: 24,
    fontWeight: "bold",
  },
  xx: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal:15
  },
  xxxx: {
    marginRight: 20,
    color: "#288771"

  },
  xxx: {
    marginLeft: "auto",
  },
  xxxxx: {
    fontSize: 18,
    fontWeight: 100,

  },
  buttonDark: {
    backgroundColor: '#0D1E3D',
  },
  darklist: {
    backgroundColor: '#142E5E',
    borderWidth: 0,

  },
  dark2: {
    backgroundColor: "#BDD3FF",
  },
  textdark: {
   
    color:"white"
  },
});


export default User;
