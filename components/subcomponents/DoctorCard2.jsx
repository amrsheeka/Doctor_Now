import React, { memo, useEffect, useState,useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext,AppProvider } from "../consts/AppContext";
import { insertFavourite, deleteFavourite, getAppointment_by_doc_id } from "../../database/Users";
import { getinFavourite } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { getFavourite } from "../../database/Users";
import getTimeList from "../../database/getTimeList";
const DoctorCard2 = ({ navigation, doctor, reload }) => {
  let image = doctor.image;
  const {night} = useContext(AppContext);
  const { favourite, setFavourite } = useContext(AppContext);
  const { timeList, setTimeList } = useContext(AppContext)
  const [infav, setInfav] = useState(false);
  async function fetchDoctor() {
    const filt = await getFavourite(CurrentUser.user.id);
    setFavourite(filt);
  }
  async function fetchFavouriteinfav() {
    try {
      const fav = await getinFavourite(CurrentUser.user.id, doctor.id).then(
        (data)=>{
          if (data.status=="success") {
            setInfav(true);
          }else{
            setInfav(false);
          }
        }
      );
      
      
    } catch (err) {
      console.log(err);
    }

  }
  function fetch(){
    var timeList1 = getTimeList(doctor.start, doctor.end);
    getAppointment_by_doc_id(doctor.id, new Date().toDateString()).then((res) => {
      res.status != "failed" ? res.map((e) => {
        timeList1 = timeList1.filter(ele => ele !== e.time.toString())
      }) : setTimeList(timeList1);
      setTimeList(timeList1);
    }
    )
  }
  useEffect(() => {
    
    fetchFavouriteinfav();
  }, []);
  const handleFav = async (user_id, doctor_id) => {
    if (infav) {
      deleteFavourite(user_id, doctor_id).then(() => {
        fetchFavouriteinfav();
      }
      ).then(
        ()=>{
          reload();
          fetchDoctor();
        }
      )
    } else {
      insertFavourite(user_id, doctor_id).then(() => {
        fetchFavouriteinfav();
      }
      ).then(
        ()=>{
          reload();
          fetchDoctor();
        }
      )
    }
    setInfav(!infav);
  }

  return (
    <TouchableOpacity
      key={doctor.id}
      onPress={() => navigation.navigate("Doctorbage", { doctor })}>
      <View style={[styles.card, night && styles.darkCard]}>

        <Image source={image ? { uri: image } : require("../assets/Herbal_Medicine_Male_Avatar.png")}
          defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")} style={styles.cardPhoto} />
        <View style={styles.cardContent}>
          <View style={{ width: "50%" }}>

            <Text numberOfLines={2} ellipsizeMode='tail'
              style={styles.cardTitle}>{doctor.name}</Text>


            <Text numberOfLines={2} ellipsizeMode='tail'
              style={styles.cardDoctor}>{doctor.title + "," + doctor.specialization1 + "," + doctor.specialization1}</Text>
          </View>
          <TouchableOpacity style={[styles.cardButton, night && styles.buttonDark]}
            onPress={() => {
              fetch();
              navigation.navigate("AppointmentConfirmation", { doctor })
            }}
          >
            <Text style={styles.cardButtonText}>Make Appointment</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {handleFav(CurrentUser.user.id, doctor.id);}}
          style={{}}>
          {
            infav ? (
              <MaterialIcons
                name="favorite"
                size={30}
                color={night? "#0D1E3D":"#288771"}
              />
            ) : (
              <MaterialIcons
                name="favorite-border"
                size={30}
                color={night? "#0D1E3D":"#288771"}
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
  buttonDark: {
    backgroundColor: '#0D1E3D',
  },
  darklist:{
    backgroundColor: '#142E5E',
  },
  dark2:{
    backgroundColor:"#BDD3FF",
  },
  darkCard:{
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    
  },
});
export default memo(DoctorCard2);
