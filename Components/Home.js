import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth } from '../config/firebase'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Home = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={SignOut}>
        <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      )
    })
  })

  const SignOut = () => {
    auth.signOut().then(() => {
      //Sign-out successful.
      navigation.replace('Login')
    }).catch((error) => {
      // An error happened
    });
  }

  return (
    <View>
      <Text>Home</Text>
      <MaterialCommunityIcons name="robot" size={24} color="black" />
    </View>
  )
}

export default Home
