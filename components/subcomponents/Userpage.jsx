import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon4 from "react-native-vector-icons/Fontisto";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { RadioButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CurrentUser from "../consts/CurrentUser";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { editUser, getCurrentUser, login } from "../../database/Users";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import { StatusBar } from "expo-status-bar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Userpage = ({ navigation }) => {
  const { curruser, setCurrUser } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const user = curruser;
  let url = "";
  const [image, setImage] = useState(user.image);
  const [name, setname] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setphone] = useState(user.phone);
  const [address, setaddress] = useState(user.address);
  const [age, setAge] = useState(user.age);
  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");
  const [nameErr, setnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [N_passwordErr, setN_PasswordErr] = useState("");
  const [C_passwordErr, setC_PasswordErr] = useState("");
  const [open_password, setOpen_password] = useState(false);

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showPasswordIcon2, setShowPasswordIcon2] = useState(false);
  const [showPasswordIcon3, setShowPasswordIcon3] = useState(false);

  const [male_radio, setMale_radio] = useState(
    user.gender == "male" ? "checked" : "unchecked"
  );
  const [female_radio, setFemale_radio] = useState(
    user.gender == "female" ? "checked" : "unchecked"
  );
  const [gender, setGender] = useState(user.gender);
  const [img, setImg] = useState(null);
  const main_color = "#288771";
  const uploadToFirebase = async (uri, name, onProgress) => {
    
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);
    let downloadUrl;
    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          downloadUrl = await getDownloadURL(uploadTask.snapshot.ref).then((res) => {
          url = res;
          });

          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });

        }

      );



    });
  };
  const handleSave = async () => {

    
    if (image != null) {
      console.log("ok");
      const fileName = img.split("/").pop();
      
      const { uri } = image;
      
      await uploadToFirebase(uri, fileName, (v) =>
        console.log(v)
      ).then(async() => {

        if (!name) {
          setnameErr("Enter your name.");
        } else if (name.length < 10) {
          setnameErr("Enter your full name, at least 10 letters");
        } else {
          setnameErr("");
        }

        if (!age) {
          setAgeErr("Enter your age.");
        } else if (age < 15) {
          setAgeErr("you should older than 15 years old");
        } else if (age > 70) {
          setAgeErr("you should younger than 70 years old");
        } else {
          setAgeErr("");
        }

        if (!address) {
          setAddressErr("Enter your correct address.");
        } else {
          setAddressErr("");
        }

        if (!phone) {
          setPhoneErr("Enter your phone number.");
        } else if (phone.length != 11 || !phone.startsWith("01")) {
          setPhoneErr("Enter correct phone number.");
        } else {
          setPhoneErr("");
        }

        if (!email) {
          setEmailErr("Enter your email address.");
        } else if (!ValidateEmail(email)) {
          setEmailErr(
            "The email address should have the format: (user@example.com)."
          );
        } else {
          setEmailErr("");
        }
        if (current_password) {
          if (current_password != user.password) {
            setPasswordErr("Password is not correct");
          } else {
            setPasswordErr("");
            if (!new_password) {
              setN_PasswordErr("Enter your password.");
            } else if (new_password.length < 8) {
              setN_PasswordErr("password should be at least 8 letters.");
            } else if (!ValidatePassword(new_password)) {
              setN_PasswordErr(
                "password should have at least one letter and one number"
              );
            } else {
              setN_PasswordErr("");
            }

            if (confirm_new_password != new_password) {
              setC_PasswordErr("Password and Confirm password doesn't match");
            } else {
              setC_PasswordErr("");
            }
          }
        }
        if (
          name.length >= 10 &&
          age >= 15 &&
          age <= 70 &&
          address &&
          phone.length == 11 &&
          phone.startsWith("01") &&
          ValidateEmail(email) &&
          (!current_password ||
            (current_password == user.password &&
              ValidatePassword(new_password) &&
              confirm_new_password === new_password))
        ) {
          let updateUser = {};
          const set = async () => {
            updateUser = {
              ...user,
              name: name,
              phone: phone,
              address: address,
              age: age,
              gender: gender,
              email: email,
              image: url,
              password: current_password ? new_password : user.password,
            };
          };
          await set().then(() => {
            editUser(updateUser).then(() => {
              getCurrentUser().then((res) => {
                setCurrUser(res);
                navigation.navigate("Thk3");
                setCurrent_password("");
                setNew_password("");
                setConfirm_new_password("");
                console.log(user);
              });
            });
          });
        }




      })
    } else {
      alert("Choose image pls");
      return;
    }




  };

  function ValidateEmail(x) {
    let input = "";
    input = x;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  function ValidatePassword(x) {
    let input = "";
    input = x;
    var validRegex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const click_male = () => {
    setMale_radio("checked");
    setFemale_radio("unchecked");
    setGender("male");
  };
  const click_female = () => {
    setMale_radio("unchecked");
    setFemale_radio("checked");
    setGender("female");
  };

  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });



    if (!result.canceled) {
      setImage(result.assets[0]);
      setImg(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.label}> Profile </Text>
      </View>
      <ScrollView style={{ marginBottom: 75 }}>
        <TouchableOpacity
          style={{ width: "100%", alignItems: "center" }}
          onPress={selectFile}
        >
          <Image
            source={img!=null?{ uri: img }
                : require("../assets/Herbal_Medicine_Male_Avatar.png")
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              marginTop: 50,
            },
          ]}
        >
          <Icon4
            style={{ marginRight: 10 }}
            name={"info"}
            size={30}
            color={main_color}
          />
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            {" "}
            Your basic Information{" "}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <TextInput
            label={"Full Name"}
            mode="outlined"
            style={{ marginTop: 30 }}
            value={name}
            onChangeText={setname}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={
              <TextInput.Icon icon={() => <Icon name={"user"} size={25} />} />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{nameErr}</Text>
          <TextInput
            label={"Eamil"}
            mode="outlined"
            // style={{ marginTop: 30 }}
            value={email}
            onChangeText={setEmail}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={<TextInput.Icon icon={"email"} />}
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{emailErr}</Text>

          <TextInput
            label={"Age"}
            mode="outlined"
            value={postalCode .toString(age)}
            keyboardType="number-pad"
            onChangeText={setAge}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon2
                    name={"numeric-9-plus-box-multiple-outline"}
                    size={25}
                  />
                )}
              />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{ageErr}</Text>

          <TextInput
            label={"Address"}
            mode="outlined"
            value={address}
            onChangeText={setaddress}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={
              <TextInput.Icon
                icon={() => <Icon3 name={"location-pin"} size={25} />}
              />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{addressErr}</Text>
          <TextInput
            label={"phone number"}
            mode="outlined"
            value={phone}
            keyboardType="number-pad"
            onChangeText={setphone}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={
              <TextInput.Icon icon={() => <Icon name={"phone"} size={25} />} />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{phoneErr}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //   marginLeft: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
                // fontWeight: "bold",
                marginRight: 15,
              }}
            >
              {" "}
              Gender:{" "}
            </Text>
            <RadioButton
              status={male_radio}
              color={main_color}
              value="male"
              uncheckedColor="black"
              onPress={click_male}
            />
            <Text
              style={{
                color: "black",
                paddingBottom: 3,
                width: "35%",
                // paddingHorizontal: 5,
              }}
            >
              Male
            </Text>
            <RadioButton
              status={female_radio}
              color={main_color}
              value="female"
              uncheckedColor="black"
              onPress={click_female}
            />
            <Text
              style={{
                color: "black",
                paddingBottom: 3,
                // paddingHorizontal: 5,
              }}
            >
              Female
            </Text>
          </View>
        </View>

        <View
          style={[
            {
              marginHorizontal: 15,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Icon5
            name={"user-lock"}
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

        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <TextInput
            label={"Current Password"}
            mode="outlined"
            value={current_password}
            onChangeText={setCurrent_password}
            secureTextEntry={!showPasswordIcon}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
              color: "red",
            }}
            left={<TextInput.Icon icon={"lock"} />}
            right={
              <TextInput.Icon
                icon={showPasswordIcon ? "eye-off" : "eye"}
                onPress={() => setShowPasswordIcon(!showPasswordIcon)}
                iconColor="grey"
              />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{passwordErr}</Text>

          <TextInput
            label={"New Password"}
            mode="outlined"
            value={new_password}
            onChangeText={setNew_password}
            secureTextEntry={!showPasswordIcon2}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,

            }}
            left={<TextInput.Icon icon={"lock"} />}
            right={
              <TextInput.Icon
                icon={showPasswordIcon2 ? "eye-off" : "eye"}
                onPress={() => setShowPasswordIcon2(!showPasswordIcon2)}
                iconColor="grey"
              />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{N_passwordErr}</Text>
          <TextInput
            label={"Confirm Password"}
            mode="outlined"
            value={confirm_new_password}
            onChangeText={setConfirm_new_password}
            secureTextEntry={!showPasswordIcon3}
            outlineStyle={{
              borderColor: main_color,
              borderRadius: 10,
            }}
            left={<TextInput.Icon icon={"lock"} />}
            right={
              <TextInput.Icon
                icon={showPasswordIcon3 ? "eye-off" : "eye"}
                onPress={() => setShowPasswordIcon3(!showPasswordIcon3)}
                iconColor="grey"
              />
            }
            activeOutlineColor={main_color}
          />
          <Text style={{ color: "red" }}>{C_passwordErr}</Text>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: main_color,
            width: "70%",
            borderRadius: 20,
            height: 45,
            marginTop: 10,
            marginBottom: 20,
          }}
          onPress={() => handleSave()}
        >
          <Text style={{ alignSelf: "center", color: "white", marginTop: 10 }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#288759" />
    </View>
    // <View style={{ flexDirection: "row", gap: 100 }}>
    // <View>
    //   <Text style={styles.infoLabel}>Age:</Text>
    // </View>
    // <View>
    //   <Text style={[styles.infoValue,]}>{user.age} years old</Text>
    // </View>
    // <View>
    //   <TouchableOpacity onPress={() => ""}>
    //     <MaterialIcons name="mode-edit" size={24} color="green" style={styles.z1} />
    //   </TouchableOpacity>
    // </View>
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
  image: {
    width: "55%",
    height: 250,
    borderRadius: 40,
    marginTop: 30,
  },
});

