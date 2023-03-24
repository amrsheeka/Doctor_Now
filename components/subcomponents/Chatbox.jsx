import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Chatbox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSender, setIsSender] = useState(true);

  const handleSendMessage = () => {
    const newMessage = {
      message,
      date: new Date(),
      isSender
    };

    setMessages([...messages, newMessage]);
    setIsSender(!isSender);
    setMessage('');
  }

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isSender ? styles.senderMessageContainer : styles.receiverMessageContainer
    ]}>
      <Text style={[
        styles.message,
        item.isSender ? styles.senderMessage : styles.receiverMessage
      ]}>{item.message}</Text>
      <Text style={styles.date}>{item.date.toLocaleString()}</Text>
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
          onChangeText={text => setMessage(text)}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfafa'
  },
  messages: {
    flex: 1
  },
  messageContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-end'
  },
  senderMessageContainer: {
    backgroundColor: '#288771',
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  receiverMessageContainer: {
    backgroundColor: '#eceff1',
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  message: {
    fontSize: 16,
    color: '#fff'
  },
  senderMessage: {
    color: '#fff'
  },
  receiverMessage: {
    color: '#000'
  },
  date: {
    fontSize: 10,
    marginTop: 8,
    textAlign: 'right'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    color:'#cbcbcb',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#eceff1',
    borderRadius: 24,
    paddingLeft: 16,
    marginRight: 16
  },
  sendButton: {
    width: 80,
    height: 48,
    backgroundColor: '#288771',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonText: {
    fontSize: 16,
    color: '#fff'
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
 
});