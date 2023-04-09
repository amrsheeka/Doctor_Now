import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { db } from "../../db/Config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  setDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import CurrentUser from "../consts/CurrentUser";
const Chat = ({ navigation }) => {
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
    // console.log("chat ", c);
  };

  useEffect(() => {
    async function fetchData() {
      await getChats();
      console.log(chat);
      console.log(CurrentUser.user);
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

  //console.log(chat);
  let user_chats = chat.filter((e) => e.user_id == CurrentUser.user.id);
  //console.log("ddddddd", user_chats);

  const onklek = () => {
    navigation.navigate("Chatbox", { item });
  };

  async function editUser(user) {
    //console.log("at editCity", user);
    await setDoc(doc(db, "chats", user.id), user);
  }
  const renderChat = ({ item }) => {
    //console.log("1111111", item.id);
    return (
      <TouchableOpacity
        onPress={() => {
          editUser({
            ...item,
            id: item.id,
          }).then(() => {
            navigation.navigate("Chatbox", { item });
          });
        }}
      >
        <View style={styles.card}>
          <Image source={{ uri: item.doctor.image }} style={styles.cardPhoto} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.doctor.name}</Text>
            <Text style={styles.cardMessage}>How are you feeling today?</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chats</Text>
      </View>
      <FlatList
        data={user_chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#288771",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardMessage: {
    fontSize: 14,
    color: "#555",
  },
});

export default Chat;
