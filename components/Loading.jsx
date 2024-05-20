import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Loading = () => {
  return (
    <View>
      
      <ActivityIndicator hidesWhenStopped={true} color={Colors.project.primary} size='large'/>

    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})