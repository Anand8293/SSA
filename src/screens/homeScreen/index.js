import React, { useState } from 'react';
import {
    View, Image, Text, ScrollView, Animated, Platform,
    ImageBackground, StatusBar, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import { useNetInfo } from "@react-native-community/netinfo";

import Icon from 'react-native-vector-icons/Ionicons'
import MediaScreen from '../fragments/MediaScreen';
import ModelScreen from '../fragments/ModelScreen';
import Connections from '../fragments/Connections';
import { TouchableHighlight, } from 'react-native-gesture-handler';

/**
 * Component for rendering and managing the useState of the function
 * @created by
 * ATCS
 */

export default function HomeScreen({ navigation }) {

    /**
       * @Variable & @States
       * @description creating and initialiation of variables & states
       * @returns null
       */


    const [selectedTab, setTab] = useState(0)

    const tabTexts = ['Media Stream', 'Model Details', 'Connections']

    const HEADER_HEIGHT = 300;

    const HEADER_COLLAPSED_HEIGHT = Platform.OS === 'ios' ? 140 : 80;

    const scrollYAnimatedValue = new Animated.Value(0);

    /**
      * @const headerHeight
      * @description changing height of user view
      * @returns {height value}
      */

    const headerHeight = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, HEADER_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        });

    /**
   * @const heroOpacity
   * @description changing opacity of user view
   * @returns {opacity value}
   */

    const heroOpacity = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    /**
      * @const tabItem
      * @description Renders the tab item
      * @returns {XML}
      */

    const tabItem = tabTexts.map((item, index) => {
        return (
            <TouchableOpacity style={styles.bottomTab} onPress={() => onClickCat(index)}>
                <Text style={[styles.bottomText, { fontWeight: selectedTab == index ? 'bold' : '400' }]}>{item}</Text>
                {selectedTab == index ?
                    <View style={{ width: '80%', height: 4, backgroundColor: 'white', marginTop: 5 }}></View>
                    : null}
            </TouchableOpacity>
        )
    })

    /**
       * @method onPageSelected
       * @description call when viewpager page change
       * @returns null
       */
    const onPageSelected = (event) => {
        const { position } = event.nativeEvent;
        console.log("pasition-> " + position + "  current -> " + selectedTab)
        if (position !== selectedTab) {
            setTab(position);
        }
    }

    /**
   * @method onClickCat
   * @description trigger when clicked category item
   * @returns {XML}
   */

    let pager

    function onClickCat(index) {
        pager.setPage(index)
        setTab(index)
    }


    /**
       * @method render
       * @description Renders the scenes
       * @returns {XML}
       */

    return (
        <View style={{ flex: 1 }}>
            {console.log('height: ',)}
            <StatusBar barStyle='light-content' />
            <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT, marginTop: 5 }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
                )}>
                <ViewPager
                    onPageSelected={onPageSelected}
                    style={{ flex: 1, height: (height - HEADER_COLLAPSED_HEIGHT) }} initialPage={0}
                    ref={(viewPager) => { pager = viewPager }}>
                    <View key="1">
                        <MediaScreen />
                    </View>
                    <View key="2">
                        <ModelScreen />
                    </View>
                    <View key="3">
                        <Connections />
                    </View>
                </ViewPager>
            </ScrollView>
            <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
                <ImageBackground style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 44 : 0 }} source={require('../../images/photo_profile.jpeg')} >
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
                    <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -20, opacity: heroOpacity }} >
                        <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                            <Image style={{ width: 100, height: 100, borderRadius: 30 }} source={require('../../images/profile_image.jpeg')} />
                            <Text style={styles.proStyle}>PRO</Text>
                        </View>
                        <Text style={styles.title}>Anand Kumar Mehta</Text>
                        <Text style={styles.subTitle}>Sr. Mobile App Developer</Text>
                    </Animated.View>

                    <View style={{ flexDirection: 'row' }}>
                        {tabItem}
                    </View>
                </ImageBackground>
            </Animated.View>
           
        </View>
    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    proStyle: {
        fontSize: 14,
        color: 'white',
        height: 22,
        minWidth: 40,
        textAlign: 'center',
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginVertical: 5,
    },
    subTitle: {
        fontSize: 12,
        color: 'white'
    },
    animatedHeaderContainer: {
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        zIndex: 9999
    },
    bottomTab:
    {
        flex: 1,
        alignItems: 'center'
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})