import { View, Text,StyleSheet,Image, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation=useNavigation()
    const{user,isLoading}=useUser();
  return user&&(
    <View style={styles.container}>
        {/*Profile section*/}
        <View style={styles.profileMainContainer}>
    <View style={styles.profileContainer}>
    <Image source={{uri:user?.imageUrl}}
    style={styles. userImage}
    />
    <View style={{paddingTop:10}}> 
        <Text style={{color:Colors.WHITE}}>Welcome,</Text>
        <Text style={{color:Colors.WHITE,fontSize:18,fontFamily:'outfit-bold'}}>{user?.fullName}</Text>
    </View>
    </View>
    <TouchableOpacity onPress={()=>navigation.push('booking')}>
    <Feather name="bookmark" size={29} color="white" /> 
    </TouchableOpacity>
    </View> 

    {/*SEARCH BAR SECTION*/}
    <View style={styles.searchBarContainer}>
        <TextInput placeholder='search' style={styles.textInput}/>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchbtn} />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        width:'85%',
        fontSize:16
    },
    userImage:{
        width:45,
        height:45,
        borderRadius:99
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    searchBarContainer:{
        marginTop:15,
        display:"flex",
        flexDirection:'row',
        gap:10,
        marginBottom:9
    },
    searchbtn:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:8
    }
})
