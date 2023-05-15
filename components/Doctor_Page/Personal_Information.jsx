import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { RadioButton } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/FontAwesome5";

const Personal_Information = ({
  fullName,
  doc_radio,
  center_radio,
  specialization,
  specialization2,
  fun1,
  fun2,
  fun3,
  fun4,
  fun5,
}) => {






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
        Basic Information{" "}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          // fontStyle: "italic",
          // fontWeight: "bold",
          marginHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        {" "}
        Full Name{" "}
      </Text>
      <TextInput
        style={styles.inp}
        defaultValue={fullName}
        //placeholder={"last name"}
        onChangeText={fun1}
      />

      {/* <Text
        style={{
          fontSize: 16,
          // fontStyle: "italic",
          // fontWeight: "bold",
          marginHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        {" "}
        Birth Date{" "}
      </Text>
      <Text style={styles.inp} onPress={() => setShow(true)}>
        {" "}
        {birth}{" "}
      </Text>
      {show && <DateTimePicker value={date} onChange={ChangeDate} />}
      */}
      <Text
        style={{
          color: "black",
          fontSize: 15,
          paddingBottom: 5,
          marginTop: 20,
          paddingHorizontal: 15,
        }}
      >
        Title1
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 40,
          marginTop: 10,
        }}
      >
        <RadioButton
          status={doc_radio}
          color={main_color}
          value="Doctor"
          uncheckedColor="black"
          onPress={fun2}
        />
        <Text
          style={{
            color: "black",
            paddingBottom: 5,
            width: "40%",
            paddingHorizontal: 5,
          }}
        >
          Doctor
        </Text>
        <RadioButton
          status={center_radio}
          color={main_color}
          value="Center"
          uncheckedColor="black"
          onPress={fun3}
        />
        <Text
          style={{
            color: "black",
            paddingBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          Center
        </Text>
      </View>
      {/*
      <TouchableOpacity>
        {practise_licence === "" ? (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 40,
              alignItems: "center",
            }}
          >
            <Icon5
              name={icon13}
              size={25}
              color={main_color}
              style={{ width: "10%", marginLeft: 15 }}
            />

            <Text style={{ fontSize: 16 }}>
              {" "}
              Upload Practice License ID photo
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 40,
              alignItems: "center",
            }}
          >
            <Image
              source={
                doctor.image
                  ? { uri: doctor.image }
                  : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
              }
              style={[
                styles.image,
                { width: "20%", marginLeft: 15, height: 50 },
              ]}
            />
            <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
              {" "}
              Practice License ID photo
            </Text>
          </View>
        )}
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          marginVertical: 5,
        }}
      >
        <Icon2
          name={"graduation-cap"}
          size={25}
          color={main_color}
          style={{ width: "7%", marginLeft: 15 }}
        />
        <Text
          style={{
            color: "black",
            paddingHorizontal: 5,
            width: "85%",
          }}
        >
          {" "}
          Professional Title{" "}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          marginHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        {" "}
        Professional Title{" "}
      </Text>

      <SelectList
        data={[
          { value: "Pulmonologist" },
          { value: "Psychiatrist" },
          { value: "Internist" },
          { value: "Hematologist" },
          { value: "Plastic Surgeon" },
          { value: "Cardiologist" },
          { value: "Neurosurgeon" },
          { value: "Endocrinologist" },
          { value: "ENT Doctor" },
          { value: "Neurosurgeon" },
          { value: "Infertility Specialist" },
          { value: "Andrologist" },
        ]}
        setSelected={fun4}
        placeholder={specialization}
        search={true}
        boxStyles={{
          borderWidth: 0,
          borderBottomWidth: 2,
          borderRadius: 0,
          marginHorizontal: 10,
          borderColor: main_color,
          width: "90%",
          paddingLeft: 5,
          marginBottom: 10,
        }}
        arrowicon={<Icon4 name={"chevron-down"} size={12} color={main_color} />}
        searchicon={<Icon4 name={"search"} size={15} color={main_color} />}
        searchPlaceholder="   search"
        closeicon={<Icon name={"close"} size={15} color={main_color} />}
        dropdownStyles={{
          marginHorizontal: 10,
          borderWidth: 0,
          backgroundColor: "white",
          marginTop: 2,
          width: "90%",
        }}
      />

      <Text
        style={{
          fontSize: 16,
          marginHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        {" "}
        Full Professional Title{" "}
      </Text>

      <TextInput
        style={styles.inp}
        defaultValue={specialization2}
        onChangeText={fun5}
      />
      {/* <TouchableOpacity>
        {professional_licence !== "" ? (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 40,
              alignItems: "center",
            }}
          >
            <Icon5
              name={icon13}
              size={25}
              color={main_color}
              style={{ width: "10%", marginLeft: 15 }}
            />

            <Text style={{ fontSize: 16 }}>
              {" "}
              Upload Professional Title License photo
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 40,
              alignItems: "center",
            }}
          >
            <Image
              source={
                doctor.image
                  ? { uri: doctor.image }
                  : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
              }
              style={[
                styles.image,
                { width: "20%", marginLeft: 15, height: 50 },
              ]}
            />
            <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
              {" "}
              Professional Title License photo
            </Text>
          </View>
        )}
      </TouchableOpacity> */}
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

export default Personal_Information;