export default Userpage;

{
  /* <View style={styles.profile}>
          <Image
            source={require("../assets/Herbal_Medicine_Male_Avatar.png")}
            style={styles.profilePhoto}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileTitle, night && styles.textdark]}>
              {user.name}
            </Text>
            // <Text style={styles.profileSubtitle}>id:{user.id}</Text>
          </View>
        </View> */
}

///////////////////////////////////////////////////////////////////////////////////////

//   <View style={[styles.container, night && styles.buttonDark]}>
//   <View style={[styles.header, night && styles.buttonDark]}>
//     <View style={styles.Go_Back1}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <View style={styles.Go_Back}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </View>
//       </TouchableOpacity>
//     </View>
//     <View>
//       <Text style={[styles.heading, night && styles.textdark]}>
//         {" "}
//         Your Profile
//       </Text>
//     </View>
//   </View>
//   {/* <View style={styles.z2}>
//     <TouchableOpacity
//       onPress={() => navigation.navigate("Edit_user", { user })}
//     >
//       <MaterialIcons
//         name="mode-edit"
//         size={24}
//         color="white"
//         style={[styles.z1, night && styles.dark2]}
//       />
//     </TouchableOpacity>
//   </View> */}
//   <View style={styles.content}>

//     <View style={styles.info}>
//       <View style={{ flexDirection: "row", gap: 10 }}>
//         <View style={styles.infoItem}>
//           <Text style={[styles.infoLabel, night && styles.textdark]}>
//             Email address:
//           </Text>
//           <Text style={[styles.infoValue, night && styles.textdark]}>
//             {user.email}
//           </Text>
//         </View>
//         {/* <View>
//               <TouchableOpacity onPress={() => ""}>
//                 <MaterialIcons name="mode-edit" size={24} color="green"  />
//               </TouchableOpacity>
//             </View> */}
//       </View>
//       <View style={{ flexDirection: "row", gap: 10 }}>
//         <View style={styles.infoItem}>
//           <Text style={[styles.infoLabel, night && styles.textdark]}>
//             Phone Number:
//           </Text>
//           <Text style={[styles.infoValue, night && styles.textdark]}>
//             {user.phone}
//           </Text>
//         </View>
//         {/* <View>
//               <TouchableOpacity onPress={() => ""}>
//                 <MaterialIcons name="mode-edit" size={24} color="green"  />
//               </TouchableOpacity>
//             </View> */}
//       </View>
//       <View style={{ flexDirection: "row", gap: 10 }}>
//         <View style={styles.infoItem}>
//           <Text style={[styles.infoLabel, night && styles.textdark]}>
//             address:
//           </Text>
//           <Text style={[styles.infoValue, night && styles.textdark]}>
//             {user.address}
//           </Text>
//         </View>
//         {/* <View>
//               <TouchableOpacity onPress={() => ""}>
//                 <MaterialIcons name="mode-edit" size={24} color="green"  />
//               </TouchableOpacity>
//             </View> */}
//       </View>
//       {user.address_2 ? (
//         <View style={{ flexDirection: "row", gap: 10 }}>
//           <View style={styles.infoItem}>
//             <Text style={[styles.infoLabel, night && styles.textdark]}>
//               address 2:
//             </Text>
//             <Text style={[styles.infoValue, night && styles.textdark]}>
//               {user.address_2}
//             </Text>
//           </View>
//           {/* <View>
//               <TouchableOpacity onPress={() => ""}>
//                 <MaterialIcons name="mode-edit" size={24} color="green"  />
//               </TouchableOpacity>
//             </View> */}
//         </View>
//       ) : (
//         <></>
//       )}
//       <View style={{ flexDirection: "row", gap: 10 }}>
//         <View style={styles.infoItem}>
//           <Text style={[styles.infoLabel, night && styles.textdark]}>
//             Gender:
//           </Text>
//           <Text style={[styles.infoValue, night && styles.textdark]}>
//             {user.gender}
//           </Text>
//         </View>
//         {/* <View>
//       <TouchableOpacity onPress={() => ""}>
//           <MaterialIcons name="mode-edit" size={24} color="green"  />
//         </TouchableOpacity>
//       </View> */}
//       </View>
//       <View style={{ flexDirection: "row", gap: 10 }}>
//         <View style={styles.infoItem}>
//           <Text style={[styles.infoLabel, night && styles.textdark]}>
//             Age:
//           </Text>
//           <Text style={[styles.infoValue, night && styles.textdark]}>
//             {user.age} years old
//           </Text>
//         </View>
//         {/* <View>
//       <TouchableOpacity onPress={() => ""}>
//           <MaterialIcons name="mode-edit" size={24} color="green"  />
//         </TouchableOpacity>
//       </View> */}
//       </View>
//     </View>
//   </View>
//   <TouchableOpacity
//       style={{
//         alignSelf: "center",
//         backgroundColor: main_color,
//         width: "70%",
//         borderRadius: 20,
//         height: 45,
//         marginTop: 10,
//         marginBottom: 5,
//       }}
//       onPress={() => handle_To_go_next_Screen()}
//     >
//       <Text style={{ alignSelf: "center", color: "white", marginTop: 10 }}>
//         Next
//       </Text>
//     </TouchableOpacity>
// </View>

