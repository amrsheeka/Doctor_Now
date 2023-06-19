import React, { memo, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Fontisto";
import { Rating, AirbnbRating } from "react-native-elements";

// import { MaterialIcons } from "@expo/vector-icons";
import { AppContext, AppProvider } from "../consts/AppContext";
import { getRate, get_app_by_doc_id_user_id } from "../../database/Users";
import FlipCard from "react-native-flip-card";
import {
  insertFavourite,
  deleteFavourite,
  getAppointment_by_doc_id,
} from "../../database/Users";
import { getReviews } from "../../database/Users";
import { getinFavourite } from "../../database/Users";
import CurrentUser from "../consts/CurrentUser";
import { getFavourite } from "../../database/Users";
import getTimeList from "../../database/getTimeList";
import { editDoctor, getDocSchedule, updateDoctor } from "../../database/Doctors";
const DoctorCard2 = ({ navigation, doctor, reload }) => {
  let image = doctor.image;
  const { night } = useContext(AppContext);
  const { favourite, setFavourite } = useContext(AppContext);
  const { timeList, setTimeList } = useContext(AppContext);
  const { rev, setRev } = useContext(AppContext);
  const [infav, setInfav] = useState(false);
  const [rate, setRate] = useState([]);
  const [av_rate, setAv_rate] = useState();
  const { refreshing, setRefreshing } = useContext(AppContext);
  const [heart, setHeart] = useState("favorite-border");
  const [clickReadMore, setClickReadMore] = useState(false);
  const [active, setActive] = useState(doctor.active == 0 ? true : false);
  const { setDays } = useContext(AppContext);
  const { setStartTime } = useContext(AppContext);
  const { setEndTime } = useContext(AppContext);
  const { setNumberOfPatients } = useContext(AppContext);
  const { setComments } = useContext(AppContext);
  const { setCommentIsExist } = useContext(AppContext);
  const { setRateNumber } = useContext(AppContext);
  const { setCommentText } = useContext(AppContext);
  const { setApps_doc_user } = useContext(AppContext);
  console.log(doctor.active);
  const handleActive = () => {
    let doc = doctor;
    console.log(doctor)
    doc['active'] = doc.active == 0 ? 1 : 0;
    updateDoctor(doc).then(() => {
      setActive(!active);
    });
  }
  const initActive = () => {
    setActive(doctor.active == 0 ? true : false);
  }
  async function get_rate(id) {
    getRate(id).then((res) => {
      setRate(res);
      // console.log(res);
    });
    // console.log(rate);
  }

  const rate_lenth = rate.length;

  async function countAv_rate() {
    let ratecount = 0;
    for (var i = 0; i < rate_lenth; i++) {
      ratecount += rate[i].rate_count;
    }
    //console.log(ratecount);
    let vvvv = Math.floor(ratecount / rate_lenth);
    if (vvvv > 0) {
      setAv_rate(vvvv);
    } else {
      setAv_rate(0);
    }
  }

  async function fetchDoctor() {
    const filt = await getFavourite(CurrentUser.user.id);
    setFavourite(filt);
  }

  async function fetchFavouriteinfav() {
    try {
      const fav = await getinFavourite(CurrentUser.user.id, doctor.id).then(
        (data) => {
          if (data.status == "success") {
            setHeart("favorite");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  function fetch() {
    var timeList1 = getTimeList(doctor.start, doctor.end);
    getAppointment_by_doc_id(doctor.id, new Date().toDateString()).then(
      (res) => {
        res.status != "failed"
          ? res.map((e) => {
            timeList1 = timeList1.filter((ele) => ele !== e.time.toString());
          })
          : setTimeList(timeList1);
        setTimeList(timeList1);
      }
    );
  }

  useEffect(() => {
    fetchFavouriteinfav();
    initActive();
    //fetchDoctor();
    //get_rate(doctor.id);
    //countAv_rate();
    // const focusHandler = navigation.addListener('focus', () => {
    //   alert('Refreshed');
    // });
    // return focusHandler;
  }, []);

  const click_heart = async (user_id, doctor_id) => {
    if (heart == "favorite") {
      setHeart("favorite-border");
      deleteFavourite(user_id, doctor_id).then(() => {
        //fetchFavouriteinfav();
        fetchDoctor();
      });
    } else {
      setHeart("favorite");
      insertFavourite(user_id, doctor_id).then(() => {
        //fetchFavouriteinfav();
        fetchDoctor();
      });
    }
  };

  async function get(id) {
    getReviews(id).then((res) => {
      setRev(res);
    });
  }

  //console.log(allrev);
  async function handelRout() {
    get(doctor.id).then(() => {
      navigation.navigate("Doctorbage", { doctor });
    });
  }

  const [icon1, setIcon1] = useState("star");
  const [icon2, setIcon2] = useState("star");
  const [icon3, setIcon3] = useState("star");
  const [icon4, setIcon4] = useState("star");
  const [icon5, setIcon5] = useState("star");
  const { f, setF } = useContext(AppContext);
  const main_color = "#288771";

  const Face_Card = () => {
    return (
      <TouchableOpacity
      // onPress={() => {
      //   handelRout();
      // }}
      >
        <View style={{ marginVertical: 5, flexDirection: "row" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              width: "90%",
            }}
          >
            {doctor.title1} {doctor.name}
          </Text>

          <Icon
            onPress={() => click_heart(CurrentUser.user.id, doctor.id)}
            name={heart}
            size={30}
            color={night ? "#dfd9d9" : main_color}
          />
        </View>
        <Text
          style={{ color: "black", fontSize: 15 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {doctor.title} - {doctor.specialization1}
        </Text>
        <View
          style={{ marginVertical: 5, flexDirection: "row", width: "100%" }}
        >
          <View style={{ width: "45%" }}>
            {/*  onPress={fun2} */}
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../assets/outdoor-portrait-male-doctor-wearing-white-lab-coat-smiling-to-camera-35801901.png")
              }
              style={[styles.image, { width: "100%" }]}
            />
          </View>

          <View style={{ width: "55%", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => setClickReadMore(true)}>
              <Text
                style={{
                  alignSelf: "center",
                  color: main_color,
                  marginVertical: 5,
                }}
              >
                Read More
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Icon
                name={
                  doctor.rate < 0.4
                    ? "star-border"
                    : doctor.rate < 0.9
                      ? "star-half"
                      : "star"
                }
                size={35}
                color="gold"
              />
              <Icon
                name={
                  doctor.rate < 1.4
                    ? "star-border"
                    : doctor.rate < 1.9
                      ? "star-half"
                      : "star"
                }
                size={35}
                color="gold"
              />
              <Icon
                name={
                  doctor.rate < 2.4
                    ? "star-border"
                    : doctor.rate < 2.9
                      ? "star-half"
                      : "star"
                }
                size={35}
                color="gold"
              />
              <Icon
                name={
                  doctor.rate < 3.4
                    ? "star-border"
                    : doctor.rate < 3.9
                      ? "star-half"
                      : "star"
                }
                size={35}
                color="gold"
              />
              <Icon
                name={
                  doctor.rate < 4.4
                    ? "star-border"
                    : doctor.rate < 4.9
                      ? "star-half"
                      : "star"
                }
                size={35}
                color="gold"
              />
              {/* <Rating imageSize={25} readonly startingValue={av_rate} /> */}
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
                {doctor.views} {" Reviews "}
              </Text>
              {
                CurrentUser.user.is_admin == "yes" ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      // width: "100%",
                    }}
                    onPress={() => { handleActive() }}
                  >
                    <Text
                      style={{
                        backgroundColor: active ? main_color : "red",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        color: "white",
                        margin: 20,
                      }}
                    >
                      {active ? "Mark as inactive" : "Mark as active"}

                    </Text>
                  </TouchableOpacity>
                ) :
                  (
                    active ? (
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          // width: "100%",
                        }}
                        onPress={async () => {
                          // // fetch();
                          navigation.navigate("AppointmentConfirmation", { doctor });
                          setF(false);
                          let days, start, end, number;
                          await getDocSchedule(doctor.id).then((res) => {
                            if (res.status != "failed") {
                              res = res.filter((ele) => ele.avilable !== "no");

                              days = res.map((item) => item.day.slice(0, 3));
                              start = res.map((item) => item.start);
                              end = res.map((item) => item.end);
                              number = res.map((item) => item.number);

                            }
                          });
                          setDays(days);
                          setStartTime(start);
                          setEndTime(end);
                          setNumberOfPatients(number);
                          await get_app_by_doc_id_user_id(doctor.id, CurrentUser.user.id).then((res) => {
                            console.log(doctor.id, res);
                            if (res.status == "failed")
                              setApps_doc_user([]);
                            else
                              setApps_doc_user(res);
                          })
                        


                          await getReviews(doctor.id).then((res) => {
                            // console.log(res);
                            if (res.status != "fail") {
                              // console.log(res);
                              setComments(res);
                              const old = res.filter((ele) => ele.users_id == CurrentUser.user.id);
                              if (old.length != 0) {
                                setCommentIsExist(true);
                                setCommentText(old[0].text);
                                setRateNumber(old[0].rate);
                              }
                            }
                          });
                          setF(true);

                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: main_color,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            color: "white",
                            margin: 20,
                          }}
                        >
                          {" "}
                          Make Appointment
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={{ color: "red" }}>This doctor is inactive</Text>
                    )
                  )
              }
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Back_Card = () => {
    return (
      <TouchableOpacity onPress={() => setClickReadMore(false)}>
        <View style={{ backgroundColor: main_color, minHeight: 250 }}>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              marginTop: 10,
              // marginHorizontal : 10,
              alignSelf: "center",
              // width: "45%",
            }}
          >
            Extra Information:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon2
              name={"info"}
              size={30}
              color={"white"}
              style={{ width: "5%", marginLeft: 5 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 5,
                marginTop: 10,
                marginHorizontal: 5,
                // marginHorizontal : 10,
                // alignSelf: "center",
                // width: "45%",
              }}
            >
              {"About The Doctor:"}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              // fontWeight: "bold",
              marginVertical: 5,
              color: "white",
              marginHorizontal: 5,
              // borderWidth: 0.5,
              // borderColor: main_color,
              paddingHorizontal: 10,

              // marginHorizontal : 10,
              // alignSelf: "center",
              // width: "45%",
            }}
          >
            {doctor.describtion}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name={"location-pin"}
              size={30}
              color={"white"}
              style={{ marginVertical: 10 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                // marginVertical: 5,
                // marginTop: 10,
                // marginHorizontal: 5,
                // marginHorizontal : 10,
                // alignSelf: "center",
                // width: "45%",
              }}
            >
              {" Clinic Address:"}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 10,
              color: "white",
              marginHorizontal: 20,
            }}
          >
            {doctor.address}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 5,
              marginVertical: 10,
            }}
          >
            <Icon2
              style={{ marginVertical: 10, marginRight: 10 }}
              name={"wallet"}
              size={30}
              color={"white"}
            />
            <View style={{ width: "40%" }}>
              <Text style={{ color: "white" }}>
                {" "}
                {doctor.price} {"EGP"}
              </Text>
              <Text style={{ color: "white" }}> Consultation Fees</Text>
            </View>

            <Icon2
              name={"clock"}
              size={30}
              color={"white"}
              style={{ marginVertical: 10, marginHorizontal: 10 }}
            />
            <View style={{ width: "45%" }}>
              <Text style={{ color: "white" }}>
                {" "}
                {"30"} {"Minutes"}
              </Text>
              <Text style={{ color: "white" }}> Wating Time</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlipCard
        style={[styles.content, night && styles.darkCard]}
        friction={20}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={clickReadMore}
        clickable={false}
      // onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
      >
        <View>{Face_Card()}</View>
        {Back_Card()}
      </FlipCard>
    </View>
  );
};

