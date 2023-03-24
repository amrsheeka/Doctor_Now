import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

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
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isSender ? "Type a message (you)" : "Type a message (receiver)"}
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
    backgroundColor: '#f2f2f2'
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
    backgroundColor: '#007bff',
    alignSelf: 'flex-end'
  },
  receiverMessageContainer: {
    backgroundColor: '#e5e5e5',
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
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingLeft: 16,
    marginRight: 16
  },
  sendButton: {
    width: 80,
    height: 48,
    backgroundColor: '#007bff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonText: {
    fontSize: 16,
    color: '#fff'
  }
});