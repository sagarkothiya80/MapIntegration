import Geolocation from '@react-native-community/geolocation';
import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useEffect } from 'react-native'
import BackgroundTimer from 'react-native-background-timer';
import MapView, { Polyline } from 'react-native-maps';
import { saveRouteLocally } from '../../utils/storage';

const TaskOne = () => {
    const [count, setCount] = useState(0);
    const intervalIdRef = useRef<number | null>(null);
    const mapRef = useRef(null);

    const startBackgroundTimer = () => {
        if (intervalIdRef.current) return; // Prevent multiple timers

        console.log('Starting background timer...');
        intervalIdRef.current = BackgroundTimer.setInterval(() => {
            console.log('Timer tick');
            setCount(prev => prev + 1);

            Geolocation.getCurrentPosition(info => {
                console.log('getCurrentPosition', info)
                const { coords } = info
                saveRouteLocally([{ latitude: coords.latitude, longitude: coords.longitude }]);
            });

        }, 1000); // every 1 second
    };

    const stopBackgroundTimer = () => {
        if (intervalIdRef.current !== null) {
            console.log('Stopping background timer...');
            BackgroundTimer.clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };

    //   useEffect(() => {
    //     // Optional: Stop on unmount
    //     return () => {
    //       stopBackgroundTimer();
    //     };
    //   }, []);


    return (
        <View>
            <View style={{ height: '90%' }}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={currentRegion}
                    provider='google'
                >
                    <Polyline
                        coordinates={coords}
                        strokeColor="#000"
                        strokeColors={[
                            '#7F0866',
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
            </View>
            <View style={{ height: '10%', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ height: 40, width: '49%', backgroundColor: "#E0F7FA" }}
                    onPress={startBackgroundTimer}
                >
                    <Text style={styles.buttonText}>Start Tracking</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: 40, width: '49%', backgroundColor: "#FBE9E7" }}
                    onPress={stopBackgroundTimer}
                >
                    <Text style={styles.buttonText}>Stop Tracking</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TaskOne

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})