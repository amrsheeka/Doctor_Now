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
import { getStorage, ref, uploadBytesResumable, list, listAll, getDownloadURL } from "firebase/storage";
import { db } from "../../db/Config";
import app from "../../db/Config";
import { getFirestore } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import CurrentUser from "../consts/CurrentUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import firebase from "firebase/app";
import { async } from "@firebase/util";
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
  const listFiles = async (name) => {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "images");

    // Find all the prefixes and items.
    const listResp = await listAll(listRef);
    console.log(listResp);
    return listResp.items;
  };
  // const [URL_img, setURL] = useState("");
  let url ="";
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
            url =res;
          });

          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });

        }

      );



    });
  };
  const onSendPhoto = useCallback(async () => {
    const date = new Date();
    if (selectedImage != null) {

      const fileName = img.split("/").pop();
      const { uri } = selectedImage;

      await uploadToFirebase(uri, fileName, (v) =>
        console.log(v)
      ).then(() => {

        const newchat = [
          {
            createdAt: date.toLocaleString(),
            image: url,
            SenderId: CurrentUser.user.id,
          },
        ];
        getChatById(fil.id).then((user) => {
          const user1 = user;
          editUser({
            ...user1[0],
            chat: [...hh[0].chat, ...newchat],
          });
        });
        alert("Your Photo has been sended");
        navigation.goBack();




      })




    } else {
      alert("Choose image pls")
      return;
    }

  });
  const PlaceholderImage = require("../assets/Diet.png");

  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState(null);


  function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource =
      selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.assets[0].uri)
      setSelectedImage(result.assets[0]);
      setImg(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={img}
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
