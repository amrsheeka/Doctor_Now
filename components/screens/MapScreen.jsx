import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({navigation,route}) {
  
  // let s ="" ;
  // s= route.params;
  // let s2 = "";
  // for (let i = 0; i < s.length; i++) {
  //   if(s.charAt(i)==':'){
  //     break;
  //   }
  //   s2+= s.charAt(i);
    
  // }
  // console.log(s2);
  // const [initialRegion, setInitialRegion] = useState(null);
  // const [searchResult, setSearchResult] = useState(null); //state to store the search result

  // const handleSearch = async () => {
  //   try {
  //     const apiUrl = `https://nominatim.openstreetmap.org/search?q=${s2}&format=json`;
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     const { lat, lon } = data[0];
  //     setSearchResult({ latitude: parseFloat(lat), longitude: parseFloat(lon) }); // update the search result state with the location coordinates
  //     setInitialRegion({ // update the initial region state to center the map at the searched location
  //       latitude: parseFloat(lat),
  //       longitude: parseFloat(lon),
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // Listen for changes to the route.params value and update the initialRegion state accordingly
  // useEffect(() => {
  //   let s ="" ;
  //   s= route.params;
  //   let s2 = "";
  //   for (let i = 0; i < s.length; i++) {
  //     if(s.charAt(i)==':'){
  //       break;
  //     }
  //     s2+= s.charAt(i);
  //   }
    
  //   handleSearch(); // Call the handleSearch function to update the initialRegion state
  // }, [route.params]);

  // const handleMarkerPress = () => {
  //   setSearchResult(null); //clear the search result when the marker is pressed
  // };

  // return (
  //   <View style={styles.container}>
  //     <MapView style={styles.map} region={initialRegion}>
  //       {searchResult && <Marker coordinate={searchResult} onPress={handleMarkerPress} />}
  //     </MapView>
      
  //   </View>
  // );
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  searchButton: {
    height: '100%',
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
