import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { insertFavourite, deleteFavourite } from "../../database/Users";
import { getinFavourite } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
const DoctorCard2 = ({ navigation, doctor, reload }) => {
  let image = doctor.image;
  const [infav, setInfav] = useState(false);
  useEffect(() => {
    async function fetchFavouriteinfav() {
      try {
        const fav = await getinFavourite(CurrentUser.user.id, doctor.id).then(
          (data)=>{
            if (data.status=="success") {
              setInfav(true);
            }
          }
        );
        
        
      } catch (err) {
        console.log(err);
      }

    }
    fetchFavouriteinfav();
  }, []);
  const handleFav = async (user_id, doctor_id) => {
    if (infav) {
      deleteFavourite(user_id, doctor_id).then(() => {

      }
      )
    } else {
      insertFavourite(user_id, doctor_id).then(() => {

      }
      )
    }
    setInfav(!infav);
  }

  return (
    <TouchableOpacity
      key={doctor.id}
      onPress={() => navigation.navigate("Doctorbage", { doctor })}>
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
            onPress={() => navigation.navigate("AppointmentConfirmation", { doctor })}
          >
            <Text style={styles.cardButtonText}>Make Appointment</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {handleFav(CurrentUser.user.id, doctor.id);reload();}}
          style={{}}>
          {
            infav ? (
              <MaterialIcons
                name="favorite"
                size={30}
                color="#288771"
              />
            ) : (
              <MaterialIcons
                name="favorite-border"
                size={30}
                color="#288771"
              />
            )
          }

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
export default memo(DoctorCard2);
