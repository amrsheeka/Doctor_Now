import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import chats from "../consts/Chats";
import doctors from "../consts/Doctor";
import DoctorCard2 from "../subcomponents/DoctorCard2";
const Home = ({ navigation }) => {
  const renderChat = ({ item }) => (
    <DoctorCard2 doctor={item} navigation={navigation} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.Title}>
          <Text style={styles.heading}>All doctors treat,but a good doctor lets nature heal.</Text>
        </View>
      </View>
      <View style={styles.list}>
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
    backgroundColor:"#288771",
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
  Title:{
    width:260,
    alignItems:"flex-start",
    paddingHorizontal:20,
  },
  list:{
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    backgroundColor:"#fff",
  },
  round:{
    marginTop:20,
  },
});

export default Home;
