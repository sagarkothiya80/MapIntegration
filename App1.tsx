import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import MapTracker from './components/MapTracker';
import BackgroundLocation from './components/BackgroundLocation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task1 from './src/TaskOne';
import Task2 from './src/TaskTwo';
import Task3 from './src/TaskThree';
import Welcome from './src/Welcome';


const App = () => {
  // const [routeGeoJSON, setrouteGeoJSON] = useState(null)
  // const [currentRegion, setCurrentRegion] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // });

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     if (Platform.OS === 'android') {
  //       await PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  //       ]);
  //     }
  //   };
  //   requestPermissions();
  // }, []);

  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       style={styles.map}
  //       initialRegion={{
  //         latitude: 37.78825,
  //         longitude: -122.4324,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }}
  //     >
  //       <Marker
  //         coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
  //         title="My Marker"
  //         description="This is a description"
  //       />
  //     </MapView>
  //   </View>
  // )


  // const url = 'http://router.project-osrm.org/route/v1/driving/21.2408,72.8806;21.2148,72.8886?overview=full&geometries=geojson'
  // // const url = `http://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

  // const mapRef = useRef(null);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => {
  //     console.log('getCurrentPosition', info)
  //     const { coords } = info
  //     setCurrentRegion({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     })

  //   });

  //   const watchId = Geolocation.watchPosition(
  //     position => {
  //       console.log('position', position)
  //       const { latitude, longitude } = position.coords;
  //       const newLocation = { latitude, longitude };
  //       setCurrentRegion({ ...currentRegion, latitude, longitude });
  //       // const updatedPath = [...pathCoordinates, newLocation];
  //       // setPathCoordinates(updatedPath);
  //       // saveRouteLocally(updatedPath);
  //     },
  //     error => console.warn(error),
  //     { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 },
  //   );

  //   return () => Geolocation.clearWatch(watchId);
  // }, []);


  // useEffect(() => {
  //   axios.get(url).then(res => {
  //     const routeGeoJSON = res.data.routes[0].geometry;
  //     console.log('routeGeoJSON', routeGeoJSON)
  //     setrouteGeoJSON(routeGeoJSON)
  //     // navigation.navigate('RouteMapScreen', { geojson: routeGeoJSON });
  //   });
  // }, [])

  // const coordinates = routeGeoJSON?.coordinates.map(coord => ({
  //   latitude: coord[1],
  //   longitude: coord[0],
  // }));


  // console.log('coordinates', coordinates)


  // useEffect(() => {
  //   if (mapRef?.current && coordinates.length > 0) {
  //     mapRef?.current?.fitToCoordinates(coordinates, {
  //       edgePadding: {
  //         top: 100,
  //         right: 50,
  //         bottom: 100,
  //         left: 50,
  //       },
  //       animated: true,
  //     });
  //   }
  // }, [coordinates]);

  // return (
  //   <>
  //     {/* {routeGeoJSON ? */}
  //     <MapView
  //       // ref={mapRef}
  //       style={styles.map}
  //       region={currentRegion}
  //       // initialRegion={{
  //       //   latitude: coordinates[0].latitude,
  //       //   longitude: coordinates[0].longitude,
  //       //   latitudeDelta: 0.01,
  //       //   longitudeDelta: 0.01,
  //       // }}
  //       provider='google'
  //     >
  //       {/* <Polyline
  //           coordinates={routeGeoJSON.coordinates.map(coord => ({
  //             latitude: coord[1],
  //             longitude: coord[0],
  //           }))}
  //           strokeWidth={4}
  //           strokeColor="blue"
  //         /> */}
  //       {/* <Polyline
  //           coordinates={coordinates}
  //           strokeWidth={4}
  //           strokeColor="blue"
  //         /> */}
  //       {/* 21.2408,72.8806;21.2148,72.8886 */}
  //       <Polyline
  //         coordinates={[
  //           { latitude: 21.2408, longitude: 72.8806 },
  //           { latitude: 21.2148, longitude: 72.8886 },
  //           // { latitude: 37.7665248, longitude: -122.4161628 },
  //           // { latitude: 37.7734153, longitude: -122.4577787 },
  //           // { latitude: 37.7948605, longitude: -122.4596065 },
  //           // { latitude: 37.8025259, longitude: -122.4351431 },
  //         ]}
  //         strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
  //         strokeColors={[
  //           '#7F0000',
  //           '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
  //           '#B24112',
  //           '#E5845C',
  //           '#238C23',
  //           '#7F0000',
  //         ]}
  //         strokeWidth={6}
  //       />
  //     </MapView>
  //     {/* : <View />
  //     } */}
  //     {/* <MapTracker />
  //     <BackgroundLocation /> */}
  //   </>
  // )

  // return (
  //   <>
  //     {/* <BackgroundLocation /> */}
  //   </>
  // );


  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Welcome',
    screens: {
      Welcome: Welcome,
      Task1: Task1,
      // Task2: Task2,
      Task3: Task3,
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </View>
  )
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });