import React, { useCallback, useState, useLayoutEffect } from "react";
import { ScrollView } from "react-native-web";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../db/Config";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function Chatbox({ navigation, route }) {
  let filterd = route.params.item;
  //console.log("ddd", filterd);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSender, setIsSender] = useState(true);

  navigation.setOptions({
    headerLeft: () => (
      <View style={{ marginLeft: 20 }}>
        <Image
          source={{ uri: filterd.doctor.image }}
          style={styles.cardPhoto}
        />
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{
          marginRight: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text>back</Text>
      </TouchableOpacity>
    ),
  });

  useLayoutEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  //console.log(messages);

  const onSend = useCallback((messages = []) => {
    user = {
      _id: "234234324324",
      name: "sasa",
      avatar: null,
    };
    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(db, "chats"), { _id, createdAt, text, user });
  }, []);

  const handleSendMessage = () => {
    const newMessage = {
      message,
      date: new Date(),
      isSender,
    };

    setMessages([...messages, newMessage]);
    setIsSender(!isSender);
    setMessage("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isSender
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Client Name</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isSender ? "Type a message " : "Type a message "}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

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
});
