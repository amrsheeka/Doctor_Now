import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const Doctorbage = ({ navigation, route }) => {
  let item = route.params.doctor;

  return (
    <View>
      <Text> {item.name}</Text>
      <Image source={item.photo} style={styles.cardPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardPhoto: {
    width: 150,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Doctorbage;
