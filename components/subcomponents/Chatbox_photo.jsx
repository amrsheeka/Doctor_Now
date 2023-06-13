import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  setDoc,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../db/Config";
import app from "../../db/Config";
import { getFirestore } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import CurrentUser from "../consts/CurrentUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Chatbox_photo = ({ navigation, route }) => {
  let fil = route.params.filterd;

  console.log(fil.id);
  const [chat, setChat] = useState([]);

  async function getChat() {
    const citiesCol = collection(db, "chats");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return cityList;
  }
  const getChats = async () => {
    const c = await getChat();
    await setChat(c);
    //await setLocal(hh[0].chat);
    // console.log("chat ", c);
  };

  let user_chats = chat.filter((e) => e.id == fil.id);
  let hh = { ...user_chats };
  useEffect(() => {
    async function fetchData() {
      await getChats().then(() => {
        // setLocal(hh[0].chat);
      });
    }
    fetchData();
  }, []);
  async function editUser(user) {
    //console.log("at editCity", user);
    await setDoc(doc(db, "chats", user.id), user);
  }
  const firestoreDB = getFirestore(app);
  async function getChatById(id) {
    const usersRef = collection(firestoreDB, "chats");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  const onSendPhoto = useCallback(() => {
    const date = new Date();
    const storage = getStorage();
    const mountainsRef = ref(
      storage,
      "images/4f87d8c8-8f9c-4b63-8ee2-c54fc14451cd.jpeg"
    );
    // const mountainImagesRef = ref(storage, selectedImage);
    // mountainsRef.name === mountainImagesRef.name; // true
    // mountainsRef.fullPath === mountainImagesRef.fullPath; // false

    const newchat = [
      {
        createdAt: date.toLocaleString(),
        image: selectedImage,
        SenderId: CurrentUser.user.id,
      },
    ];
    getChatById(fil.id).then((user) => {
      const user1 = user;
      //console.log("kokooooooooooo", user1[0]);
      editUser({
        ...user1[0],
        chat: [...hh[0].chat, ...newchat],
      });
    });
    alert("Your Photo has been sended");
    navigation.goBack();
  });
  const PlaceholderImage = require("../assets/Diet.png");

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);

  function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource =
      selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      <View style={styles.footerContainer}>
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
          ]}
        >
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={pickImageAsync}
          >
            <FontAwesome
              name="picture-o"
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              Choose a photo
            </Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onSendPhoto}>
            <Text style={styles.buttonLabel}>Send Photo To This Doctor</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
export default Chatbox_photo;
