import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Welcome = () => {
    const navigation: any = useNavigation();

    return (
        <View>
            <TouchableOpacity style={styles.buttonBody}
                onPress={() => navigation.navigate('TaskOne')}
            >
                <Text style={styles.buttonText}>Task 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBody}
                onPress={() => navigation.navigate('TaskTwo')}
            >
                <Text style={styles.buttonText}>Task 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBody}
                onPress={() => navigation.navigate('TaskThree')}
            >
                <Text style={styles.buttonText}>Task 3</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Welcome

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    },
    buttonBody: {
        height: 40,
        width: '100%',
        backgroundColor: "#E0F7FA",
        marginTop: 40
    }
})