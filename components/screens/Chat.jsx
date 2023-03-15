import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const ChatCard = ({ chat }) => {
  return (
    <View style={styles.card}>
      <Image source={chat.photo} style={styles.cardPhoto} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{chat.name}</Text>
        <Text style={styles.cardMessage}>{chat.message}</Text>
      </View>
    </View>
  );
};

const Chat= () => {
  const renderChat = ({ item }) => <ChatCard chat={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chats</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007aff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
  },
  cardMessage: {
    fontSize: 14,
    color: '#555',
  },
});

export default Chat;
