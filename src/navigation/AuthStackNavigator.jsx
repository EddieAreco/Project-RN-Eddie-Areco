import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (

        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen name='Login' component={LoginScreen} />

            <Stack.Screen name='Signup' component={SignUpScreen} />

        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})