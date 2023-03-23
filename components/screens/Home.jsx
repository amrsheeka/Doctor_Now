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
        <Text style={styles.heading}>Chats</Text>
      </View>
      <FlatList
        data={doctors}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Home;
