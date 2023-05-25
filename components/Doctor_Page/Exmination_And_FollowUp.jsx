import React from "react";

import { View, Text, StyleSheet,TextInput} from "react-native";


import Icon4 from "react-native-vector-icons/FontAwesome5";


const Exmination_And_FollowUp = ({exmain, follow_up, duration, fun1, fun2, fun3}) => {
    const main_color = "#288771";
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 15,
          }}
        >
          <Icon4
            name={"file-invoice-dollar"}
            size={25}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Exmination{" "}
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
          Exmination Fees (EGP){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={exmain}
          onChangeText={fun1}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 5,
            marginHorizontal: 15,
          }}
        >
          <Icon4
            name={"file-invoice-dollar"}
            size={25}
            color={main_color}
            style={{ width: "7%" }}
          />
          <Text
            style={{
              color: "black",
              paddingHorizontal: 5,
              width: "85%",
            }}
          >
            {" "}
            Follow-up{" "}
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
          Follow-up Fees (EGP){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={follow_up}
          onChangeText={fun2}
        />
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {" "}
          Duration (Days){" "}
        </Text>
        <TextInput
          keyboardType="phone-pad"
          style={styles.inp}
          defaultValue={duration}
          onChangeText={fun3}
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

  export default Exmination_And_FollowUp;