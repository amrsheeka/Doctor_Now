import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { getAllAppointment, logout } from "../../database/Users";
import { AppContext } from "../consts/AppContext";
import { useContext } from "react";
import { useEffect } from "react";
export default function AdminHome({ navigation }) {
  const mainColor = "#288771";
  const { doctors, setDoctors } = useContext(AppContext);
  const { appointments, setAppointments } = useContext(AppContext);
  useEffect(() => {
    getAllAppointment().then((res) => {
      res.length >= 1 ? setAppointments(res) : setFlag(false);
    });
  }, []);
  return (
    <View style={styles.filterCards}>
      <ImageBackground source={require("../assets/stat.png")} style={{
        height: "100%", width: "100%",
        position: "absolute", borderRadius: 20
      }} />
      <View style={styles.row11}>

      <View style={styles.filterCard11}>
          <View style={styles.cardsIcons}>
            <Text style={styles.number}>{doctors.length}</Text>
          </View>
          <View style={styles.filterCard1TextVeiw}>
            <Text style={styles.filterCard11Text}>Payments</Text>
          </View>
        </View>
        <View style={styles.filterCard11}>
          <View style={styles.cardsIcons}>
            <Text style={styles.number}>{doctors.length}</Text>
          </View>
          <View style={styles.filterCard1TextVeiw}>
            <Text style={styles.filterCard11Text}>Doctors</Text>
          </View>
        </View>
        <View style={styles.filterCard11}>
          <View style={styles.cardsIcons}>
            <Text style={styles.number}>{appointments.length}</Text>
          </View>
          <View style={styles.filterCard1TextVeiw}>
            <Text style={styles.filterCard11Text}>appointments</Text>
          </View>
        </View>
      </View>
      <View style={styles.row1}>
        <TouchableOpacity
          style={styles.filterCard1}
          onPress={() => {
            navigation.navigate("AddDoctor");
          }}
        >
          <View style={styles.filterCardElements}>
            <View style={styles.cardsIcons}>
              <MaterialCommunityIcons
                name="plus"
                size={70}
                color={mainColor}
              />
            </View>
            <View style={styles.filterCard1TextVeiw}>
              <Text style={styles.filterCard1Text}>Add Doctor</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterCard2}
          onPress={() => {
            navigation.navigate("AllDoctors", { all: "all" });
          }}
        >
          <View style={styles.filterCardElements}>
            <View style={styles.cardsIcons}>
              <FontAwesome5 name="edit" size={60} color={mainColor} />
            </View>
            <View style={styles.filterCard2TextVeiw}>

              <Text style={styles.filterCard2Text}>Doctors</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row2}>

        <TouchableOpacity
          style={styles.filterCard3}
          onPress={() => {
            navigation.navigate("AppointmentList");
          }}
        >
          <View style={styles.filterCardElements}>
            <View style={styles.cardsIcons}>
              <MaterialCommunityIcons name="bookshelf" size={60} color={mainColor} />
            </View>
            <View style={styles.filterCard3TextVeiw}>
              <Text style={styles.filterCard3Text}>AppointmentList</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterCard3}
          onPress={() => {
            logout().then(() => { navigation.navigate("StackNavigator") });
          }}
        >
          <View style={styles.filterCardElements}>
            <View style={styles.cardsIcons}>
              <Entypo name="log-out" size={60} color={mainColor} />
            </View>
            <View style={styles.filterCard3TextVeiw}>
              <Text style={styles.filterCard3Text}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterCards: {
    flex: 1,
    gap: 20,
  },
  filterCard1: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterCard11: {
    flex: 1,
    //backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  filterCard22: {
    flex: 1,
    //backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  filterCardElements: {
    alignItems: "center",
  },
  cardsIcons: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterCard1TextVeiw: {
    marginTop: 20,
    alignItems: "center",
  },
  filterCard1Text: {
    fontSize: 20,
  },
  filterCard11Text: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  filterCard2: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: "center",
    justifyContent: "center",
    //elevation: 3,
    borderRadius: 20,
    borderColor: "#288771",
  },
  filterCard2TextVeiw: {
    marginTop: 30,
    alignItems: "center",
  },
  filterCard2Text: {
    fontSize: 20,
  },
  filterCard3: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterCard3TextVeiw: {
    marginTop: 20,
    alignItems: "center",
  },
  filterCard3Text: {
    fontSize: 20,
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  row11: {
    flex: 1,
    flexDirection: "row",

    borderRadius: 20,
    //backgroundColor: "transparent",
  },
  row2: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  number: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 50,
    fontWeight: "bold",
  },

});
