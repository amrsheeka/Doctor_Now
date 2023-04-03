import {StyleSheet,Text,View,TouchableOpacity,Image} from "react-native";
  import { MaterialCommunityIcons, FontAwesome5,Entypo } from "@expo/vector-icons";
  import { logout } from "../../database/Users";
  export default function AdminHome({ navigation }) {
    return (
      <View style={styles.filterCards}>
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
                  <FontAwesome5 name="edit" size={60} color="white" />
                </View>
                <View style={styles.filterCard2TextVeiw}>
                  <Text style={styles.filterCard2Text}>Edit Doctors</Text>
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
                <MaterialCommunityIcons name="bookshelf" size={60} color="white" />
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
                <Entypo name="log-out" size={60} color="white" />
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
      flex:1,
    gap:10,
    },
    filterCard1: {
      flex:1,
      backgroundColor: "#0047ab",
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
    },
    filterCardElements: {
      alignItems: "center",
    },
    cardsIcons: {
      justifyContent: "center",
      alignItems: "center",
    },
    filterCard1TextVeiw: {
      marginTop: 10,
      alignItems: "center",
    },
    filterCard1Text: {
      fontSize: 20,
      color: "white",
    },
    filterCard2: {
      flex:1,
      backgroundColor: "#0066c0",
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
    },
    filterCard2TextVeiw: {
      marginTop: 10,
      alignItems: "center",
    },
    filterCard2Text: {
      fontSize: 20,
      color: "white",
    },
    filterCard3: {
      flex:1,
      backgroundColor: "#039be5",
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
    },
    filterCard3TextVeiw: {
      marginTop: 10,
      alignItems: "center",
    },
    filterCard3Text: {
      fontSize: 20,
      color: "white",
    },
    row1:{
      flex:1,
      flexDirection:"row",
      gap:10,
    },
    row2:{
      flex:1,
      flexDirection:"row",
      gap:10,
    },
  });
  