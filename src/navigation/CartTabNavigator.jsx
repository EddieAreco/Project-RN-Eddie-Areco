import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Cart from '../screens/Cart'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const CartTabNavigator = () => {
  return (
    
    <Stack.Navigator
    initialRouteName='CartScreen'
    screenOptions={{
      headerShown: false,
    }}
    >

<Stack.Screen name='Cart' component={Cart} />

    </Stack.Navigator>
  )
}

export default CartTabNavigator

const styles = StyleSheet.create({})