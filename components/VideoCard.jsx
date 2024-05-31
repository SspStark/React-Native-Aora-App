import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const fallbackThumbnail =
  'https://res.cloudinary.com/dvgymshsh/image/upload/v1701496887/music-player-bg3_q7z1kd.jpg'

const VideoCard = ({ videoData }) => {
  const [play, setPlay] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)

  const {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  } = videoData

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-yellow-600 justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100">{username}</Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnailError ? fallbackThumbnail : thumbnail }}
            className="w-full h-full rounded-xl mt-5"
            resizeMode="cover"
            onError={() => setThumbnailError(true)}
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
