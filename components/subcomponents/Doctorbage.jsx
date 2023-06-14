import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  insertReviews,
  getReviews,
  getRate,
  insertRate,
} from "../../database/Users";
import { AppContext } from "../consts/AppContext";
import { Rating, AirbnbRating } from "react-native-elements";
import CurrentUser from "../consts/CurrentUser";

const Doctorbage = ({ navigation, route }) => {
  let item = route.params.doctor;
  let image = item.image;
  const { curruser } = useContext(AppContext);
  const [text, setText] = useState("");
  const [ratecount, setRatecount] = useState("");

  const [count, setCount] = useState(0);
  const { rev, setRev } = useContext(AppContext);
  const [rate, setRate] = useState();

  async function get(id) {
    getReviews(id).then((res) => {
      setRev(res);
    });
  }
  async function get_rate(id) {
    getRate(id).then((res) => {
      setRate(res);
      //console.log(res);
    });
    //console.log(rate);
  }

  const InsertRev = async () => {
    insertReviews(curruser.id, item.id, text, curruser.name).then((res) => {
      get(item.id);
      console.log(res);
    });
  };

  const InsertRate = async () => {
    get_rate(item.id).then(() => {
      let dd = rate.filter((e) => e.users_id == curruser.id);
      if (dd.length > 0) {
        console.log("3mal abl kda");
      } else {
        insertRate(curruser.id, item.id, ratecount)
          .then((res) => {
            console.log(res);
          })
          .then(() => {
            get_rate(item.id);
          });
      }
    });

    // console.log(ratecount);
  };

  const Item = ({ title }) => (
    <View>
      <Text>
        {title.user_name}: {title.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <View style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>Doctor page</Text>
        </View>
      </View>
      {/*/////////////////////////////////  */}
      <View style={styles.header}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/Herbal_Medicine_Male_Avatar.png")
          }
          style={styles.cardPhoto}
        />
        <View style={styles.textbox}>
          <Text style={styles.text1}> {item.name}</Text>
          <Text style={styles.text2}> {item.describtion}</Text>
        </View>
      </View>
      {/*//////////////////////////////*/}

      <View style={styles.body}>
        <View style={styles.box}>
          <Text style={styles.text}>Patients</Text>
          <TouchableOpacity>
            <Text style={styles.text}>{1600}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>price</Text>
          <TouchableOpacity>
            <Text style={styles.text}>{item.price}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Review</Text>
          <TouchableOpacity>
            <Text style={styles.text}>3.00 K</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ////////////////////////// */}

      <View style={styles.rate}>
        <Rating
          showRating
          count={5}
          reviews={["Terrible", "Bad", "OKay", "Good", "Amazing"]}
          onFinishRating={(res) => {
            setRatecount(res);
          }}
        />
      </View>
      <Button title=" Rate " onPress={InsertRate} />
      {/* ///////////////////////// */}
      <View style={styles.senbutt}>
        <Text> Add Reviewe to this doctor</Text>
        <TextInput
          placeholder="Text"
          keyboardType="email-address"
          onChangeText={(text) => setText(text)}
          style={[styles.input2]}
        />
        <TouchableOpacity onPress={() => InsertRev()}>
          <Text style={styles.text}>add</Text>
        </TouchableOpacity>
      </View>
      {/* ///////////////////////// */}

      {rev.length != 0 ? (
        <FlatList
          data={rev}
          renderItem={({ item }) => <Item title={item} />}
          keyExtractor={(item) => item.id}
        />
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
    // padding: 20,
    backgroundColor: "#ffffff",
  },
  header1: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 30,
    backgroundColor: "#288771",

    // marginBottom: 20,
  },
  Go_Back1: {
    // marginTop:15,
    width: "35%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    flex: 2,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    // marginVertical: 6,
    margin: 5,
    padding: 10,
  },
  cardPhoto: {
    width: "40%",
    height: "80%",
    borderRadius: 15,
  },
  text1: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    paddingLeft: 5,
    paddingRight: 18,
    fontSize: 16,
    textAlign: "justify",
  },
  ratetext: {
    paddingTop: 100,
  },
  textbox: {
    width: 250,
    fontSize: 16,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    height: "50%",
    width: "32%",
    borderWidth: 3,
    borderColor: "#efefef",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  rate: {
    height: "15%",
    flexDirection: "row",
    paddingLeft: 10,
  },
  input2: {
    backgroundColor: "#eceff1",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  senbutt: {
    //flexDirection: "row",
  },
});

export default Doctorbage;
