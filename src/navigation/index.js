import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/homeScreen';
import WeatherScreen from '../screens/weatherScreen';

const Drawer = createDrawerNavigator();

export default AppNavigation = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="home"
        drawerStyle={{
          width: 250,
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Weather" component={WeatherScreen} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}