import * as React from 'react';
import { View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/Welcome';
import TaskOneScreen from './src/TaskOne';
import TaskTwoScreen from './src/TaskTwo';
import TaskThreeScreen from './src/TaskThree';
import PlaceFinderScreen from './src/TaskTwo/PlaceFinder';
import { PaperProvider } from 'react-native-paper';

const RootStack = createNativeStackNavigator({
    screens: {
        Welcome: WelcomeScreen,
        TaskOne: TaskOneScreen,
        TaskTwo: TaskTwoScreen,
        TaskThree: TaskThreeScreen,
        PlaceFinder: PlaceFinderScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <PaperProvider>
            <Navigation />
        </PaperProvider>
    );
}