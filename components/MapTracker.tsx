import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Polyline, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { loadSavedRoute, saveRouteLocally } from '../utils/storage';

const screen = Dimensions.get('window');

const MapTracker = () => {
    const [pathCoordinates, setPathCoordinates] = useState([]);
    const [currentRegion, setCurrentRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    console.log('currentRegion', currentRegion)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            console.log('getCurrentPosition', info)
            const { coords } = info
            setCurrentRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })

        });
        loadSavedRoute(setPathCoordinates);

        const watchId = Geolocation.watchPosition(
            position => {
                console.log('position', position)
                const { latitude, longitude } = position.coords;
                const newLocation = { latitude, longitude };
                setCurrentRegion({ ...currentRegion, latitude, longitude });
                const updatedPath = [...pathCoordinates, newLocation];
                setPathCoordinates(updatedPath);
                saveRouteLocally(updatedPath);
            },
            error => console.warn(error),
            { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 },
        );

        return () => Geolocation.clearWatch(watchId);
    }, [pathCoordinates]);

    return (
        <MapView
            style={styles.map}
            region={currentRegion}
            // initialRegion={{
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // }}
            showsUserLocation
            followsUserLocation
            tileOverlay={{
                tileProvider: {
                    getTileUrl: (x, y, z) =>
                        `file:///storage/emulated/0/tiles/${z}/${x}/${y}.png`,
                },
            }}
        >

            <Polyline coordinates={pathCoordinates} strokeColor="#000" strokeWidth={4} />

            {/* <Marker
                coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                title="My Marker"
                description="This is a description"
            /> */}
        </MapView>
        // <MapView
        //     style={styles.map}
        //     provider={PROVIDER_DEFAULT}
        //     region={currentRegion}
        //     showsUserLocation
        //     followsUserLocation
        //     tileOverlay={{
        //         tileProvider: {
        //             getTileUrl: (x, y, z) =>
        //                 `file:///storage/emulated/0/tiles/${z}/${x}/${y}.png`,
        //         },
        //     }}
        // >
        //     <Polyline coordinates={pathCoordinates} strokeColor="#000" strokeWidth={4} />
        // </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapTracker;
