import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView, Image } from "react-native"



export default function ModelScreen({ colors, action }) {

    /**
          * @Variable
          * @description creating and initialiation of variables
          * @returns null
          */

    const generesText = ['React-Native', 'Android', 'iOS', 'Ionic', 'Kotlin', 'Java']

    const shapesImage = [require('../../images/image_33.png'), require('../../images/image_75.png'), require('../../images/image_blue.png'),
    require('../../images/image_28.png'), require('../../images/image_65.png'), require('../../images/image_10.png')]


    /**
        * @method _renderGeneres
        * @description Renders the generes item
        * @returns {XML}
        */


    function _renderGeneres({ item, index }) {
        return (
            <View style={{ padding: 10, margin: 5, backgroundColor: '#f3f3f3', borderRadius: 5 }}>
                <Text>{item}</Text>
            </View>
        )
    }

    /**
      * @method _renderShapes
      * @description Renders the Shapes item
      * @returns {XML}
      */


    function _renderShapes({ item, index }) {
        return (
            <Image style={{ flex: 1/3, height: height/10, margin: 10, backgroundColor: '#f3f3f3', borderRadius: 5 }}
                source={item} />
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
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='chatbox-ellipses' size={30} color='#EF6465' />
                </View>

                <View style={{ width: 3, height: '80%', backgroundColor: '#f3f3f3' }} />
                <View style={{ flex: 5, height: '100%', padding: 15 }} >
                    <Text style={{ fontSize: 16, color: '#333' }}>Biography</Text>
                    <Text style={{ fontSize: 16, color: '#d3d3d3', marginTop: 5 }}>I'm a Sr. Mobile App developer I have Best Knowledge of design pattern and UI perfection</Text>
                </View>
            </View>

            <View style={[styles.subContainer, { marginVertical: 0 }]}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='document-text-outline' size={35} color='#EF6465' />
                </View>

                <View style={{ width: 3, height: '80%', backgroundColor: '#f3f3f3' }} />
                <View style={{ flex: 5, height: '100%', padding: 15 }} >
                    <Text style={{ fontSize: 16, color: '#333' }}>Genenres</Text>
                    <FlatList
                        data={generesText}
                        renderItem={_renderGeneres}
                        numColumns={3}
                    />
                </View>
            </View>

            <View style={styles.subContainer}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='ios-person-circle-outline' size={40} color='#EF6465' />
                </View>

                <View style={{ width: 3, height: '80%', backgroundColor: '#f3f3f3' }} />
                <View style={{ flex: 5, height: '100%', padding: 15 }} >
                    <Text style={{ fontSize: 16, color: '#333' }}>Shapes</Text>
                    <FlatList
                        data={shapesImage}
                        renderItem={_renderShapes}
                        numColumns={3}
                    />
                </View>
            </View>

        </View>
    );
}


const { height } = Dimensions.get('window')

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