const styles = StyleSheet.create({
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

    marginVertical: 7,
    marginHorizontal: 7,
  },
  image: {
    width: "45%",
    height: 180,
    marginVertical: 10,
  },
  buttonDark: {
    backgroundColor: "#288771",
  },
  darklist: {
    backgroundColor: "#262424",
  },
  dark2: {
    backgroundColor: "#1d1c1c",
  },
  darkCard: {
    backgroundColor: "#303030",
    borderColor: "#262424",
  },
  darkText: {
    color: "white",
  },
});
export default memo(DoctorCard2);

// <TouchableOpacity
//   key={doctor.id}
//   onPress={() => {
//     handelRout();
//   }}
// >
//   <View style={[styles.card, night && styles.darkCard]}>
//     <Image
//       source={
//         image
//           ? { uri: image }
//           : require("../assets/Herbal_Medicine_Male_Avatar.png")
//       }
//       defaultSource={require("../assets/Herbal_Medicine_Male_Avatar.png")}
//       style={styles.cardPhoto}
//     />
//     <View style={styles.cardContent}>
//       <View style={{ width: "50%" }}>
//         <Text
//           numberOfLines={2}
//           ellipsizeMode="tail"
//           style={styles.cardTitle}
//         >
//           {doctor.name}
//         </Text>

