import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import chats from "../consts/Chats";
import ChatCard from "../subcomponents/ChatCard";
const Chat = ({ navigation }) => {
  const renderChat = ({ item }) => (
    <ChatCard chat={item} navigation={navigation} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chats</Text>
      </View>
      <FlatList
        data={chats}
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

export default Chat;
