import React from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import doctors from '../consts/Doctor';
const DoctorCard = ({ doctor }) => {
  return (
    <View style={styles.card}>
      <Image source={doctor.photo} style={styles.cardPhoto} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{doctor.name}</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Make Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomePage = () => {
  const renderDoctor = ({ item }) => <DoctorCard doctor={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Doctor Appointment App</Text>
        <Text style={styles.subHeading}>Find a doctor and schedule an appointment</Text>
      </View>
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: 150,
    height: 230,
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
    width: 150,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardButton: {
    backgroundColor: '#007aff',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomePage;