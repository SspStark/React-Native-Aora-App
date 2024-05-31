import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center ${titleStyles}`}>{title}</Text>
      <Text className="text-center text-gray-100 text-sm">{subtitle}</Text>
    </View>
  )
}

export default InfoBox
