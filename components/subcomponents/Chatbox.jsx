import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../db/Config";
import { signOut } from "firebase/auth";
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
import { getFirestore } from "firebase/firestore";
import CurrentUser from "../consts/CurrentUser";
import app from "../../db/Config";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
export default function Chatbox({ navigation, route }) {
  let filterd = route.params.item;
  //console.log("filterd", filterd.chat);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isSender, setIsSender] = useState(true);
  const [local, setLocal] = useState([]);
  const firestoreDB = getFirestore(app);

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

  let user_chats = chat.filter((e) => e.id == filterd.id);
  let hh = { ...user_chats };
  //console.log("ffffffffffffffff ", hh[0].chat);

  useEffect(() => {
    async function fetchData() {
      await getChats().then(() => {
        // setLocal(hh[0].chat);
      });
      // await setLocal(hh[0].chat);
      //console.log(CurrentUser.user);
    }
    fetchData();
  }, []);

  function subscribe(callback) {
    const unsubscribe = onSnapshot(
      query(collection(db, "chats")),
      (snapshot) => {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        snapshot.docChanges().forEach((change) => {
          // console.log("changes", change, snapshot.metadata);
          if (callback) callback({ change, snapshot });
        });
        // console.log(source, " data: ", snapshot.data());
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getChats();
      }
      if (change.type === "modified") {
        getChats();
      }
      if (change.type === "removed") {
        getChats();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function editUser(user) {
    //console.log("at editCity", user);
    await setDoc(doc(db, "chats", user.id), user);
  }

  const onSend = useCallback(() => {
    const date = new Date();
    const newchat = [
      {
        createdAt: date.toLocaleString(),
        text: message,
        SenderId: CurrentUser.user.id,
      },
    ];
    getChatById(filterd.id).then((user) => {
      const user1 = user;
      //console.log("kokooooooooooo", user1[0]);
      editUser({
        ...user1[0],
        chat: [...hh[0].chat, ...newchat],
      });
    });
  });

  async function getChatById(id) {
    const usersRef = collection(firestoreDB, "chats");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  const isSenderr = (item) => {
    if (item.SenderId == CurrentUser.user.id) {
      return true;
    } else {
      return false;
    }
  };
  const renderMessage = ({ item }) => {
    if (item.image != null) {
      console.log(item.image);
      return (
        <View
          style={[
            styles.messageContainer,
            isSenderr(item)
              ? styles.senderMessageContainer
              : styles.receiverMessageContainer,
          ]}
        >
          {/* <Modal visible={true} transparent={true}>
            <ImageViewer imageUrls={item.image} />
          </Modal> */}
          <Image source={{ uri: item.image }} style={styles.imageeee} />

          <Text style={styles.date}>{item.createdAt.toLocaleString()}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.messageContainer,
            isSenderr(item)
              ? styles.senderMessageContainer
              : styles.receiverMessageContainer,
          ]}
        >
          <Text
            style={[
              styles.message,
              item.isSender ? styles.senderMessage : styles.receiverMessage,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.date}>{item.createdAt.toLocaleString()}</Text>
        </View>
      );
    }
  };

  const photopage = () => {
    navigation.navigate("Chatbox_photo", { filterd });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Client Name</Text>
      </View>
      {/* 
       hh[0].chat 
       filterd.chat
       local
      */}
      {hh[0] ? (
        <FlatList
          data={hh[0].chat}
          renderItem={renderMessage}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                  }}
                  source={require("../assets/empty.png")}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messages}
        />
      ) : (
        <View style={{ padding: "18%" }}>
          <ActivityIndicator size={100} color="#00ff00" />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Type a message "}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={photopage}>
          <MaterialIcons name="add-photo-alternate" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <AntDesign name="rocket1" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfafa",
  },
  messages: {
    flex: 1,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    maxWidth: "80%",
    alignSelf: "flex-end",
  },
  senderMessageContainer: {
    backgroundColor: "#288771",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  receiverMessageContainer: {
    backgroundColor: "#eceff1",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  message: {
    fontSize: 16,
    color: "#fff",
  },
  senderMessage: {
    color: "#fff",
  },
  receiverMessage: {
    color: "#000",
  },
  date: {
    fontSize: 10,
    marginTop: 8,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    color: "#cbcbcb",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#eceff1",
    borderRadius: 24,
    paddingLeft: 16,
    marginRight: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: "#288771",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#fcfafa",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f1a25",
  },
  cardPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  imageeee: {
    width: 70,
    height: 70,
  },
});
