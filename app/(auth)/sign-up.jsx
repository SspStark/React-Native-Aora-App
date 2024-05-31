import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isSubmitting, setisSubmitting] = useState(false)
  const { setUser, setIsLoggedIn, setIsLoading } = useGlobalContext()

  const submit = async () => {
    const { email, password, username } = form

    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setisSubmitting(true)

    try {
      const result = await createUser(email, password, username)
      setUser(result)
      setIsLoggedIn(true)
      setIsLoading(false)
      router.replace('/home')
    } catch (error) {
      if (
        error.message ===
        'AppwriteException: User (role: guests) missing scope (account)'
      ) {
        const result = await createUser(email, password, username)
        setUser(result)
        setIsLoggedIn(true)
        setIsLoading(false)
        router.replace('/home')
      } else {
        Alert.alert('Error', error.message)
      }
    } finally {
      setisSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView>
        <View className="w-full justify-center px-5 min-h-[100vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-xl text-white font-semibold mt-10">
            Log in to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-lg text-yellow-600">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
