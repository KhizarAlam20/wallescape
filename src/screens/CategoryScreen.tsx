import { Text, View } from 'react-native'
import React from 'react'
import { s } from "react-native-wind"
import { ColorCode } from '../../assets/Color/ColorCode'

const CategoryScreen = () => (
  <View style={[s`flex-1 items-center justify-center`, { backgroundColor: ColorCode.DARK.BLACK }]}>
    <Text style={[s`text-lg`, { color: ColorCode.LIGHT.BLACK }]}>Category Screen</Text>
  </View>
)

export default CategoryScreen 