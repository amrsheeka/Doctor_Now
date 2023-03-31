import { all } from "axios";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    TextInput,
    Image,
  } from "react-native";
  import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
  import { logout } from "../../database/Users";
  export default function AdminHome({ navigation }) {
    return (
      <View style={styles.filterCards}>
            <TouchableOpacity
              style={styles.filterCard1}
              onPress={() => {
                navigation.navigate("AddDoctor");
              }}
            >
              <View style={styles.filterCardElements}>
                <View style={styles.cardsIcons}>
                  <MaterialCommunityIcons
                    name="stomach"
                    size={70}
                    color="white"
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
                navigation.navigate("AllDoctors",{all:"all"});
              }}
            >
              <View style={styles.filterCardElements}>
                <View style={styles.cardsIcons}>
                  <FontAwesome5 name="tooth" size={60} color="white" />
                </View>
                <View style={styles.filterCard2TextVeiw}>
                  <Text style={styles.filterCard2Text}>Edit Doctors</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterCard3}
              onPress={() => {
                navigation.navigate("AppointmentList");
              }}
            >
              <View style={styles.filterCardElements}>
                <View style={styles.cardsIcons}>
                  <Image
                    source={require("../assets/surgery.png")}
                    style={{ height: 65, width: 65 }}
                  />
                </View>
                <View style={styles.filterCard3TextVeiw}>
                  <Text style={styles.filterCard3Text}>AppointmentList</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterCard3}
              onPress={() => {
                logout().then(()=>{navigation.navigate("StackNavigator")});
              }}
            >
              <View style={styles.filterCardElements}>
                <View style={styles.cardsIcons}>
                  <Image
                    source={require("../assets/surgery.png")}
                    style={{ height: 65, width: 65 }}
                  />
                </View>
                <View style={styles.filterCard3TextVeiw}>
                  <Text style={styles.filterCard3Text}>Log Out</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
    );
  }
  
  const styles = StyleSheet.create({
    filterCards: {
      flexDirection: "row",
      height: 140,
      marginHorizontal: "5%",
      justifyContent: "center",
      gap: 10,
    },
    filterCard1Text: {
      color: "white",
      fontWeight: "900",
    },
    filterCard1: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#439bdd",
      height: "100%",
    },
    filterCard2Text: {
      color: "white",
      fontWeight: "900",
    },
    filterCard2: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#2bd2fc",
      height: "100%",
    },
    filterCard3Text: {
      color: "white",
      fontWeight: "900",
    },
    filterCard3: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#289ba4",
      height: "100%",
    },
    filterCardElements: {
      flex: 1,
      alignItems: "center",
    },
    cardsIcons: {
      flex: 2,
    },
    filterCard1TextVeiw: {
      flex: 1,
    },
    filterCard2TextVeiw: {
      flex: 1,
    },
    filterCard3TextVeiw: {
      flex: 1,
    },
  });
  