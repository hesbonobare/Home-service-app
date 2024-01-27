import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({business}) {
  return (
    <View>
      <Heading text={'photos'}/>
      <FlatList
      data={business}
      renderItem={({item})=>{
        <Image source={{uri:item.images[0].url}} style={{width:'100%',height:120}}/>
      }}
      />
    </View>
  )
}