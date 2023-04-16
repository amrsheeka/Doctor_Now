import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";
import { getCurrentUser } from "../../database/Users";
import * as Location from 'expo-location';
import { Button } from "react-native";
const AllDoctors = ({ navigation, route }) => {
  const filterd = route.params.filteritem;
  const all = route.params.all;

  const [selectedValue, setSelectedValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [reload, setReload] = useState(false); // add reload state

  async function getlocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // handle permission denied

    } else {
      setReload(true);
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  }

  async function fetchLocation() {
    await getlocation().then(
      () => {
        console.log(latitude);
        if (latitude != null && longitude != null) {
          
          // Get the user's current location coordinates
          const userLatitude = latitude;
          const userLongitude = longitude;

          // Calculate the distance from each doctor's location to the user's location
          for (let i = 0; i < ff.length; i++) {
            const { x_coordnate, y_coordnate } = ff[i];
            const distance = Math.sqrt(
              Math.pow(x_coordnate - userLatitude, 2) + Math.pow(y_coordnate - userLongitude, 2)
            );
            ff[i] = { ...ff[i], distance };
          }

          // Sort the doctors by distance in ascending order
          ff.sort((a, b) => a.distance - b.distance);
          setReload(false);
           // update reload state to trigger re-render
        }
      }
    )


  }

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchUser();
  }, []); // add reload state to the dependency array

  const renderDoctor = ({ item }) => (
    <DoctorCard doctor={item} user={currentUser} navigation={navigation} />
  );

  let ff = Doctor.doctors;

  if (selectedValue !== "all") {
    ff = ff.filter((doctor) => doctor.title === selectedValue);
  }

  if (searchQuery !== "") {
    ff = ff.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (all === "all") {
    return (
      <View style={styles.container}>
         <View style={styles.header}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
        <Text style={styles.heading}>All Doctors</Text>
        </View>
      </View>
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.xx}>

              <Ionicons name="arrow-back" size={24} color="black" />
              <Text>back</Text>
            </View>
          </TouchableOpacity> */}
          <View style ={{flexDirection:"row",flex:3}}>

          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors by name"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              placeholderTextColor="gray"
            />
          </View>
         
        </View>
        <View style ={{flexDirection:"row" }}>
                
        {
            
            reload?
              <ActivityIndicator size={20} color="#00ff00" />
              :<></>
          
        }
        <TouchableOpacity onPress={() => { fetchLocation() }} title="Nearest" style={styles.near}>
        <View style={styles.smallicon}>
        <MaterialCommunityIcons name="near-me" size={20} color="black" style={styles.nearIcon} />
        <Text style={{fontSize:20}}>Nearest</Text>
        </View>
          </TouchableOpacity>
          {/* <View > */}
          <View style={{ height: 50, width: 200 }}>

            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Select Specialization" value="all" />
              <Picker.Item label="Pulmonologist" value="Pulmonologist" />
              <Picker.Item label="Psychiatrist" value="Psychiatrist" />
              <Picker.Item label="Internist" value="Internist" />
              <Picker.Item label="Hematologist" value="Hematologist" />
              <Picker.Item label="Plastic Surgeon" value="Plastic Surgeon" />
              <Picker.Item label="Cardiologist" value="Cardiologist" />
              <Picker.Item label="Neurosurgeon" value="Neurosurgeon" />
              <Picker.Item label="Endocrinologist" value="Endocrinologist" />
              <Picker.Item label="ENT Doctor" value="ENT Doctor" />
              <Picker.Item
                label="Infertility Specialist"
                value="Infertility Specialist"
              />
              <Picker.Item label="Andrologist" value="Andrologist" />
            </Picker>
          </View>
        </View>


        <FlatList
          data={ff}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={7}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  } else if (filterd === "Stomach") {
    let dataa = Doctor.doctors.filter((e) => e.title === "Internist");
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>All Stomach Doctors</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={dataa}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={7}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  } else if (filterd === "Dentist") {
    let dataa = Doctor.doctors.filter((e) => e.title === "Dentist");
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>All Dentist Doctors</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={dataa}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={7}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  } else if (filterd === "Surgery") {
    let dataa = Doctor.doctors.filter((e) => e.title === "General Surgeon");
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>All Surgery Doctors</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={dataa}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={7}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical:20,

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
      near: {
        // backgroundColor: "gray",
        // borderRadius: 8,
        // borderColor:"gray",
        // borderWidth:1,
        height:40,
        },
  subHeading: {
    fontSize: 18,
    color: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  xx: {
    flexDirection: "row",
  },
  picker: {
    height: 50,
    margin: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  nearIcon: {
    margin: 5,
  },
  searchInput: {
    fontSize: 16,
    color: "black",
    width:"90%"
  },
  smallicon: {
    backgroundColor: "gray",
        borderRadius: 8,
        borderColor:"gray",
        borderWidth:1,
        height:30,
        flexDirection:"row",
        // height: 50,
        margin: 12,
        borderRadius: 10,
        marginBottom: 10,
   },
});

export default AllDoctors;
