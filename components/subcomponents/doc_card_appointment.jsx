import React, { memo} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";

const doc_card_appointment = ({ navigation }) =>{
  let image ='../assets/Appointment.png'
  let doctor = { name: 'alaa', title: 'sdsd', specialization1: 'sdsdsd'}
  return (
    <View>
      <View style={styles.card}>

        <Image source={image ? { uri: image } : require("../assets/Herbal_Medicine_Male_Avatar.png")}
          defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")} style={styles.cardPhoto} />
        <View style={styles.cardContent}>
          <View style={{ width: "50%" }}>

            <Text numberOfLines={2} ellipsizeMode='tail'
              style={styles.cardTitle}>{doctor.name}</Text>


            <Text numberOfLines={2} ellipsizeMode='tail'
              style={styles.cardDoctor}>{doctor.title + "," + doctor.specialization1 + "," + doctor.specialization1}</Text>
          </View>
          <TouchableOpacity style={styles.cardButton}
            onPress={() => Update}
          >
            <Text style={styles.cardButtonText}>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}
            onPress={() => Delete}
          >
            <Text style={styles.cardButtonText}>Decline </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fc",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    height: 200,

  },
  cardPhoto: {
    width: "30%",
    height: "80%",
    margin: 5,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"

  },
  cardDoctor: {
    fontSize: 14,
    color: "#555",

  },
  cardButton: {
    backgroundColor: "#288771",
    padding: 8,
    borderRadius: 5,
    width: "50%",
    marginTop: "10%",

  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default memo(doc_card_appointment);
