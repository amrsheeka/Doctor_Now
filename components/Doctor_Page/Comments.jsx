import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import { getReviews } from "../../database/Users";
const Comments = ({ id }) => {
  const { comments, setComments } = useContext(AppContext);

  const comment = (user_name, rate, text, date, key) => {
    return (
      <View key={key} style = {styles.content}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Icon
            name={rate > 0 ? "star" : "star-border"}
            size={25}
            color="gold"
          />
          <Icon
            name={rate > 1 ? "star" : "star-border"}
            size={25}
            color="gold"
          />
          <Icon
            name={rate > 2 ? "star" : "star-border"}
            size={25}
            color="gold"
          />
          <Icon
            name={rate > 3 ? "star" : "star-border"}
            size={25}
            color="gold"
          />
          <Icon
            name={rate > 4 ? "star" : "star-border"}
            size={25}
            color="gold"
            style={{ width: "38%" }}
          />
          <Text> {date} </Text>
        </View>

        <Text
          style={{
            marginVertical: 5,
            lineHeight: 20,
            // alignSelf: "center",
            // justifyContent: "center",
          }}
        >
          {text}
        </Text>

        <Text style={{ alignSelf: "flex-end" }}> {user_name} </Text>
      </View>
    );
  };

  const getComments = async () => {
    await getReviews(id).then((res) => {
      if (res.status != "fail") {
        // console.log(res);
        setComments(res);
      }
    });
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <View>
      {/* <View style={[styles.header, { flexDirection: "row" }]}>
        <Icon2
          name={"arrow-left"}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={{ width: "7%", marginHorizontal: 10 }}
        />
        <Text style={styles.label}> Comments </Text>
      </View> */}

      <ScrollView>
        <View style={{ marginVertical: 10, alignSelf: "center" }}>
          <Image
            source={require("../assets/comments-fotor-bg-remover-20230619143244.png")}
            style={{ height: 250, width: 250 }}
          />
        </View>

        {comments.map((ele, index) => {
          return comment(ele.user_name, ele.rate, ele.text, ele.date, index);
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "#ccc",
    width: "95%",
    alignSelf: "center",
    marginVertical: 10,
  },
  content: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default Comments;
