import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const User = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Profile</Text>
      </View>
      <TouchableOpacity>
      <View style={styles.x}>
      <MaterialIcons name="panorama-photosphere-select" size={70} color="black" style={styles.z}/>
          <Text style={styles.z2}> Name Profile </Text>
          <MaterialIcons name="mode-edit" size={24} color="white" style={styles.z1}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <MaterialCommunityIcons name="history" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> History </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Userpage")}>
        <View style={styles.xx}>
          <Ionicons name="md-person-outline" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> Personal Details</Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <Ionicons name="md-location-outline" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> Addres </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
                  </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
        <MaterialIcons name="payment" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> Payment Method </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
                  </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <AntDesign name="exclamationcircleo" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> About </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
        <Feather name="help-circle" size={24} color="black" style={styles.xxxx}/>
                  <Text style={styles.xxxxx}> Help </Text>
          <AntDesign name="right" size={20} color="black" style={styles.xxx}/>
                  </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.xx}>
          <SimpleLineIcons name="logout" size={24} color="black" style={styles.xxxx}/>
          <Text style={styles.xxxxx}> Logout </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 30,
    backgroundColor: "#fff",
    alignItems:"center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  x: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor:"#288771"
  },
  z: {
    marginRight: 20,
  },
  z1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 4,
    top:0
  },
  z2: {
    fontSize: 24,
    fontWeight: "bold",
  },
  xx: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding:20
  },
  xxxx: {
    marginRight: 20,
    color:"#288771"

  },
  xxx: {
    marginLeft: "auto",
  },
  xxxxx: {
    fontSize: 18,
    fontWeight: "bold",

  },
});


export default User;