//         <Text
//           numberOfLines={2}
//           ellipsizeMode="tail"
//           style={styles.cardDoctor}
//         >
//           {doctor.title +
//             "," +
//             doctor.specialization1 +
//             "," +
//             doctor.specialization1}
//         </Text>
//       </View>
//       <TouchableOpacity
//         style={[styles.cardButton, night && styles.buttonDark]}
//         onPress={() => {
//           fetch();
//           navigation.navigate("AppointmentConfirmation", { doctor });
//         }}
//       >
//         <Text style={styles.cardButtonText}>Make Appointment</Text>
//       </TouchableOpacity>
//     </View>
//     <TouchableOpacity
//       onPress={() => {
//         handleFav(CurrentUser.user.id, doctor.id);
//       }}
//       style={{}}
//     >
// {infav ? (
//   <MaterialIcons
//     name="favorite"
//     size={30}
//     color={night ? "#dfd9d9" : "#288771"}
//   />
// ) : (
//   <MaterialIcons
//     name="favorite-border"
//     size={30}
//       color={night ? "#288771" : "#288771"}
//   />
// )}
//     </TouchableOpacity>
//   </View>
// </TouchableOpacity>

// card: {
//   flexDirection: "row",
//   alignItems: "center",
//   backgroundColor: "#f5f6fc",
//   borderRadius: 10,
//   marginBottom: 20,
//   marginHorizontal: 20,
//   height: 200,
// },
// cardPhoto: {
//   width: "30%",
//   height: "80%",
//   margin: 5,
// },
// cardContent: {
//   flex: 1,
//   alignItems: "center",
// },
// cardTitle: {
//   fontSize: 16,
//   fontWeight: "bold",
//   textAlign: "center",
// },
// cardDoctor: {
//   fontSize: 14,
//   color: "#555",
// },
// cardButton: {
//   backgroundColor: "#288771",
//   padding: 8,
//   borderRadius: 5,
//   width: "50%",
//   marginTop: "10%",
// },
// cardButtonText: {
//   color: "#fff",
//   fontSize: 14,
//   fontWeight: "bold",
//   textAlign: "center",
// },
// buttonDark: {
//   backgroundColor: "#288771",
// },
// // darklist: {
// //   backgroundColor: "#e33030",
// // },
// // dark2: {
// //   backgroundColor: "#d61919",
// // },
// darkCard: {
//   backgroundColor: "#303030",
// },