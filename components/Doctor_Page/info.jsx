import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome5";

const Home = ({ navigation }) => {
  const [nameClinic, setNameClinic] = useState("Essam Clinic");
  const [numberClinic, setNumberClinic] = useState("01012453522");
  const [nameAssistant, setNameAssistant] = useState("doctor sheeka");
  const [numberAssistant, setNumberAssistant] = useState("01016232521");
  const [exmain, setExmain] = useState("100");
  const [follow_up, setFollow_up] = useState("55");
  const [duration, setDuration] = useState("7");
  const [flag, setFlag] = useState(true);
  const [color1, setColor1] = useState("#288759");
  const [color2, setColor2] = useState("black");
  const [icon1, setIcon1] = useState("star");
  const [icon2, setIcon2] = useState("star");
  const [icon3, setIcon3] = useState("star");
  const [icon4, setIcon4] = useState("star");
  const [icon5, setIcon5] = useState("star");

  const icon6 = "edit";
  const icon7 = "info";
  const icon8 = "graduation-cap";
  const icon9 = "world";
  const icon10 = "photograph";
  const icon11 = "file-invoice-dollar";
  const icon12 = "location-pin";

  const Doctor_info = () => {
    setFlag(true);
    setColor1("#288759");
    setColor2("black");
  };

  const Clinic_info = () => {
    setFlag(false);
    setColor1("black");
    setColor2("#288759");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.label}> Profile </Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.footer}>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 5,
                width: "90%",
              }}
            >
              {" "}
              {" Doctor Mohamed Essam "}{" "}
            </Text>
            <Icon
              name={icon6}
              size={30}
              color="#288759"
              style={{ alignSelf: "flex-end" }}
            />
          </View>
          <Text style={{ color: "black", fontSize: 15 }}>
            {" "}
            {" Consultant of dinstiy "}{" "}
          </Text>
          <View style={styles.footer}>
            <Image
              source={require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
              style={styles.image}
            />

            <View style={{ width: "55%", justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Icon name={icon1} size={35} color="gold" />
                <Icon name={icon2} size={35} color="gold" />
                <Icon name={icon3} size={35} color="gold" />
                <Icon name={icon4} size={35} color="gold" />
                <Icon name={icon5} size={35} color="gold" />
              </View>

              <View>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  {" "}
                  {"25 Reviews "}{" "}
                </Text>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      backgroundColor: "#288759",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      color: "white",
                      margin: 20,
                    }}
                  >
                    {" "}
                    Press Here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ width: "50%" }}>
            <View style={styles.content}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {" "}
                {" 10 "}{" "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                {" "}
                {" Profile Views "}{" "}
              </Text>
            </View>
          </View>

          <View style={{ width: "50%" }}>
            <View style={styles.content}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {" "}
                {" 9 "}{" "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                {" "}
                {" Bookings "}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.content,
            {
              flexDirection: "row",
              width: "100%",
              margin: 3,
              paddingVertical: 15,
            },
          ]}
        >

          <TouchableOpacity
            style={{ width: "50%", alignItems: "center" }}
            onPress={Doctor_info}
          >
            <Text
              style={{
                color: color1,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" Doctor info "}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "50%", alignItems: "center" }}
            onPress={Clinic_info}
          >
            <Text
              style={{
                color: color2,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {" "}
              {" Clinic info "}{" "}
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>

        {flag ? (
          <View>
            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                <Icon2
                  name={icon7}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  About the Doctor{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                <Icon2
                  name={icon8}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  Education{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                <Icon3
                  name={icon9}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  Spoken Languages{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  { flexDirection: "row", paddingVertical: 15 },
                ]}
              >
                <Icon2
                  name={icon7}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  Clinic Name and Number{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>

              {nameClinic !== "" || numberClinic !== "" ? (
                <View style={[styles.content, { paddingVertical: 15 }]}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    {nameClinic}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingHorizontal: 20,
                    }}
                  >
                    {numberClinic}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                <Icon3 name={icon10} size={25} color="#288759" style={{ width: "5%" }}/>
                <Text style={{color: "black",fontSize: 15,paddingHorizontal: 5,width: "85%"}}> Clinic Photos </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                  },
                ]}
              >
                <Icon4
                  name={icon11}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text style={{color: "black",fontSize: 15,paddingHorizontal: 5,width: "85%"}}> Exmination and Follow-up </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
              {exmain !== "" || follow_up !== "" ? (
                <View style={[styles.content, { paddingVertical: 15 }]}>
                  <View style = {{flexDirection: "row" ,  width : "100%"}}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingHorizontal: 20,
                      width: "80%",
                    }}
                  > Exmaination Fees </Text>
                  <Text>{exmain} EGP</Text>

                  </View>
                  <View style = {{flexDirection: "row" , width : "100%"}}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingHorizontal: 20,
                      paddingBottom: 10,
                      width: "80%",
                    }}
                  > Follow-up Fees </Text>
                  <Text> {follow_up} EGP </Text>
                  </View>
                  <View style = {{flexDirection: "row" , width : "100%"}}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingHorizontal: 20,
                      width: "80%",
                    }}
                  > Follow-up Duration  </Text>
                  <Text> {duration} Days </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                <Icon2
                  name={icon12}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  Clinic Address{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    paddingVertical: 15,
                    marginTop : 5 ,
                  },
                ]}
              >
                <Icon2
                  name={icon7}
                  size={25}
                  color="#288759"
                  style={{ width: "5%" }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 5,
                    width: "85%",
                  }}
                >
                  {" "}
                  Assistant Name and Number{" "}
                </Text>
                <Icon name={icon6} size={25} color="#288759" />
              </View>
              {nameClinic !== "" || numberClinic !== "" ? (
                <View style={[styles.content, { paddingVertical: 15 , marginDown : 10}]}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    {nameAssistant}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingHorizontal: 20,
                    }}
                  >
                    {numberAssistant}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <StatusBar style="light" backgroundColor="#288759" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  content: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7eceb",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 7,

    // marginBottom: 3,
    marginHorizontal: 3,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },

  footer: {
    marginVertical: 5,
    flexDirection: "row",
  },
});

export default Home;
