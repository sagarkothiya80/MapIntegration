import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TaskTwo = () => {
    const [placeList, setPlaceList] = useState([])
    const [searchType, setSearchType] = useState('')
    const [searchStartPoint, setSearchStartPoint] = useState('')
    const [searchEndPoint, setSearchEndPoint] = useState('')
    const [startPointLatLong, setStartPointLatLong] = useState(null)
    const [endPointLatLong, setEndPointLatLong] = useState(null)
    const [isShowPlaceList, setIsShowPlaceList] = useState(false)

    const navigation = useNavigation();

    console.log('searchType', searchType)
    const API_KEY = 'AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo'
    useEffect(() => {
        const input = searchType === 'Start' ? searchStartPoint : searchEndPoint
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(regions)&key=${API_KEY}`).then(res => {
            console.log('res', res)
            setPlaceList(res.data.predictions)
        });

    }, [searchStartPoint, searchEndPoint, searchType])

    console.log('startPointLatLong', startPointLatLong)
    console.log('endPointLatLong', endPointLatLong)

    const onPressLocation = (place_id) => {
        console.log('place_id,', place_id)
        const URL = ` https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${API_KEY}`

        console.log(URL)
        axios.get(URL).then(res => {
            console.log('res', res)
            if (searchType === 'Start') {
                setStartPointLatLong(res.data.result.geometry.location)
            } else {
                setEndPointLatLong(res.data.result.geometry.location)
            }
        });
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#000' }}
                onPress={() => {
                    setIsShowPlaceList(false)
                    onPressLocation(item.place_id)
                    if (searchType === 'Start') {
                        setSearchStartPoint(item.description)
                    } else {
                        setSearchEndPoint(item.description)
                    }
                }}
            >
                <Text>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    console.log('placeList', placeList)

    return (
        <View style={{ padding: 20 }}>
            <Text>Task2</Text>
            <TextInput
                placeholder="Search Start Point"
                value={searchStartPoint}
                onChangeText={(value) => {
                    setSearchType('Start')
                    setIsShowPlaceList(true)
                    setSearchStartPoint(value)
                }}
                style={styles.input}
            />
            <TextInput
                placeholder="Search End Point"
                value={searchEndPoint}
                onChangeText={(value) => {
                    setSearchType('End')
                    setIsShowPlaceList(true)
                    setSearchEndPoint(value)
                }}
                style={styles.input}
            />
            <View>
                {isShowPlaceList &&
                    <FlatList
                        data={placeList}
                        renderItem={renderItem}
                    />
                }
            </View>

            <TouchableOpacity style={{
                height: 40,
                width: '100%',
                backgroundColor: 'blue',
                marginTop: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}
                onPress={() => {
                    if (startPointLatLong && endPointLatLong) {
                        navigation.navigate('PlaceFinder', {
                            startPoint: startPointLatLong,
                            endPoint: endPointLatLong
                        })
                    }
                }}
            >
                <Text style={{ color: '#fff' }}>Confirm</Text>
            </TouchableOpacity>

        </View>
    )
}
export default TaskTwo



const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 60,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginTop: 10
    },
})