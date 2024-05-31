import { FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const fallbackThumbnail =
  'https://res.cloudinary.com/dvgymshsh/image/upload/v1701496887/music-player-bg3_q7z1kd.jpg'

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
}

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-52 rounded-xl"
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
          className="relative justify-center items-center "
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: thumbnailError ? fallbackThumbnail : item.thumbnail,
            }}
            className="w-52 h-72 rounded-xl overflow-hidden"
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
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChanged = ({ viewableItems }) => {
    setActiveItem(viewableItems[0].key)
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending
