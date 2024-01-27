import { View, Text, TouchableOpacity, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import { StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import { format, parse, addDays } from 'date-fns';


export default function BookingModal({businessid,hideModal}) {

    const navigation = useNavigation()

    const[timeList,setTimeList]=useState()
    const[selectedTime,setSelectedTime]=useState()
    const[selectedDate,setSelectedDate]=useState()
    const[note,setNote]=useState()

    const {user}=useUser()

    useEffect(()=>{
        getTime()
    },[])

    const getTime=()=>{
        const timeList=[]
        for(let i=8;i<=12;i++){
            {
                timeList.push({
                    time:i+':00 AM'
                })
                timeList.push({
                    time:i+':30 AM'
                })
            }
        }
        for(let i=1;i<=7;i++){
            {
                timeList.push({
                    time:i+':00 PM'
                })
                timeList.push({
                    time:i+':30 PM'
                })
            }
        }
        setTimeList(timeList)
    }

    //Create Booking Method

    const createNewBooking=()=>{
        if(!selectedTime || !selectedDate){
            ToastAndroid.show('Please select Date and Time',ToastAndroid.LONG)
        }

        const data={
            userName:user?.fullName,
            userEmail:user?.primaryEmailAddress.emailAddress,
            time:selectedTime,
            date:format(selectedDate, 'yyyy-MM-dd'),
            //note:note,
            businessid:businessid
        }
        GlobalApi.createBooking(data).then(resp=>{
          //  console.log("Resp",resp)
            ToastAndroid.show('Booking Created Successifully!',ToastAndroid.LONG)
            hideModal();
        })
    }
  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,marginBottom:17}}
    onPress={()=>hideModal()}
    >
    <Ionicons name="arrow-back" size={30} color="black" />
  <Text style={{fontSize:25,fontFamily:'outfit-medium'}}>Booking</Text>
    </TouchableOpacity>

    {/*Calender Section*/}
    <Heading title={'Select Date'}/>
    <View style={styles.calenderContainer}>
    <CalendarPicker onDateChange={setSelectedDate}
    width={375} 
    minDate={Date.now()}
    todayBackgroundColor={Colors.BLACK}
    todayTextStyle={{color:Colors.WHITE}}
    selectedDayColor={Colors.PRIMARY}
    selectedDayTextColor={Colors.WHITE}
    />

    </View>

    {/*Time Select Section*/}
    <View style={{marginTop:20}}>
        <Heading text={'Select Time Slot'}/>
        <FlatList
        data={timeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{marginRight:10}} onPress={()=>setSelectedTime(item.time)}>
                <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
            </TouchableOpacity>
        )}
        />
    </View>

    {/*Note Section*/}
    <View style={{paddingTop:20}}>
        <Heading text={'Any Suggestion Note'}/>
        <TextInput
        placeholder='Note'
        numberOfLines={5} multiline={true}
        style={styles.noteTextArea}
        onChange={(text)=>setNote(text)}
        />
    </View>

    {/*confirmation button*/}
    <TouchableOpacity style={{marginTop:15}} onPress={()=>createNewBooking()}>
        <Text  style={styles.confirmbtn}>Confirm & Book</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calenderContainer:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15
    },
    selectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY
    },
    unSelectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.PRIMARY
    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY,
    },
    confirmbtn:{
        textAlign:'center',
        fontFamily:'outfit-medium',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        borderRadius:99,
        elevation:5

    }
})
