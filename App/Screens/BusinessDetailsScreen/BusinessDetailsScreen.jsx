import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {

    const param=useRoute().params;

    const[business,setBusiness]=useState()
    const[isReadMore,setIsReadMore]=useState(false)
    const[showModal,setShowModal]=useState(false)

    useEffect(()=>{
      //console.log(param?.business.images[0].url)
      param  &&  setBusiness(param.business)
    },[param])

    const navigation=useNavigation()

    const onMessageBtnClick=()=>{
        Linking.openURL('mailto:'+business?.email+"?subject=I am looking for your service&body=Hi there");
    }
  return (
    <View>
    <ScrollView style={{height:'91%'}} showsVerticalScrollIndicator={false}>
         <TouchableOpacity style={styles.backButtonContainer} onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={{uri:business?.images[0]?.url}} style={{width:'100%',height:300}}/>
      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold',fontSize:25,}}>{business?.name}</Text>
        <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:25}}>{business?.contactPerson}</Text>
        <Text style={{color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,padding:5,borderRadius:5,fontSize:15}}>{business?.category.name}</Text>
        </View>
        
        <Text style={{fontSize:17,fontFamily:'outfit',color:Colors.GRAY,alignItems:'center'}}><MaterialIcons name="location-on" size={25} color={Colors.PRIMARY} style={{marginRight:30}}/>{business?.address}</Text>
        <View style={{borderWidth:0.6,borderColor:Colors.GRAY,marginTop:17,marginBottom:17}}></View>

        {/*About Section*/}
        <View>
            <Heading text={'About Me'}/>
            <Text style={{fontFamily:'outfit',color:Colors.GRAY,fontSize:16,lineHeight:26}} numberOfLines={isReadMore?11:5}>{business?.about}</Text>
            <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
            <Text style={{color:Colors.PRIMARY,fontSize:16,fontFamily:'outfit'}}>{isReadMore?'Read Less':'Read More'}</Text>
            </TouchableOpacity>
            
        </View>

        <View style={{borderWidth:0.6,borderColor:Colors.GRAY,marginTop:17,marginBottom:17}}></View>

       {/*<BusinessPhotos business={business}/>*/} 
        </View>
     
    </ScrollView>
    <View style={{display:'flex',flexDirection:'row',margin:8,gap:8}}>
        <TouchableOpacity style={styles.messagebtn} onPress={()=>onMessageBtnClick()}>
            <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:18}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingbtn} onPress={()=>setShowModal(true)}>
            <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:Colors.WHITE,fontSize:18}}>Book Now</Text>
        </TouchableOpacity>
    </View>

    {/*Booking Screen Modal*/}
    <Modal
    animationType='slide'
    visible={showModal}
    >
        <BookingModal businessid={business?.id} hideModal={()=>setShowModal(false)}/>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    backButtonContainer:{
        position:'absolute',
        zIndex:10,
        padding:20
    },
    infoContainer:{
        padding:20,
        display:'flex',
        gap:7
    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        gap:7,
        alignItems:'center'
    },
    messagebtn:{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1
    },
    bookingbtn:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1
    }

})
