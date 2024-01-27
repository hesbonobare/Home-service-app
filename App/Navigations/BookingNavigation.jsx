import { View, Text } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen'

export default function BookingNavigation() {

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='booking' component={BookingScreen}/>
        <Stack.Screen name='business-details' component={BusinessDetailsScreen}/>
       
        
    </Stack.Navigator>
    
  )
}