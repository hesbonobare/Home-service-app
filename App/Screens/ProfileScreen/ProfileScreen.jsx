import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { Linking } from 'react-native';
import { userButton } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { useClerk } from '@clerk/clerk-expo';


export default function ProfileScreen() {
  const {user}=useUser();

  const {signOut}=useClerk()

  const email='hesbonobt@gmail.com'

  const navigation=useNavigation()

  const onMessageBtnClick=()=>{
    Linking.openURL('mailto:'+email+"?subject=I am looking for your service&body=Hi there");
}

  

const logout=()=>(<userButton/>)
  const profileMenu=[
    {
      id:1,
      name:'Home',
      icon:'home',
      function:()=>navigation.push('home')
    },
    {
      id:2,
      name:'My Booking',
      icon:'bookmark-sharp',
      function:()=>navigation.push('booking')
    },
    {
      id:3,
      name:'Contact Us',
      icon:'mail',
      function:()=>navigation.push('email')
    },
    {
      id:4,
      name:'Logout',
      icon:'log-out',
      function:()=>signOut()

    }
  ]
  return (
    <View>
    <View style={{padding:20,paddingTop:30,backgroundColor:Colors.PRIMARY}}>
      <Text style={{fontSize:30,fontFamily:'outfit-bold',color:'white'}}>Profile</Text>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:20}}>
        <Image source={{uri:user.imageUrl}} style={{width:100,height:100,borderRadius:99}}/>
        <Text style={{fontSize:26,marginTop:8,fontFamily:'outfit-medium',color:Colors.WHITE,}}>{user.fullName}</Text>
        <Text style={{fontSize:18,marginTop:8,fontFamily:'outfit-medium',color:Colors.WHITE,}}>{user?.primaryEmailAddress.emailAddress}</Text>

      </View>
    </View>

    <View style={{paddingTop:100}}>
      <FlatList
      data={profileMenu}
      renderItem={({item,index})=>(
        <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10,marginBottom:40,paddingHorizontal:100}} onPress={item.function}>
          <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
          <Text style={{fontFamily:'outfit',fontSize:20}}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
    <Text style={{paddingHorizontal:30,paddingTop:70,fontFamily:'outfit'}}>Developed by hesbonobt @ 2024.All Rights Reserved</Text>
    </View>
  )
}