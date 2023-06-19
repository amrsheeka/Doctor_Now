import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getDoc } from "../../database/Doctors";

export default function MapScreen({ navigation, route }) {
  const id = route.params.id;
  const [initialRegion, setInitialRegion] = useState({
    latitude: 30,
    longitude: 30,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchResult, setSearchResult] = useState(null); // state to store the search result

  const getLocation = async () => {
    getDoc(id).then((res) => {
      const latitude = parseFloat(res[0].x_coordnate);
      const longitude = parseFloat(res[0].y_coordnate);

      setSearchResult({ latitude, longitude });

      // Update initialRegion to the marker's coordinates
      setInitialRegion((prevRegion) => ({
        ...prevRegion,
        latitude,
        longitude,
      }));
    });
  };

  useEffect(() => {
    getLocation();
  }, [route.params]);

  const handleMarkerPress = () => {
    setSearchResult(null); // clear the search result when the marker is pressed
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initialRegion}>
        {searchResult && (
          <Marker coordinate={searchResult} onPress={handleMarkerPress} />
        )}
      </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  searchButton: {
    height: "100%",
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
