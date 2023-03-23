import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const Chatbox = ({ navigation, route }) => {
  let item = route.params.chat;

  return (
    <View>
      <Text> {item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chatbox;
