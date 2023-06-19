// import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import CurrentUser from "../consts/CurrentUser";
import { TextInput } from "react-native-paper";
import {
  AntDesign,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import { AppContext } from "../consts/AppContext";
import { pay } from "../../database/Payment";
import Icon2 from "react-native-vector-icons/Entypo";
const Payment = ({ navigation, route }) => {
  const plan = route.params.selectedPlan;
  const [ammount, setAmmount] = useState(
    plan == "basic" ? "499" : plan == "premium" ? "999" : "1249"
  );
  const [appoints, setAppoints] = useState(
    plan == "basic" ? "5" : plan == "premium" ? "12" : "20"
  );
  const [card_number, setCard_Number] = useState("");
  const [card_numbererr, setCard_NumberERR] = useState("");
  const [cvv, setCVV] = useState("");
  const [cvverr, setCVVERR] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryerr, setExpiryERR] = useState("");
  const { night } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { doctor, setDoctor } = useContext(AppContext);
  const main_color = "#288771";
  const handlePayment = async () => {
    if (
      !card_number ||
      !cvv ||
      !expiry ||
      card_number < 16 ||
      cvv.length < 3 ||
      expiry.length < 5
    ) {
      if (!card_number) {
        setCard_NumberERR("Enter your card number.");
      } else if (card_number < 16) {
        setCard_NumberERR("Card number should have 16 digits.");
      } else {
        setCard_NumberERR("");
      }
      if (!cvv) {
        setCVVERR("Enter the card's cvv.");
      } else if (cvv.length < 3) {
        setCVVERR("CVV shuld contain 4 digits");
      } else {
        setCVVERR("");
      }
      if (!expiry) {
        setExpiryERR("Enter the expiry date");
      } else if (expiry.length < 5) {
        setExpiryERR("Enter a valid expiry date");
      } else {
        setExpiryERR("");
      }
    } else {
      setCard_NumberERR("");
      setExpiryERR("");
      setCVVERR("");
      pay(doctor.id, card_number, appoints, ammount, cvv, expiry).then(
        (res) => {
          if (res.status == "success") {
            setModalVisible(true);
          } else {
            alert(res.status);
          }
        }
      );
    }
  };
  const handleExpiry = (input) => {
    let s = "";
    s = input;
    if (s.length == 2 && expiry.length == 1) {
      setExpiry(input + "/");
    } else {
      setExpiry(input);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={[styles.header2, { flexDirection: "row" }]}>
        <Icon2
          name={"arrow-left"}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={{ width: "7%", marginHorizontal: 10 }}
        />
        <Text style={styles.label}> Payment </Text>
      </View>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign name="checkcircle" size={120} style={styles.icon2} />
              <Text style={styles.modalText}>Paid successfully</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={{ marginVertical: 10, alignSelf: "center" }}>
          <Image
            source={require("../assets/payment.png")}
            style={{ height: 250, width: 250 }}
          />
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
          <TextInput
            label={"Card Number"}
            mode="outlined"
            value={card_number}
            keyboardType="number-pad"
            onChangeText={setCard_Number}
            maxLength={16}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
            }}
            placeholder={"5975 4544 7775 4454"}
            placeholderTextColor={"grey"}
            // left={
            //   <TextInput.Icon
            //     icon={() => (
            //       <Icon2 name={"numeric-9-plus-box-multiple-outline"} size={25} />
            //     )}
            //   />
            // }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{card_numbererr}</Text>
          <View styel={{ flexDirection: "row" }}>
            <TextInput
              label={"Expiry Date"}
              mode="outlined"
              value={expiry}
              keyboardType="number-pad"
              onChangeText={handleExpiry}
              maxLength={5}
              outlineStyle={{
                borderColor: main_color,
                borderRadius: 10,
              }}
              placeholder={"6/25"}
              placeholderTextColor={"grey"}
              // left={
              //   <TextInput.Icon
              //     icon={() => (
              //       <Icon2 name={"numeric-9-plus-box-multiple-outline"} size={25} />
              //     )}
              //   />
              // }
              activeOutlineColor={main_color}
            />
            <Text style={{ color: "red" }}>{expiryerr}</Text>

            <TextInput
              label={"CVV"}
              mode="outlined"
              value={cvv}
              keyboardType="number-pad"
              onChangeText={setCVV}
              maxLength={4}
              outlineStyle={{
                borderColor: main_color,
                borderRadius: 10,
              }}
              placeholder={"6556"}
              placeholderTextColor={"grey"}
              // left={
              //   <TextInput.Icon
              //     icon={() => (
              //       <Icon2 name={"numeric-9-plus-box-multiple-outline"} size={25} />
              //     )}
              //   />
              // }
              activeOutlineColor={main_color}
            />
            <Text style={{ color: "red" }}>{cvverr}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handlePayment();
          }}
        >
          <Text style={{ alignSelf: "center" }}>Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header2: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    // alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 35,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    // marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },

  Go_Back: {
    // marginTop:15,
    // // width:"10%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",
    width: "10%",
    // left:1
  },
  Go_Back1: {
    // marginTop:15,
    width: "35%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",
  },
  content: {
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 5,
  },
  content1: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: "5%",
  },
  icon: {
    flexDirection: "row",
    gap: 10,
  },
  smallicon: {
    flexDirection: "row",
    borderWidth: 2,
    padding: 20,
    borderColor: "#ffffff",
    backgroundColor: "#efefef",
    borderRadius: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: 10,
    padding: 5,
  },
  text1: {
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    marginHorizontal: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  input1: {
    height: 50,
    width: "100%",
    marginHorizontal: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  input2: {
    height: 50,
    width: "10%",
    marginHorizontal: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
  },
  biginput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    fontSize: 18,
    paddingHorizontal: "40%",
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: "#ffffff",
    backgroundColor: "#288771",
    justifyContent: "center",
    height: 50,
  },
  footer: {
    paddingVertical: 50,
  },
  buttonDark: {
    backgroundColor: "#1d1c1c",
    color: "white",
  },
  dark2: {
    backgroundColor: "#262424",
    color: "white",
    borderColor: "#262424",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#288771",
  },
  buttonClose: {
    backgroundColor: "#288771",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon2: {
    color: "#288771",
    padding: 20,
  },
});

export default Payment;
