import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { addDoctor } from '../../database/Doctors';

export default function Map({ navigation, route }) {
    let addres = route.params.address;
    let lat = route.params.x_coordnate;
    let lon = route.params.y_coordnate;
    const [doctor, setDoctor] = useState(item);
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lon);
    const [initialRegion, setInitialRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerCoords, setMarkerCoords] = useState(null);

    async function getlocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // handle permission denied

        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }

    useEffect(() => {
        getlocation();
    }, []);

    function handleMapPress(event) {
        setMarkerCoords(event.nativeEvent.coordinate);
    }
    async function handleConfirmPress() {
        if (markerCoords) {
            let doc = doctor;

            doc = {
                ...doc, x_coordnate: markerCoords.latitude,
                y_coordnate: markerCoords.longitude
            }

            console.log(markerCoords, doctor.x_coordnate);
            addDoctor(doc).then(
                ()=>{
                    navigation.navigate("Thk4");
                }
            )
        } else {
            alert("Select Location");
        }
    }
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion} onPress={handleMapPress}>
                {
                    markerCoords && <Marker coordinate={markerCoords} />
                }
            </MapView>
            <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirmPress()}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );

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
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: '#3CB371',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
