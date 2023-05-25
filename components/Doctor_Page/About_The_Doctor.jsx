import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import Icon2 from "react-native-vector-icons/Entypo";

const About_The_Doctor = ({desc, height, fun1, fun2}) => {
    const main_color = "#288771";

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Icon2
            name={"info"}
            size={25}
            color= {main_color}
            style={{ width: "5%", marginLeft: 5 }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            About the Doctor{" "}
          </Text>
        </View>
        <TextInput
          style={[styles.inp, {height : height}]}
          defaultValue={desc}
          multiline
          onContentSizeChange={fun2}
          onChangeText={fun1}
          numberOfLines={10}
          maxLength={250}
        />
        <Text style={{ alignSelf: "flex-end", marginHorizontal: 30 }}>
          {desc.length} / 250
        </Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
  inp: {
    width: "90%",
    height: 40,
    borderBottomWidth: 2,
    borderColor: "#288771",
    // borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
    // fontStyle: "italic",
    padding: 6,
    color: "#000000",
  },

})

export default About_The_Doctor;