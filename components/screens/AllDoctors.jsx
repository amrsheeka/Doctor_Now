import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DoctorCard from "../subcomponents/DoctorCard";
import { Ionicons } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";
import { getCurrentUser } from "../../database/Users";

const AllDoctors = ({ navigation, route }) => {
  const filterd = route.params.filteritem;
  const all = route.params.all;

  const [selectedValue, setSelectedValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

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
          <Text style={styles.heading}>All Doctors</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.xx}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>back</Text>
          </View>
        </TouchableOpacity>
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
        <View style={{ height: 50, width: 250 }}>
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
  searchInput: {
    fontSize: 16,
    color: "black",
  },
});

export default AllDoctors;
