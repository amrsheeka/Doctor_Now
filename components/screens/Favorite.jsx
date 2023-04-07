import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { getFavourite } from "../../database/Users";
import { AppProvider,AppContext } from "../consts/AppContext";
import CurrentUser from "../consts/CurrentUser";
import DoctorCard2 from "../subcomponents/DoctorCard2";
const Favorite = ({ navigation, reload }) => {
  const { favourite, setFavourite } = useContext(AppContext);
  const renderDoctor = ({ item }) => {
    return (<DoctorCard2 reload={fetchDoctor} doctor={item} navigation={navigation} />
    );
  }
  async function fetchDoctor() {
    const filt = await getFavourite(CurrentUser.user.id);
    setFavourite([...filt]);
  }
  useEffect(() => {

    fetchDoctor();
  }, []);
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Favorite Doctors</Text>
        </View>

        {favourite.length !== 0 ? (
          <FlatList

            data={favourite}
            renderItem={renderDoctor}

            keyExtractor={(item, index) => item.id}
          />
        ) : (
          <View style={{ padding: "18%" }}>
            <ActivityIndicator size={100} color="#00ff00" />
          </View>
        )}

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
});

export default Favorite;
