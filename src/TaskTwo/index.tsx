import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '../../utils/Utils';
import { Colors } from '../../utils/Color';

const TaskTwo = () => {
    const [placeList, setPlaceList] = useState([])
    const [searchType, setSearchType] = useState('')
    const [searchStartPoint, setSearchStartPoint] = useState('')
    const [searchEndPoint, setSearchEndPoint] = useState('')
    const [startPointLatLong, setStartPointLatLong] = useState(null)
    const [endPointLatLong, setEndPointLatLong] = useState(null)
    const [isShowPlaceList, setIsShowPlaceList] = useState(false)

    const navigation: any = useNavigation();

    //start and end point location searching by using open google place api
    useEffect(() => {
        const input = searchType === 'Start' ? searchStartPoint : searchEndPoint
        const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(regions)&key=${API_KEY}`
        axios.get(URL).then(res => {
            setPlaceList(res.data.predictions)
        });

    }, [searchStartPoint, searchEndPoint, searchType])

    //onPressLocation to search location list click of get the actual latitude and longitude
    const onPressLocation = (place_id: string) => {
        const URL = ` https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${API_KEY}`

        console.log(URL)
        axios.get(URL).then(res => {
            if (searchType === 'Start') {
                setStartPointLatLong(res.data.result.geometry.location)
            } else {
                setEndPointLatLong(res.data.result.geometry.location)
            }
        });
    }

    //renderItem to rending the list of search location
    const renderItem = ({ item }: any) => {
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

    return (
        <View style={styles.container}>
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

            <TouchableOpacity style={styles.placeFinderButton}
                onPress={() => {
                    if (startPointLatLong && endPointLatLong) {
                        navigation.navigate('PlaceFinder', {
                            startPoint: startPointLatLong,
                            endPoint: endPointLatLong
                        })
                    }
                }}
            >
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>

        </View>
    )
}
export default TaskTwo


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.color4,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginTop: 10
    },
    placeFinderButton: {
        height: 40,
        width: '100%',
        backgroundColor: Colors.color5,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmText: {
        color: Colors.color6
    }
})