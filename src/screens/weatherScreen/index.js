import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet, Text, Dimensions, SafeAreaView, Image, ImageBackground, StatusBar, Platform } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
const axios = require('axios');
import moment from 'moment'
// import {weather} from '../../utils/Constants'
import { doUpdate } from '../../action/Action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function WeatherScreen({ navigation, weather, updateWeather }) {

    //  console.log('weather -> ', weather)

    /**
          * @Variable
          * @description creating and initialiation of variables
          * @returns null
          */

    const [searchValue, setValue] = useState('jaipur')

    useEffect(() => {
        searchSubmit()
    }, [])


    function searchSubmit() {

        // Make a request for a user with a given ID
        const url = `http://api.openweathermap.org/data/2.5/weather?appid=f7a6c0f6ae24f1a4e71b7bac6d736046&units=Metric&q=${encodeURIComponent(searchValue)}&`
        console.log('Request...', url)
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data);
                updateWeather(response.data)
                //   setWeather(response.data)
                setValue('')
            })
            .catch(function (error) {
                // handle error
                console.log('error -> ', error.message);
                alert('City not found \n Avoid space in city name')
            })
            .finally(function () {
                // always executed
            });
    }


    /**
    * @method render
    * @description Renders the scenes
    * @returns {XML}
    */

    const dataCheck = Object.keys(weather).length
    if (dataCheck <= 0)
        return null

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <ImageBackground style={{ height: 300, paddingTop: Platform.OS == 'ios' ? 40 : 0 }}
                source={require('../../images/image_weather.jpeg')}
                imageStyle={{ resizeMode: 'stretch' }}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' size={35} color='white' />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}></View>

                    <TouchableOpacity style={{ padding: 10 }}
                        onPress={() => { console.log('clicked') }}>
                        <Icon name='ellipsis-vertical' size={25} color='white' />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBox}>
                    <TextInput
                        style={{ padding: 10, marginLeft: 5, color: 'white', flex: 1, fontWeight: 'bold', fontSize: 16 }}
                        placeholder='Search via City, State, Country or Zip'
                        placeholderTextColor='#fdfdfd'
                        onChangeText={(text) => {
                            setValue(text)
                        }}
                        returnKeyType='search'
                        value={searchValue}
                        onSubmitEditing={searchSubmit}
                        clearButtonMode="while-editing"
                    />
                    <Icon name='search' size={25} color='white' style={{ marginRight: 10 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.tempareture}>{Math.floor(weather?.main.temp)}</Text>
                    <Text style={[styles.tempareture, { fontSize: 40 }]}>o</Text>
                </View>
            </ImageBackground>

            <ImageBackground style={{ flex: 1 }}
                source={require('../../images/photo_profile.jpeg')}
                imageStyle={{ resizeMode: 'stretch' }}>
                <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Text style={{ fontSize: 16, color: 'white', flex: 1 }}>{weather?.name} - {weather?.sys.country}</Text>
                        <Text style={{ fontSize: 16, color: 'white', flex: 1 }}>{moment(new Date(weather?.dt * 1000)).format('DD MMM YYYY hh:MM a')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png` }}
                                style={{ width: 150, height: 150, tintColor: 'white' }} />
                        </View>
                        <View style={{ flex: 1.2, justifyContent: 'center' }} >
                            <Text style={{ fontSize: 26, color: 'white' }}>{weather?.weather[0].main}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>Feel like {Math.floor(weather?.main.feels_like)}</Text>
                                <Text style={{ fontSize: 10, color: 'white' }}>o</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='ios-partly-sunny-outline' size={30} color='white' />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 14, color: 'white' }}>Sunrise {moment(new Date(weather?.sys.sunrise * 1000)).format('hh:MM a')}</Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>Sunset {moment(new Date(weather?.sys.sunset * 1000)).format('hh:MM a')}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Icon name='egg-outline' size={35} color='white' />
                            <Text style={{ fontSize: 18, color: 'white' }}>Precipitation</Text>
                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>{weather?.clouds.all}%</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Icon name='filter-outline' size={40} color='white' />
                            <Text style={{ fontSize: 18, color: 'white' }}>Wind</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>{weather?.wind.speed}</Text>
                                <Text style={{ fontSize: 18, color: 'white', marginLeft: 5, marginBottom: 5 }}>km/h</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 20, textAlign: 'center' }}>{weather?.weather[0].description}</Text>
            </ImageBackground>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        weather: state.reducer.cityWeather,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateWeather: doUpdate,
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        flex: Platform.OS == 'ios' ? 2 : 1.7
    },
    tempareture: {
        fontSize: 100,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    searchBox:
    {
        flexDirection: 'row', marginHorizontal: 15, borderRadius: 10,
        borderWidth: 1, borderColor: 'white', alignItems: 'center', backgroundColor: 'rgba(211,211,211,0.7)'
    }

})