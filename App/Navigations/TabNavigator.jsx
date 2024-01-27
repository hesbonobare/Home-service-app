import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import {FontAwesome5} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';
import ProfileNavigation from './ProfileNavigation';
//import { FontAwesome } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
        }}
        >
        <Tab.Screen name='homee' component={HomeNavigation}
        options={{
            tabBarLabel:(color)=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome5 name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='booking' component={BookingNavigation}
         options={{
            tabBarLabel:(color)=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Booking</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="bookmark" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='profile' component={ProfileNavigation}
         options={{
            tabBarLabel:(color)=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="user-circle" size={size} color={color} />
            )
        }}
        />
    </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%'
    }
})