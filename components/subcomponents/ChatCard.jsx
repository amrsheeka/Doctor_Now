import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
const ChatCard = ({ chat,navigation }) => {
    return (
        <TouchableOpacity
        // onPress={navigation.navigate("ChatScreen")}
        style={styles.card}>
            <Image source={chat.photo} style={styles.cardPhoto} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{chat.name}</Text>
                <Text style={styles.cardMessage}>{chat.message}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
export default ChatCard;