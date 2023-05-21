// still not working

import { View, Text, StyleSheet, TextInput } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const Shift = (
  day,
  day_start,
  day_end,
  s,
  e,
  start_time,
  end_time,
  exmin,
  booking
) => {
  return (
    <View
      style={[
        styles.content,
        {
          // flexDirection: "row",
          // width: "90%",
          marginHorizontal: 10,
          marginBottom: 15,
          paddingVertical: 15,
        },
      ]}
    >
      <Text style={styles.text}>
        {day}
        {" shift "}
      </Text>

      <View style={{ flexDirection: "row" }}>
        {show_time === 1 && (
          <DateTimePicker
            value={start_time}
            onChange={ChangeTime1}
            mode={"time"}
            is24Hour={false}
          />
        )}
        <Text
          style={[styles.inp, { width: "45%" }]}
          onPress={() => {
            setShow_time(1);
            setWhich(day_start);
          }}
        >
          {s}{" "}
        </Text>
        {show_time === 10 && (
          <DateTimePicker
            value={end_time}
            onChange={ChangeTime1}
            mode={"time"}
            is24Hour={false}
          />
        )}
        <Text
          style={[styles.inp, { width: "45%" }]}
          onPress={() => {
            setShow_time(10);
            setWhich(day_end);
          }}
        >
          {e}{" "}
        </Text>
      </View>
      {selected == "First In First Out" ? (
        <View>
          <Text style={styles.text}> {"Number of bookings"} </Text>

          <TextInput
            style={[styles.inp, { width: "95%" }]}
            value={booking + ""}
            keyboardType="phone-pad"
            onChangeText={bookings_number(booking)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.text}> {"Exmination Duration (Minutes)"} </Text>
          <TextInput
            style={styles.inp}
            keyboardType="phone-pad"
            value={exmin}
            placeholder={"30 Mins"}
            onChangeText={exmin_duration(exmin)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "black",
    paddingLeft: 12,
    width: "85%",
  },
  content: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 7,

    // marginBottom: 3,
    marginHorizontal: 3,
  },

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

export default Shift;
