import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import CustomBottomSheet from '../../components/CustomBottomSheet'

type ModalTypeProp = 'VERTICAL_LIST' | 'HORIZONTAL_LIST' | 'VERTICAL_LIST_LIMITED_ITEM' | 'HORIZONTAL_LIST_LIMITED_ITEM'

const getRandomColor = () => {
    const index = Math.floor(Math.random() * lightColors.length);
    return lightColors[index];
};

const TaskThree = () => {
    const [visibleListModal, setVisibleListModal] = useState(false)
    const [modalType, setModalType] = useState<ModalTypeProp>()

    const renderVerticalListOfItem = () => {
        return (
            <View>
                <FlatList
                    data={modalType === 'VERTICAL_LIST_LIMITED_ITEM' ? digits.slice(0, 5) : digits}
                    renderItem={renderDigitItem}
                />
            </View>
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: 70, padding: 10, width: 70, backgroundColor: getRandomColor(), margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{item}</Text>
            </View>
        )
    }

    const renderDigitItem = ({ item, index }) => {
        return (
            <View style={{ alignSelf: 'center', height: 50, padding: 10, width: '90%', backgroundColor: getRandomColor(), margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{item}</Text>
            </View>
        )
    }

    const renderAlphabettem = ({ item, index }) => {
        return (
            <View style={{ height: 150, padding: 10, width: 150, backgroundColor: getRandomColor(), margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{item}</Text>
            </View>
        )
    }

    const renderFruitItem = ({ item, index }) => {
        return (
            <View style={{ height: 100, padding: 10, width: 200, backgroundColor: getRandomColor(), margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{item}</Text>
            </View>
        )
    }

    const renderImageItem = ({ item, index }) => {
        return (
            <View style={{ height: 400, padding: 10, width: 400, margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: item }} style={{ height: '100%', width: '100%' }} />
            </View>
        )
    }

    const renderHorizontalListOfItem = () => {
        return (
            <View>
                <FlatList
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]}
                    renderItem={renderItem}
                    horizontal
                />
                <FlatList
                    data={Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))}
                    renderItem={renderAlphabettem}
                    horizontal
                />
                <FlatList
                    data={fruits}
                    renderItem={renderFruitItem}
                    horizontal
                />
                <FlatList
                    data={imageUrls}
                    renderItem={renderImageItem}
                    horizontal
                />
            </View>
        )
    }

    const renderChildren = () => {
        if (modalType === 'VERTICAL_LIST' || modalType === 'VERTICAL_LIST_LIMITED_ITEM') {
            return renderVerticalListOfItem()
        }
        if (modalType === 'HORIZONTAL_LIST') {
            return renderHorizontalListOfItem()
        }
    }

    return (
        <View>
            <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: "#E0F7FA", marginTop: 40 }}
                onPress={() => {
                    setModalType('VERTICAL_LIST')
                    setVisibleListModal(true)
                }}
            >
                <Text style={styles.buttonText}>Vertical List</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: "#FBE9E7", marginTop: 20 }}
                onPress={() => {
                    setModalType('VERTICAL_LIST_LIMITED_ITEM')
                    setVisibleListModal(true)
                }}
            >
                <Text style={styles.buttonText}>Vertical List with limited item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: "#F0F4C3", marginTop: 20 }}
                onPress={() => {
                    setModalType('HORIZONTAL_LIST')
                    setVisibleListModal(true)
                }}
            >
                <Text style={styles.buttonText}>Horiontal List</Text>
            </TouchableOpacity>

            <CustomBottomSheet
                visible={visibleListModal}
                onDismiss={() => setVisibleListModal(false)}
                children={renderChildren()}
            />
        </View>
    )
}
export default TaskThree


const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    }
})

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

const lightColors = [
    "#FFEBEE", "#FFF3E0", "#FFFDE7", "#E8F5E9", "#E3F2FD",
    "#F3E5F5", "#FBE9E7", "#E0F7FA", "#F1F8E9", "#ECEFF1",
    "#F9FBE7", "#FCE4EC", "#E1F5FE", "#F0F4C3", "#F8BBD0"
];

const fruits = [
    "Apple", "Banana", "Orange", "Mango", "Pineapple",
    "Grapes", "Strawberry", "Blueberry", "Watermelon", "Papaya",
    "Kiwi", "Guava", "Lychee", "Cherry", "Peach",
    "Pear", "Plum", "Fig", "Pomegranate", "Coconut"
];

const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/?blur",
    "https://picsum.photos/200/300/?blur=2",
    "https://picsum.photos/id/870/200/300?grayscale&blur=2",
    "https://picsum.photos/200/300.jpg",
];