import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const User = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.profile}>
          <Image source={require('../assets/Herbal_Medicine_Male_Avatar.png')} style={styles.profilePhoto} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>John Smith</Text>
            <Text style={styles.profileSubtitle}>Male, 30 years old</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>johnsmith@gmail.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>+1 (123) 456-7890</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#288771',
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
  content: {
    paddingHorizontal: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  info: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
  },
});

export default User;
