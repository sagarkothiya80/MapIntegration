import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Polyline, Marker } from 'react-native-maps';
import BackgroundTimer from 'react-native-background-timer';
import { saveRouteLocally, loadSavedRoute } from '../../utils/storage';

const TaskOne = () => {
    const [coords, setCoords] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const mapRef = useRef(null);
    const [currentRegion, setCurrentRegion] = useState(null);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            ]);
        }
    };

    useEffect(() => {
        requestPermissions();
        loadSavedRoute((loadedPath) => {
            setCoords(loadedPath);
            if (loadedPath.length > 0) {
                const last = loadedPath[loadedPath.length - 1];
                setCurrentRegion({
                    latitude: last.latitude,
                    longitude: last.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        });

        return () => {
            stopTracking();
        };
    }, []);

    const trackLocation = () => {
        Geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                const newCoord = { latitude, longitude };
                console.log('Location:', newCoord);

                setCoords(prev => {
                    const updated = [...prev, newCoord];
                    saveRouteLocally(updated);
                    return updated;
                });

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            },
            error => console.warn(error),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
    };

    const startTracking = () => {
        if (intervalRef.current) return;
        console.log('Started tracking');
        trackLocation(); // first immediate call
        intervalRef.current = BackgroundTimer.setInterval(trackLocation, 5000);
        setIsTracking(true);
    };

    const stopTracking = () => {
        if (intervalRef.current !== null) {
            console.log('Stopped tracking');
            BackgroundTimer.clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsTracking(false);
        }
    };

    const toggleTracking = () => {
        isTracking ? stopTracking() : startTracking();
    };

    // Fit map to route every time coords change
    useEffect(() => {
        if (mapRef.current && coords.length > 1) {
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
        } else if (mapRef.current && coords.length === 1) {
            const { latitude, longitude } = coords[0];
            mapRef.current.animateToRegion(
                {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                1000
            );
        }
    }, [coords]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={currentRegion}
                region={currentRegion}
                provider="google"
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {coords.length > 0 && (
                    <>
                        <Polyline
                            coordinates={coords}
                            strokeColor="#FF0000"
                            strokeWidth={4}
                        />
                        <Marker coordinate={coords[coords.length - 1]} />
                    </>
                )}
            </MapView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: isTracking ? '#FBE9E7' : '#E0F7FA' },
                    ]}
                    onPress={toggleTracking}
                >
                    <Text style={styles.buttonText}>
                        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskOne;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    footer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    button: {
        width: '90%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
    },
});
