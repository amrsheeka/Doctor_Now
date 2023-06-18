import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { getFavourite } from "../../database/Users";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../consts/AppContext";
import CurrentUser from "../consts/CurrentUser";
import DoctorCard2 from "../subcomponents/DoctorCard2";
const Favorite = ({ navigation, reload }) => {
  const { favourite, setFavourite } = useContext(AppContext);
  const { night } = useContext(AppContext);
  const {refreshing, setRefreshing} = useContext(AppContext);
  const renderDoctor = ({ item }) => {
    return (
      <DoctorCard2 reload={fetchDoctor} doctor={item} navigation={navigation} />
    );
  };
  async function fetchDoctor() {
    const filt = await getFavourite(CurrentUser.user.id);
    setFavourite(filt);
  }
  useEffect(() => {
    fetchDoctor();
  }, []);
  return (
    <View style={[styles.container, night && styles.buttonDark]}>
      <View style={styles.my_header}>
        <Text style={styles.my_label}> My Favourite </Text>
      </View>

      {favourite.length !== 0 ? (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={favourite}
          renderItem={renderDoctor}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                  }}
                  source={
                    night
                      ? require("../assets/empty1.png")
                      : require("../assets/empty.png")
                  }
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchDoctor} />
          }
        />
      ) : (
        <View style={{ padding: "18%" }}>
          <ActivityIndicator size={100} color="#00ff00" />
        </View>
      )}

      <StatusBar style="light" backgroundColor="#288759" />
    </View>
  );
};

const styles = StyleSheet.create({
  my_header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  my_label: {
    fontSize: 20,
    color: "white",
  },
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
  buttonDark: {
    backgroundColor: "#0D1E3D",
  },
  darklist: {
    backgroundColor: "#142E5E",
  },
  dark2: {
    backgroundColor: "#BDD3FF",
  },
});

export default Favorite;
