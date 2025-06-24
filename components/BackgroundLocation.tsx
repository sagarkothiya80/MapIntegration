import { useEffect } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { saveRouteLocally } from '../utils/storage';

const BackgroundLocation = () => {
    useEffect(() => {
        console.log('call background ')
        BackgroundGeolocation.onLocation(location => {
            console.log('background ocation', location)
            const { latitude, longitude } = location.coords;
            saveRouteLocally([{ latitude, longitude }]);
        });
        console.log('call ... ')
        BackgroundGeolocation.ready({
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10,
            stopOnTerminate: false,
            startOnBoot: true,
            debug: false,
            logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
        }).then(() => {
            console.log('start ')
            BackgroundGeolocation.start();
        });

        return () => BackgroundGeolocation.removeListeners();
    }, []);

    return null;
};

export default BackgroundLocation;