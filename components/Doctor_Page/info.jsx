import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  DatePicker,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import { logout } from "../../database/Users";
const Info = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [birth, setBirth] = useState("select your birth day");
  const [show, setShow] = useState(false);

  const [profile_views, setProfileviews] = useState(10);
  const [bookings, setBookings] = useState(9);
  const [reviews, setReviews] = useState(25);
  const [male, setMale] = useState("unchecked");
  const [female, setFemale] = useState("unchecked");
  const [practise_licence, setPractise_licence] = useState("");
  const [professional_licence, setProfessional_licence] = useState("");
  const [page, setPage] = useState("Profile");
  const [fName, setfName] = useState("Mohamed");
  const [lName, setlName] = useState("Essam");
  const [pro_title, setPro_title] = useState("");
  const [fullpro_title, setFullpro_title] = useState(" Consultant of dinstiy ");

  const [doctor_email, setDoctor_email] = useState("moh.essam@gmail.com");
  const [doctor_phone, setDoctor_phone] = useState("1092297298");
  const [open_password, setOpen_password] = useState(false);

  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");

  const [about_the_doctor, setAbout_theDoctor] = useState("hi");
  const [height, setHeight] = useState(0);
  const [number_of_letters, setNumber_of_letters] = useState(0);

  const [nameClinic, setNameClinic] = useState("Essam Clinic");
  const [numberClinic, setNumberClinic] = useState("01012453522");
  const [nameAssistant, setNameAssistant] = useState("doctor sheeka");
  const [numberAssistant, setNumberAssistant] = useState("01016232521");
  const [exmain, setExmain] = useState(100);
  const [follow_up, setFollow_up] = useState(55);
  const [duration, setDuration] = useState(7);
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
  const icon13 = "drivers-license";
  const icon14 = "arrow-left";
  const icon15 = "content-save-check";
  const icon16 = "user-lock";
  const main_color = "#288771";
  const back = () => {
    setPage("Profile");
    setOpen_password(false);
  };
  const save = () => {
    setPage("Profile");
    setOpen_password(false);
  };
  const onShow = () => {
    setShow(true);
  };

  const ChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setShow(false);
    setBirth(fDate);
  };

  const clickMale = () => {
    setMale("checked");
    setFemale("unchecked");
  };

  const clickFemale = () => {
    setMale("unchecked");
    setFemale("checked");
  };

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

  const edit_name = () => {
    setPage("Professional Information");
  };

  const account_settings = () => {
    setPage("Account Settings");
  };

  const change_password = () => {
    setOpen_password(true);
  };

  const about_doctor = () => {
    setPage("About the Doctor");
  };
  return (
    <View style={{ flex: 1 }}>
      {page === "Profile" ? (
        <View style={[styles.header, { alignItems: "center" }]}>
          <Text style={styles.label}> {page} </Text>
        </View>
      ) : (
        <View style={[styles.header, { flexDirection: "row" }]}>
          <Icon2
            name={icon14}
            size={30}
            color="white"
            onPress={back}
            style={{ width: "7%", marginHorizontal: 10 }}
          />
          <Text style={[styles.label, { width: "78%" }]}> {page} </Text>

          <Icon6
            name={icon15}
            size={30}
            color="white"
            onPress={save}
            style={{ width: "20%" }}
          />
        </View>
      )}
      <ScrollView>
        {page === "Profile" ? (
          <View>
            <View style={styles.content}>
              <View style={{ marginVertical: 5, flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                    marginVertical: 5,
                    width: "90%",
                  }}
                >
                  {" Doctor "}
                  {fName} {lName}
                </Text>
                <Icon
                  onPress={edit_name}
                  name={icon6}
                  size={30}
                  color="#288759"
                  style={{ alignSelf: "flex-end" }}
                />
              </View>
              <Text style={{ color: "black", fontSize: 15 }}>
                {fullpro_title}
              </Text>
              <View style={{ marginVertical: 5, flexDirection: "row" }}>
                <Image
                  source={require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
                  style={[styles.image]}
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
                      {reviews} {" Reviews "}
                    </Text>
                    <TouchableOpacity
                      style={{ alignItems: "center" }}
                      onPress={account_settings}
                    >
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
                        My Account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 5, flexDirection: "row" }}>
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
                    {profile_views}
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
                    {bookings}
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
                <TouchableOpacity onPress={about_doctor}>
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
                      style={{ width: "7%" }}
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
                      style={{ width: "7%" }}
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
                      style={{ width: "7%" }}
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
                      style={{ width: "7%" }}
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
                    <Icon3
                      name={icon10}
                      size={25}
                      color="#288759"
                      style={{ width: "7%" }}
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
                      Clinic Photos{" "}
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
                      },
                    ]}
                  >
                    <Icon4
                      name={icon11}
                      size={25}
                      color="#288759"
                      style={{ width: "7%" }}
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
                      Exmination and Follow-up{" "}
                    </Text>
                    <Icon name={icon6} size={25} color="#288759" />
                  </View>
                  {exmain !== "" || follow_up !== "" ? (
                    <View style={[styles.content, { paddingVertical: 15 }]}>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: "80%",
                          }}
                        >
                          {" "}
                          Exmaination Fees{" "}
                        </Text>
                        <Text>{exmain} EGP</Text>
                      </View>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                            width: "80%",
                          }}
                        >
                          {" "}
                          Follow-up Fees{" "}
                        </Text>
                        <Text> {follow_up} EGP </Text>
                      </View>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            paddingHorizontal: 20,
                            width: "80%",
                          }}
                        >
                          {" "}
                          Follow-up Duration{" "}
                        </Text>
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
                      style={{ width: "7%" }}
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
                        marginTop: 5,
                      },
                    ]}
                  >
                    <Icon2
                      name={icon7}
                      size={25}
                      color="#288759"
                      style={{ width: "7%" }}
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
                    <View
                      style={[
                        styles.content,
                        { paddingVertical: 15, marginDown: 10 },
                      ]}
                    >
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
          </View>
        ) : page === "Professional Information" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              }}
            >
              <Icon2
                name={icon7}
                size={25}
                color="#288759"
                style={{ width: "5%", marginLeft: 5 }}
              />
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: 5,
                  width: "85%",
                }}
              >
                {" "}
                Basic Information{" "}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              First Name{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={fName}
              //placeholder={"last name"}
              onChangeText={setfName}
            />

            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Last Name{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={lName}
              //placeholder={"last name"}
              onChangeText={setlName}
            />

            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Birth Date{" "}
            </Text>
            <Text style={styles.inp} onPress={onShow}>
              {" "}
              {birth}{" "}
            </Text>
            {show && <DateTimePicker value={date} onChange={ChangeDate} />}

            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingBottom: 5,
                marginTop: 20,
                paddingHorizontal: 15,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 40,
                marginTop: 10,
              }}
            >
              <RadioButton
                status={male}
                color={main_color}
                value="male"
                uncheckedColor="black"
                onPress={clickMale}
              />
              <Text
                style={{
                  color: "black",
                  paddingBottom: 5,
                  width: "40%",
                  paddingHorizontal: 5,
                }}
              >
                Male
              </Text>
              <RadioButton
                status={female}
                color={main_color}
                value="female"
                uncheckedColor="black"
                onPress={clickFemale}
              />
              <Text
                style={{
                  color: "black",
                  paddingBottom: 5,
                  paddingHorizontal: 5,
                }}
              >
                Female
              </Text>
            </View>

            <TouchableOpacity>
              {practise_licence === "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 40,
                    alignItems: "center",
                  }}
                >
                  <Icon5
                    name={icon13}
                    size={25}
                    color={main_color}
                    style={{ width: "10%", marginLeft: 15 }}
                  />

                  <Text style={{ fontSize: 16 }}>
                    {" "}
                    Upload Practice License ID photo
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 40,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
                    style={[
                      styles.image,
                      { width: "20%", marginLeft: 15, height: 50 },
                    ]}
                  />
                  <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
                    {" "}
                    Practice License ID photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              }}
            >
              <Icon2
                name={icon8}
                size={25}
                color="#288759"
                style={{ width: "7%", marginLeft: 15 }}
              />
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: 5,
                  width: "85%",
                }}
              >
                {" "}
                Professional Title{" "}
              </Text>
            </View>
            {/* <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 15,
              }}
            >
              {" "}
              Professional Title{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={pro_title}
              onChangeText={setPro_title}
            /> */}
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 15,
              }}
            >
              {" "}
              Full Professional Title{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={fullpro_title}
              onChangeText={setFullpro_title}
            />
            <TouchableOpacity>
              {professional_licence !== "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 40,
                    alignItems: "center",
                  }}
                >
                  <Icon5
                    name={icon13}
                    size={25}
                    color={main_color}
                    style={{ width: "10%", marginLeft: 15 }}
                  />

                  <Text style={{ fontSize: 16 }}>
                    {" "}
                    Upload Professional Title License photo
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 40,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")}
                    style={[
                      styles.image,
                      { width: "20%", marginLeft: 15, height: 50 },
                    ]}
                  />
                  <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
                    {" "}
                    Professional Title License photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ) : page === "Account Settings" ? (
          <View>
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Email address{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={doctor_email}
              keyboardType="email-address"
              //placeholder={"last name"}
              onChangeText={setDoctor_email}
            />

            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              Mobile number{" "}
            </Text>
            <TextInput
              style={styles.inp}
              defaultValue={doctor_phone}
              keyboardType="phone-pad"
              //placeholder={"last name"}
              onChangeText={setDoctor_phone}
            />
            <TouchableOpacity onPress={change_password}>
              <View
                style={[
                  {
                    marginHorizontal: 15,
                    marginVertical: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <Icon4
                  name={icon16}
                  size={25}
                  color={main_color}
                  style={{ width: "10%" }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    // fontStyle: "italic",
                    // fontWeight: "bold",
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  {" "}
                  Change Password{" "}
                </Text>
              </View>
            </TouchableOpacity>

            {open_password ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    // fontStyle: "italic",
                    // fontWeight: "bold",
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  {" "}
                  Current Password{" "}
                </Text>
                <TextInput
                  style={styles.inp}
                  defaultValue={current_password}
                  secureTextEntry
                  onChangeText={setCurrent_password}
                />

                <Text
                  style={{
                    fontSize: 16,
                    // fontStyle: "italic",
                    // fontWeight: "bold",
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  {" "}
                  New Password{" "}
                </Text>
                <TextInput
                  style={styles.inp}
                  defaultValue={new_password}
                  secureTextEntry
                  onChangeText={setNew_password}
                />

                <Text
                  style={{
                    fontSize: 16,
                    // fontStyle: "italic",
                    // fontWeight: "bold",
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  {" "}
                  Confirm New Password{" "}
                </Text>
                <TextInput
                  style={styles.inp}
                  defaultValue={confirm_new_password}
                  secureTextEntry
                  onChangeText={setConfirm_new_password}
                />
              </View>
            ) : (
              <></>
            )}
            <Button onPress={()=>logout()} title="Log Out"/>
          </View>
        ) : page === "About the Doctor" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              }}
            >
              <Icon2
                name={icon7}
                size={25}
                color="#288759"
                style={{ width: "5%", marginLeft: 5 }}
              />
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: 5,
                  width: "85%",
                }}
              >
                {" "}
                About the Doctor{" "}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                // fontStyle: "italic",
                // fontWeight: "bold",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {" "}
              About the Doctor{" "}
            </Text>
            <TextInput
              style={[styles.inp , {height : height }  ] }
              defaultValue={about_the_doctor}
              multiline
              onContentSizeChange={(event) =>
                setHeight(event.nativeEvent.contentSize.height)
              }
              onChangeText={setAbout_theDoctor}
              numberOfLines = {10}
              maxLength={250}
            />
            <Text style = {{alignSelf : "flex-end" , marginHorizontal : 30}}>{about_the_doctor.length} / 250</Text>
          </View>
        ) : (
          <></>
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
    // alignItems: "center",
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

  inp: {
    width: "90%",
    height: 40,
    borderBottomWidth: 2,
    borderColor: "#288771",
    // borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
    // fontStyle: "italic",
    padding: 6,
    color: "#000000",
  },
});

export default Info;
