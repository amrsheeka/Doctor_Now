import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { addDoctor, updateDoctor } from '../../database/Doctors';

export default function Map({ navigation, route }) {
    const item = route.params.doctor;
    const address = route.params.address;
    const [doctor, setDoctor] = useState(item);
    const [latitude, setLatitude] = useState(item.x_coordnate);
    const [longitude, setLongitude] = useState(item.y_coordnate);
    const [initialRegion, setInitialRegion] = useState({
        latitude: parseFloat(item.x_coordnate),
        longitude: parseFloat(item.y_coordnate),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerCoords, setMarkerCoords] = useState(null);

    async function getlocation() {

    }

    useEffect(() => {
        //getlocation();
    }, []);

    function handleMapPress(event) {
        setMarkerCoords(event.nativeEvent.coordinate);
    }
    async function handleConfirmPress() {
        if (markerCoords) {
            let doc = doctor;

            doc["x_coordnate"] = markerCoords.latitude;
            doc["y_coordnate"] = markerCoords.longitude;
            doc["address"] = address;

            //console.log(markerCoords, doctor.x_coordnate);
            updateDoctor(doc).then(
                () => {
                    alert("Your address updated successfully")
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
