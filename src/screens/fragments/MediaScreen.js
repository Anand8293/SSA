import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView, Image } from "react-native"
import ImagePicker from 'react-native-image-picker';



export default function MediaScreen({ colors, action }) {

    /**
       * @Variable & @States
       * @description creating and initialiation of variables & states
       * @returns null
       */

    const [photoList, addPhoto] = useState([])

    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
        title: 'Select Photo via',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    function didPressClickPhoto() {
        /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                addPhoto([...photoList, response.uri])

                console.log('image uri -> ', response.uri)

            }
        });
    }

    /**
    * @method _renderPhoto
    * @description Renders the Photo item
    * @returns {XML}
    */
    function _renderPhoto({ item, index }) {
        console.log('item', item)
        return (
            <Image style={{ flex: 1 / 3, height: 80, margin: 10, backgroundColor: '#f3f3f3', borderRadius: 5 }}
                source={{ uri: item }} />
        )
    }


    /**
    * @method render
    * @description Renders the scenes
    * @returns {XML}
    */

    return (
        <View style={{ flex: 1, margin: 15 }}>

            <View style={styles.subContainer}>
                <View style={{ padding: 10, backgroundColor: '#64E2CB', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>19</Text>
                    <Text style={{ fontSize: 16, color: 'white' }}>AUGUST</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, color: '#333' }}>Available for paid photo shot</Text>
                    <Text style={{ fontSize: 16, color: '#d3d3d3', marginTop: 5 }}>Miami Beach, FL</Text>
                </View>
                <TouchableOpacity onPress={didPressClickPhoto} >
                    <Icon name='add' size={40} color='#64E2CB' />
                </TouchableOpacity>

                <View style={{ width: 5, height: '100%', backgroundColor: '#64E2CB', }}>
                </View>

            </View>
            <View style={[styles.subContainer, { marginVertical: 0 }]}>
                <FlatList
                    data={photoList}
                    renderItem={_renderPhoto}
                    numColumns={3}
                />
            </View>

            <View style={[styles.subContainer, { flexDirection: 'column' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ width: 5, height: '100%', backgroundColor: '#EF6465' }}>
                    </View>

                    <Icon name='ios-checkmark' size={40} color='#EF6465' />

                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, color: '#333' }}>Booked</Text>
                        <Text style={{ fontSize: 16, color: '#d3d3d3', marginTop: 5 }}>Miami Beach, FL</Text>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#EF6465', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>24</Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>OCTOBER</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../images/image_map.png')} style={{ flex: 1, width: '90%', resizeMode: 'contain' }} />
                    <View style={{ width: 3, height: '80%', backgroundColor: '#f3f3f3' }} />
                    <View style={{ flex: 1, height: '100%', padding: 15 }} >
                        <MaterialIcon name='crop-free' size={30} color='#d3d3d3' style={{ alignSelf: 'flex-end' }} />
                        <Text style={{ fontSize: 16, color: '#333' }}>Distance</Text>
                        <Text style={{ fontSize: 16, color: '#d3d3d3', marginTop: 5 }}>35.6 Km</Text>
                        <Text style={{ fontSize: 16, color: '#636363', marginTop: 5 }}>12 - 18</Text>
                        <Icon name='add' size={40} color='#d3d3d3' style={{ alignSelf: 'flex-end' }} />
                        <Text style={{ fontSize: 25, color: '#a3a3a3', marginTop: 5, alignSelf: 'flex-end' }}>Book Ticket</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    detailsBtn: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    separator:
    {
        width: 1,
        height: '100%',
        backgroundColor: 'red'
    }

})