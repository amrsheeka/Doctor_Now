import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  
} from "react-native";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";
import { getCurrentUser, getFavourite } from "../../database/Users";
import * as Location from 'expo-location';
import { AppContext } from "../consts/AppContext";
import { Button } from "react-native";
import { getDoctors } from "../../database/Doctors";
import DoctorCard2 from "../subcomponents/DoctorCard2";
const AllDoctors = ({ navigation, route }) => {
  const filterd = route.params.filteritem;
  const { doctors, setDoctors } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(filterd);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { favourite, setFavourite } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const [reload, setReload] = useState(false); // add reload state
  const [locate, setLocate] = useState(true);
  const { refreshing, setRefreshing } = useContext(AppContext);
  const [doctors1, setDoctors1] = useState(doctors);
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
  async function fetchDoctor() {
    const doctor = await getDoctors();
    setDoctors(doctor);
    const filt = await getFavourite(currentUser.id);
    setFavourite(filt);
  }
  
  async function fetchLocation() {
    
        getlocation().then(
          () => {
            console.log(latitude);
            if (latitude != null && longitude != null) {

              // Get the user's current location coordinates
              const userLatitude = latitude;
              const userLongitude = longitude;
              let ff = [...doctors1];
              // Calculate the distance from each doctor's location to the user's location
              for (let i = 0; i < doctors1.length; i++) {
                const { x_coordnate, y_coordnate } = doctors1[i];
                const distance = Math.sqrt(
                  Math.pow(x_coordnate - userLatitude, 2) + Math.pow(y_coordnate - userLongitude, 2)
                );
                ff[i] = { ...ff[i], distance: distance }

              }

              // Sort the doctors by distance in ascending order
              ff.sort((a, b) => a.distance - b.distance);
              console.log(ff[0]);
              setDoctors1(ff);
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
  useEffect(() => {
    setDoctors1(
      filterd == "all" ? doctors :
        doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && doctor.title == filterd)
    );
  }, [filterd]);
  const handlePicker=(value)=>{
    console.log(value);
    setDoctors1(
      value == "all"?doctors:doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && doctor.title == value)
    );
  }
  const renderDoctor = ({ item }) => (
    <DoctorCard2 key={item.id} reload={() => { }} doctor={item} navigation={navigation} />
  );
  const handleSearch=(name)=>{
    setSearchQuery(name);
    let x="";
    x= name;
    setDoctors1(
      doctors1.filter((doctor) =>
          doctor.name.toLowerCase().includes(x.toLowerCase()))
    );
    
  }
  return (
    <View style={[styles.container, night && styles.buttonDark]}>
      <View style={styles.header}>
        <View style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={[styles.heading, night && styles.buttonDark]}>All Doctors</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>

        <View style={{ flexDirection: "row", flex: 3 }}>

        </View>
        <View style={[styles.searchContainer, night && styles.dark2]}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, night && styles.dark2]}
            placeholder="Search doctors by name"
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
            placeholderTextColor="gray"
          />
        </View>

      </View>
      <View style={{ flexDirection: "row" }}>

        {

          reload ?
            <ActivityIndicator size={20} color="#00ff00" />
            : <></>

        }
        <TouchableOpacity onPress={() => { fetchLocation() }} title="Nearest" style={styles.near}>
          <View style={styles.smallicon}>
            <MaterialCommunityIcons name="near-me" size={20} color="black" style={styles.nearIcon} />
            <Text style={{ fontSize: 20 }}>Nearest</Text>
          </View>
        </TouchableOpacity>
        {/* <View > */}
        <SelectList
          data={[
            { value: "all" },
            { value: "Pulmonologist" },
            { value: "Psychiatrist" },
            { value: "Internist" },
            { value: "Hematologist" },
            { value: "Plastic Surgeon" },
            { value: "Cardiologist" },
            { value: "Neurosurgeon" },
            { value: "Endocrinologist" },
            { value: "ENT Doctor" },
          ]}
          setSelected={handlePicker}
          placeholder={selectedValue}
          search={false}
          boxStyles={{
            borderWidth: 0,
            borderBottomWidth: 2,
            borderRadius: 0,
            marginHorizontal: 10,
            borderColor: "#288771",
            paddingLeft: 5,
          }}
          arrowicon={<Icon4 name={"chevron-down"} size={12} color={"#288771"} />}
          dropdownStyles={{
            marginHorizontal: 10,
            borderWidth: 0,
            backgroundColor: "white",
            marginTop: 2,
          }}
        />
      </View>
      

      <FlatList
        removeClippedSubviews={true}
        data={
          // (selectedValue == "all" ? doctors1 :
          //   doctors1.filter((doctor) =>
          //     doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && doctor.title == selectedValue))
          doctors1
        }
        renderItem={renderDoctor}
        initialNumToRender={7}
        maxToRenderPerBatch={7}
        windowSize={10}
        keyExtractor={(item, index) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDoctor} />
        }
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,

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
  near: {
    // backgroundColor: "gray",
    // borderRadius: 8,
    // borderColor:"gray",
    // borderWidth:1,
    height: 40,
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
    width: "90%"
  },
  smallicon: {
    backgroundColor: "gray",
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
    // height: 50,
    margin: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonDark: {
    backgroundColor: '#1d1c1c',
    color: "white",
  },
  dark2: {
    backgroundColor: '#262424',
    color: "white",
    borderColor: '#262424'
  },
});

export default AllDoctors;
