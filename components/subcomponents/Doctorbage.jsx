import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const Doctorbage = ({ navigation, route }) => {
  let item = route.params.doctor;

  return (
    <View>
      <Text> {item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Doctorbage;
