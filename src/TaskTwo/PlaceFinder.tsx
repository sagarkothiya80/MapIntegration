
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { API_KEY } from '../../utils/Utils';

const PlaceFinder = ({ route }: any) => {
    const { startPoint, endPoint } = route.params;
    const mapRef: any = useRef(null);

    const [coords, setCoords] = useState([
        { latitude: startPoint.lat, longitude: startPoint.lng },
        { latitude: endPoint.lat, longitude: endPoint.lng }
    ]);

    const [currentRegion] = useState({
        latitude: startPoint.lat,
        longitude: startPoint.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });


    useEffect(() => {
        const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${startPoint.lat},${startPoint.lng}&destination=${endPoint.lat},${endPoint.lng}&key=${API_KEY}`
        axios.get(URL).then(res => {
            const steps = res.data.routes[0].legs[0].steps
            console.log('roite res', steps)
            const routeCoords = [];
            routeCoords.push({ latitude: startPoint.lat, longitude: startPoint.lng });

            steps.map((item: any) => {
                routeCoords.push({
                    latitude: item.start_location.lat,
                    longitude: item.start_location.lng,
                });
                routeCoords.push({
                    latitude: item.end_location.lat,
                    longitude: item.end_location.lng,
                });
            })
            routeCoords.push({ latitude: endPoint.lat, longitude: endPoint.lng });
            setCoords(routeCoords)

        });
    }, [])

    useEffect(() => {
        if (mapRef?.current && coords?.length > 0) {
            setTimeout(() => {
                mapRef.current.fitToCoordinates(coords, {
                    edgePadding: {
                        top: 40,
                        right: 40,
                        bottom: 40,
                        left: 40,
                    },
                    animated: true,
                });
            }, 500);
        }
    }, [startPoint, endPoint, mapRef]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={currentRegion}
                provider="google"
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <>
                    <Polyline
                        coordinates={coords}
                        strokeColor="#000"
                        strokeColors={[
                            '#7F0866',
                        ]}
                        strokeWidth={6}
                    />
                    {coords.length > 0 && (
                        <Marker coordinate={coords[coords.length - 1]} />
                    )}
                </>
            </MapView>
        </View>
    )
}
export default PlaceFinder

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});