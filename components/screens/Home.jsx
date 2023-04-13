import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Animated, PanResponder,Dimensions
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Doctor from "../consts/Doctor";
import { AppContext } from "../consts/AppContext";
import DoctorCard2 from "../subcomponents/DoctorCard2";
import { getDoctors } from "../../database/Doctors";
import CurrentUser from "../consts/CurrentUser";
const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { doctors, setDoctors } = useContext(AppContext);
  const [panResponder, setPanResponder] = useState(null);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const height =Dimensions.get('window').height;
  const [fav, setFav] = useState([]);
  async function fetchDoctor() {
    const doctor = await getDoctors();
    setDoctors(doctor);
  }
  useEffect(() => {

    fetchDoctor();
  }, []);
  useEffect(() => {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.event([null, { dy: scrollY }], { useNativeDriver: false })(
            evt,
            gestureState
          );
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -100) {
          Animated.timing(scrollY, {
            toValue: -height,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(scrollY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    });
    setPanResponder(panResponder);
  }, []);

  const renderDoctor = ({ item }) => {
    return (<DoctorCard2 reload={() => { }} doctor={item} navigation={navigation} />
    );
  }
  const footer = () => (
    <View style={{ padding: "18%" }}>
      <ActivityIndicator size={100} color="#00ff00" />
    </View>
  );
  const header = () => (
    <View style={styles.filterCards}>
      <TouchableOpacity
        style={styles.filterCard1}
        onPress={() => {
          navigation.navigate("AllDoctors", { filteritem: "Stomach" });
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
            <Text style={styles.filterCard1Text}>Stomach</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterCard2}
        onPress={() => {
          navigation.navigate("AllDoctors", { filteritem: "Dentist" });
        }}
      >
        <View style={styles.filterCardElements}>
          <View style={styles.cardsIcons}>
            <FontAwesome5 name="tooth" size={60} color="white" />
          </View>
          <View style={styles.filterCard2TextVeiw}>
            <Text style={styles.filterCard2Text}>Dentist</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterCard3}
        onPress={() => {
          navigation.navigate("AllDoctors", { filteritem: "Surgery" });
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
            <Text style={styles.filterCard3Text}>Surgery</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.Title}>
          <Text style={styles.heading}>
            All doctors treat,but a good doctor lets nature heal.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="white"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate("AllDoctors", { all: "all" })}
          >
            <Image
              style={{ height: 35, width: 35, alignItems: "center" }}
              source={require("../assets/filter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
          {doctors.length != 0 ? (
            <Animated.View
            
            style={[
              styles.list,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [-height, height],
                      outputRange: [0, height],
                      extrapolateRight: "clamp",
                    }),
                    
                  },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <FlatList
              removeClippedSubviews={true}
              data={
                doctors.filter((doctor) =>
                  doctor.name.toLowerCase().includes(search.toLowerCase()))
              }
              ListHeaderComponent={header}
              ListFooterComponent={footer}
              renderItem={renderDoctor}
              initialNumToRender={7}
              maxToRenderPerBatch={7}
              windowSize={10}
              keyExtractor={(item, index) => item.id}
              
            />
            </Animated.View>
          ) : (
            <View style={{ padding: "18%" }}>
              <ActivityIndicator size={100} color="#00ff00" />
            </View>
          )}
        





      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#288771",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: 5,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  Title: {
    width: 260,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  list: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop:30,
    backgroundColor: "#fff",
  },
  search: {
    backgroundColor: "#40b488",
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
    width: "60%",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filter: {
    paddingLeft: 8,
    justifyContent: "center",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 15,
    color: "#40b488",
    textAlign: "right",
    marginRight: 20,
    marginTop: 5,
  },
  picker: {
    marginHorizontal: "10%",
    // width: '50%',
    padding: 15,
    borderWidth: 2,
    borderColor: "#288771",
    // color: "#000"
  },
  filterCards: {
    flexDirection: "row",
    height: 140,
    marginHorizontal: "5%",
    marginBottom: 10,
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

export default Home;
