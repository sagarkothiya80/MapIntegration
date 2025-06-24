import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

export const saveRouteLocally = (route) => {
    storage.set('savedRoute', JSON.stringify(route));
};

export const loadSavedRoute = (setPath) => {
    const saved = storage.getString('savedRoute');
    if (saved) {
        setPath(JSON.parse(saved));
    }
};
