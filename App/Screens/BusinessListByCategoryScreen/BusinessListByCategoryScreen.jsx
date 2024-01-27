import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';
import PageHeading from '../../Components/PageHeading';

export default function BusinessListByCategoryScreen() {

  const[loading,setLoading]=useState(false);
    const param =useRoute().params;
    const navigation=useNavigation()

    const [businessList,setBusinessList]=useState([]);
    useEffect(()=>{
        //console.log("Category",param.category)
        param&&getBusinessByCategory()
        //console.log(businessList)

    },[param])

    const getBusinessByCategory=()=>{
      setLoading(true)
        GlobalApi.getBusinessListByCategory(param.category).then(resp=>{
            setBusinessList(resp.businessLists)
            setLoading(false)
        })
    }
  return (
    <View style={{padding:20,paddingTop:30}}>

        <PageHeading title={param.category}/>
      
       {businessList?.length>0?  <FlatList
         data={businessList}
         onRefresh={()=>getBusinessByCategory()}
         refreshing={loading}
         style={{marginTop:20}}
         renderItem={({item,index})=>(
             <BusinessListItem business={item}/>
         )}
         />:<Text style={{fontFamily:'outfit-medium',fontSize:20,textAlign:'center',marginTop:'20%',color:Colors.GRAY}}>No Business Found</Text>
       }
      
    </View>
  )
}