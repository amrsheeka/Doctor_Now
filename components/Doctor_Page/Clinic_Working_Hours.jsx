// still not working

const Clinic_Working_Hours = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          marginVertical: 5,
        }}
      >
        <Icon6
          name={icon25}
          size={30}
          color={main_color}
          style={{ marginLeft: 5 }}
        />

        <Text style={styles.text}>{" Clinic working hours "}</Text>
      </View>
      
      <View style={styles.view}>
        <Text style={styles.text}>{" Saturday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled1 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled1(e);
            console.log(e);
            updateSchedules({
              day: schedules[0].day,
              doctor_id: schedules[0].doctor_id,
              start: schedules[0].start,
              end: schedules[0].end,
              id: schedules[0].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled1}
        />
      </View>

      {isEnabled1 ? (
        shift(
          "Saturday",
          "sat_start",
          "sat_end",
          start,
          end,
          startTime,
          endTime,
          exmination_duration,
          number_of_bookings
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Sunday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled2 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled2(e);
            updateSchedules({
              day: schedules[1].day,
              doctor_id: schedules[1].doctor_id,
              start: schedules[1].start,
              end: schedules[1].end,
              id: schedules[1].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled2}
        />
      </View>
      {isEnabled2 ? (
        shift(
          "Sunday",
          "sun_start",
          "sun_end",
          start1,
          end1,
          startTime1,
          endTime1,
          exmination_duration1,
          number_of_bookings1
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Monday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled3 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled3(e);
            console.log(e);
            updateSchedules({
              day: schedules[2].day,
              doctor_id: schedules[2].doctor_id,
              start: schedules[2].start,
              end: schedules[2].end,
              id: schedules[2].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled3}
        />
      </View>
      {isEnabled3 ? (
        shift(
          "Monday",
          "mon_start",
          "mon_end",
          start2,
          end2,
          startTime2,
          endTime2,
          exmination_duration2,
          number_of_bookings2
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Tuesday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled4 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled4(e);
            console.log(e);
            updateSchedules({
              day: schedules[3].day,
              doctor_id: schedules[3].doctor_id,
              start: schedules[3].start,
              end: schedules[3].end,
              id: schedules[3].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled4}
        />
      </View>
      {isEnabled4 ? (
        shift(
          "Tuesday",
          "tues_start",
          "tues_end",
          start3,
          end3,
          startTime3,
          endTime3,
          exmination_duration3,
          number_of_bookings3
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Wednesday "}</Text>
        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled5 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled5(e);
            console.log(e);
            updateSchedules({
              day: schedules[4].day,
              doctor_id: schedules[4].doctor_id,
              start: schedules[4].start,
              end: schedules[4].end,
              id: schedules[4].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled5}
        />
      </View>
      {isEnabled5 ? (
        shift(
          "Wendesday",
          "wen_start",
          "wen_end",
          start4,
          end4,
          startTime4,
          endTime4,
          exmination_duration4,
          number_of_bookings4
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Thursday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled6 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled6(e);
            console.log(e);
            updateSchedules({
              day: schedules[5].day,
              doctor_id: schedules[5].doctor_id,
              start: schedules[5].start,
              end: schedules[5].end,
              id: schedules[5].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled6}
        />
      </View>
      {isEnabled6 ? (
        shift(
          "Thursday",
          "thurs_start",
          "thurs_end",
          start5,
          end5,
          startTime5,
          endTime5,
          exmination_duration5,
          number_of_bookings5
        )
      ) : (
        <></>
      )}
      <View style={styles.view}>
        <Text style={styles.text}>{" Friday "}</Text>

        <Switch
          trackColor={{ false: "#777777", true: main_color }}
          thumbColor={!isEnabled7 ? "#bbbbbb" : "#009900"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setIsEnabled7(e);
            console.log(e);
            updateSchedules({
              day: schedules[6].day,
              doctor_id: schedules[6].doctor_id,
              start: schedules[6].start,
              end: schedules[6].end,
              id: schedules[6].id,
              avilable: e ? "yes" : "no",
            });
          }}
          value={isEnabled7}
        />
      </View>
      {isEnabled7 ? (
        shift(
          "Friday",
          "fri_start",
          "fri_end",
          start6,
          end6,
          startTime6,
          endTime6,
          exmination_duration6,
          number_of_bookings6
        )
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "black",
    paddingLeft: 5,
    width: "85%",
  },
  view : {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default Clinic_Working_Hours;
