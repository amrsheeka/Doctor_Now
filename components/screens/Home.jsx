import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import chats from "../consts/Chats";
import doctors from "../consts/Doctor";
import DoctorCard2 from "../subcomponents/DoctorCard2";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const renderChat = ({ item }) => (
    <DoctorCard2 doctor={item} navigation={navigation} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.Title}>
          <Text style={styles.heading}>All doctors treat,but a good doctor lets nature heal.</Text>
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="white"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <TouchableOpacity style={styles.filter}>
            <Image style={{height:35,width:35,alignItems:"center"}} source={require("../assets/filter.png")}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        <TouchableOpacity>
          <Text style={styles.text}>See All</Text>
        </TouchableOpacity>
        <View style={styles.round}>
          <FlatList
            data={doctors}
            renderItem={renderChat}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#288771",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  Title: {
    width: 260,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  list: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  round: {
    marginTop: 20,
  },
  search: {

    backgroundColor: "#40b488",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 20,
    width: "60%",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  filter: {
    paddingLeft:8,
    justifyContent:"center",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 15,
    color: "#5DADE2",
    textAlign:"right",
    marginRight:20,
    marginTop:5,
  },
});

export default Home;
