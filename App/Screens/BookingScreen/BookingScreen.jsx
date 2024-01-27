import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {PageHeading} from './../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem'
import Colors from '../../Utils/Colors'
import { TouchableOpacity } from 'react-native'


export default function BookingScreen() {

  const{user}=useUser();

  const[bookingList,setBookingList]=useState([])
  const[loading,setLoading]=useState(false)

  useEffect(()=>{
    user&&getUserBookings()
  },[user])

  const getUserBookings=()=>{
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      //console.log(resp)
      setBookingList(resp.bookings)
      setLoading(false)
    })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'outfit-medium',fontSize:26,paddingBottom:10}}>My Bookings</Text>

      <TouchableOpacity onPress={()=>getUserBookings()}>
        {
          bookingList?.length>0?  <FlatList
           data={bookingList}
           onRefresh={()=>getUserBookings()}
           refreshing={loading}
           renderItem={({item,index})=>(
             <BusinessListItem business={item?.businessList} booking={item}/>
           )}
           />: <View><Text style={{fontFamily:'outfit-medium',fontSize:20,textAlign:'center',marginTop:'20%',color:Colors.GRAY,marginBottom:'5%'}}>No Booking Found</Text>
           <Text  style={{fontFamily:'outfit-medium',fontSize:20,textAlign:'center',color:Colors.GRAY}}>Tap To Refresh</Text></View>
           
        }
       
      </TouchableOpacity>
    </View>
  )
}