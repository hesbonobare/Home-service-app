import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function BusinessListItem({business,booking}) {

    const navigation=useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={!booking?()=>navigation.push('business-detail',{business:business}):null}>
      <Image source={{uri:business?.images[0]?.url}} style={styles.image}/>
      <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit',color:Colors.GRAY,fontSize:15}}>{business?.contactPerson}</Text>
        <Text style={{fontFamily:'outfit-bold',fontSize:19}}>{business?.name}</Text>
        {!booking?.id?<Text style={{fontFamily:'outfit',color:Colors.GRAY,fontSize:16}}><MaterialIcons name="location-on" size={20} color={Colors.PRIMARY} 
        style={{marginRight:30}}
        />{business?.address}</Text>
         : <View>
         <Text style={[{fontSize:14,fontFamily:'outfit',padding:5,borderRadius:5,alignSelf:'flex-start'},
         booking?.bookingStatus=='Completed'?
         {backgroundColor:Colors.LIGHT_GREEN,color:Colors.GREEN}:
         booking?.bookingStatus=='Cancelled'?
         {backgroundColor:Colors.LIGHT_RED,color:Colors.RED}:
         {backgroundColor:Colors.PRIMARY_LIGHT,color:Colors.PRIMARY}
        ]}>{booking?.bookingStatus}</Text>

        {
          booking?.id?
          <Text style={{marginTop:6,fontFamily:'outfit',color:Colors.GRAY,fontSize:16}}><AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight:15}}/>
          {booking?.date} at {booking?.time}</Text>:null

        }
         
         </View> }
       
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:15
    },
    subContainer:{
        display:'flex',
        gap:8
    },
  image:{
    width:100,
    height:100,
    borderRadius:15
  }
})
