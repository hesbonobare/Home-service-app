import { View, Text } from 'react-native'
import React from 'react'
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';

export default function Email() {

    const email='hesbonobt@gmail.com'

    const navigation=useNavigation();

    const onMessageBtnClick=()=>{
        Linking.openURL('mailto:'+email+"?subject=I am looking for your service&body=Hi there");
    }
  return (
    <View style={{ justifyContent:'center',
    alignItems:'center',paddingTop:400}}>
      <TouchableOpacity onPress={()=>onMessageBtnClick()} style={{padding:15,
        backgroundColor:Colors.WHITE,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        width:'80%',
       
        alignSelf:'center',
       
        }}>
        <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:18}}>Send Us Email</Text>
      </TouchableOpacity>
    </View>
  )
}