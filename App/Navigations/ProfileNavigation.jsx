import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';


import Email from '../Screens/EmailScreen/EmailScreen';

export default function ProfileNavigation() {

    const Stack = createStackNavigator();
 return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='profile' component={ProfileScreen}/>
    <Stack.Screen name='home' component={HomeScreen}/>
    <Stack.Screen name='booking' component={BookingScreen}/>
    <Stack.Screen name='email' component={Email}/>
    
</Stack.Navigator>
  )
}