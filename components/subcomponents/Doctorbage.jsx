import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { insertReviews, getReviews } from "../../database/Users";
import { AppContext } from "../consts/AppContext";

const Doctorbage = ({ navigation, route }) => {
  let item = route.params.doctor;

  const { curruser } = useContext(AppContext);

  const [text, setText] = useState("");
  const [allrev, setAllrev] = useState([]);
  // console.log(curruser.id, "  curruser.id");
  // console.log(item.id, "       item.id");
  // console.log(curruser.name, "curruser.name");
  const InsertRev = async () => {
    insertReviews(curruser.id, item.id, text, curruser.name).then((res) => {
      console.log(res);
    });
  };

  const get = async (id) => {
    const list = getReviews(id).then((res) => {
      console.log(res);
    });
    console.log(list);
  };

  return (
    <View>
      <Text> {item.name}</Text>
      <TextInput
        placeholder="Text"
        keyboardType="email-address"
        onChangeText={(text) => setText(text)}
        style={[styles.input2]}
      />
      <TouchableOpacity onPress={() => InsertRev()}>
        <Text style={styles.text}>add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => get(item.id)}>
        <Text style={styles.text}>get</Text>
      </TouchableOpacity>
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
  input2: {
    backgroundColor: "#eceff1",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 200,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    color: "#288771",
  },
});

export default Doctorbage;
