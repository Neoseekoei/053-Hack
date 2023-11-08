import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'

const Profile = () => {

    return (
      <View>
        <View style={styles.top}>
         <Text>Test</Text>
         <View>
            <Text>Hello</Text>
            <Text>Kabelo</Text>
         </View>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    top: {
        flexDirection: 'row'
    }
  })

export default Profile