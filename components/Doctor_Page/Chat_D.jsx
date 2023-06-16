import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import { get_user_by_Id } from "../../database/Users";
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
import { AppContext } from "../consts/AppContext";
import CurrentUser from "../consts/CurrentUser";
const Chat_D = ({ navigation }) => {
  const [chat, setChat] = useState([]);

  const { night } = useContext(AppContext);

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
      //console.log(chat);
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

  //console.log(chat);
  let user_chats = chat.filter((e) => e.doctor.id == CurrentUser.user.email.split('@')[0]);
  // console.log("ddddddd", user_chats);
  // console.log("ffffffffffff", CurrentUser.user.id);

  const onklek = () => {
    navigation.navigate("Chatbox", { item });
  };

  async function editUser(user) {
    //console.log("at editCity", user);
    await setDoc(doc(db, "chats", user.id), user);
  }
  // async function get_User(id) {
  //   get_user_by_Id(id).then((res) => {
  //     setUser(res);
  //     console.log("mostafa    ", res);
  //   });
  // }

  const renderChat = ({ item }) => {
    //console.log("1111111", item.user_id);
    // let image = item.doctor.image;
    // get_User(item.user_id);
    if(item.User){
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
            <Image
              source={item.User.image!=null
                ? { uri: item.User.image }
                  : require("../assets/Herbal_Medicine_Male_Avatar.png")
              }
              style={styles.cardPhoto}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.User.name}</Text>
              <Text style={styles.cardMessage}>How are you feeling today?</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return(<></>);
  };

  return (
    <View style={[styles.container, night && styles.buttonDark]}>
      <View style={[styles.header, night && styles.buttonDark]}>
        <Text style={styles.heading}>Chats</Text>
      </View>
      <FlatList
        data={user_chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1, justifyContent: "center" ,}}>
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                }}
                source={require("../assets/empty.png")}
              />
              <Text></Text>
            </View>
          );
        }}
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
  buttonDark: {
    backgroundColor: "#1d1c1c",
  },
  // darklist: {
  //   backgroundColor: '#262424',
  //   color:"white",
  //   borderColor:'#262424'
  // },
  // dark2: {
  //   backgroundColor: '#262424',
  //   color:"white",
  //   borderColor:'#262424'
  // },
});

export default Chat_D;
