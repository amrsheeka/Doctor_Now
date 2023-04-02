import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";
import { getCurrentUser } from "../../database/Users";
const AllDoctors = ({ navigation, route }) => {
  let filterd = route.params.filteritem;
  let all = route.params.all;
  // const [doctors, setDoctors] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  console.log(selectedValue);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
      console.log(user);
    }
    fetchUser();
  }, []);
  //console.log(all);
  //console.log(filterd);

  
  const renderDoctor = ({ item }) => (
    <DoctorCard doctor={item} user={currentUser} navigation={navigation} />
  );
  let ff;
  if (selectedValue != "all" && all === "all") {
    ff = Doctor.doctors.filter((e) => e.title == selectedValue);
  } else ff = Doctor.doctors;
  if (all === "all") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>All Doctors</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: 50, width: 250 }}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 250 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            //mode="dropdown"
          >
            <Picker.Item label="Select Specialization" value="Unknown" />
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
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    // flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
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
});

export default AllDoctors;