///////////////////////////////////////////

// container: {
//   flex: 1,
//   backgroundColor: "white",
//   paddingVertical: 20,
// },
// header: {
//   flexDirection: "row",
//   width: "100%",
//   alignItems: "center",
//   justifyContent: "flex-start",
//   paddingVertical: 20,
//   // marginBottom: 20,
// },
// heading: {
//   fontSize: 24,
//   fontWeight: "bold",
//   color: "black",
// },

// Go_Back: {
//   // marginTop:15,
//   // // width:"10%",
//   // justifyContent: "flex-start",
//   // justifyContent: "flex-start",
//   width: "10%",
//   // left:1
// },
// Go_Back1: {
//   // marginTop:15,
//   width: "35%",
//   // justifyContent: "flex-start",
//   // justifyContent: "flex-start",
// },
// content: {
//   paddingHorizontal: 10,
//   flexDirection: "column",
//   gap: 10,
// },
// profile: {
//   // backgroundColor: "#ffffff",
//   width: "60%",
//   flexDirection: "column",
//   // height:"50%",
//   // marginVertical: 6,
//   // margin: 5,
//   // padding: 10,
// },
// profilePhoto: {
//   width: "100%",
//   height: "50%",
//   borderRadius: 60,
//   padding: "50%",
//   // marginLeft:"35%"
//   marginLeft: "35%",
//   marginRight: "25%",
// },
// profileInfo: {
//   alignContent: "center",
//   alignItems: "center",
//   margin: 10,
//   left: "35%",
//   right: "25%",
//   // borderWidth:2,
//   // borderRadius: 10,
//   // backgroundColor: "#ffffff",
//   // marginLeft:"55%"
// },
// profileTitle: {
//   fontSize: 20,
//   fontWeight: "bold",
// },
// profileSubtitle: {
//   fontSize: 16,
//   color: "#555",
// },
// info: {
//   // flex:1
//   // marginBottom: 10,
// },
// infoTitle: {
//   fontSize: 18,
//   fontWeight: "bold",
//   marginBottom: 10,
// },
// infoItem: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 5,
//   width: "100%",
// },
// infoLabel: {
//   fontSize: 16,
//   fontWeight: "bold",
//   marginRight: 10,
// },
// infoValue: {
//   fontSize: 16,
//   color: "#555",
// },
// z1: {
//   width: "7%",
//   // height:"35%",
//   backgroundColor: "green",
//   borderRadius: 10,
//   left: "90%",
// },
// z2: {
//   width: "100%",
//   // height:"35%",
// },
// buttonDark: {
//   backgroundColor: "#1d1c1c",
// },
// // darklist: {
// //   backgroundColor: '#142E5E',
// //   borderWidth: 0,

// // },
// // dark2: {
// //   backgroundColor: "#BDD3FF",
// // },
// textdark: {
//   color: "white",
// },
