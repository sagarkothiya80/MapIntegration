

import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BackgroundService from 'react-native-background-actions';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const veryIntensiveTask = async (taskDataArguments: any) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' }); // Only Android, iOS will ignore this call
            console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'TestService',
    taskTitle: 'Service Running',
    taskDesc: 'Doing some work',
    taskIcon: {
        name: 'ic_launcher',
        type: 'noti',
    },
    color: '#00ff00',
    parameters: {
        delay: 1000,
    },
};

export default function BackgroundExample() {
    const start = async () => {
        if (!BackgroundService.isRunning()) {
            await BackgroundService.start(veryIntensiveTask, options);
        }
    };

    const stop = async () => {
        if (BackgroundService.isRunning()) {
            await BackgroundService.stop();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: "#E0F7FA", marginTop: 40 }}
                onPress={start}
            >
                <Text style={styles.buttonText}>startBackgroundTask</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: "#E0F7FA", marginTop: 40 }}
                onPress={stop}
            >
                <Text style={styles.buttonText}>stopBackgroundTask</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    }
})