import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')
  return (
    <View className="flex-row items-center w-full h-16 px-4 bg-[#32323c] border-2 border-[#32323c] rounded-xl focus:border-yellow-600 space-x-4">
      <TextInput
        className="flex-1 text-white font-normal text-base mt-0.5"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert('Please input something to search results')
          }
          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
