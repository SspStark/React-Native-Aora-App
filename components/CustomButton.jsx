import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-yellow-600
    rounded-xl min-h-[60px] justify-center items-center ${containerStyles}
    ${isLoading ? 'opacity-30' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-black text-lg font-semibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
