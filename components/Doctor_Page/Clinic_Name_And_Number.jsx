import React from "react";

import { View, Text, StyleSheet,TextInput} from "react-native";


import Icon2 from "react-native-vector-icons/Entypo";


const Clinic_Name_And_Number = ({nameClinic, numberClinic, fun1, fun2}) => {
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
            color={main_color}
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
            Basic Clinic Information{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Clinic Name{" "}
        </Text>
        <TextInput
          style={styles.inp}
          defaultValue={nameClinic}
          onChangeText={fun1}
        />

        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Clinic Phone number{" "}
        </Text>
        <TextInput
          style={styles.inp}
          keyboardType="phone-pad"
          defaultValue={numberClinic}
          onChangeText={fun2}
        />
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
  
  });

  export default Clinic_Name_And_Number;
