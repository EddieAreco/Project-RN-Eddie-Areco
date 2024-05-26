import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import MyProfileStackNavigator from './MyProfileStackNavigator'
import HomeTab from './HomeTab'

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

            <Stack.Screen name='HomeTab' component={HomeTab} />

        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})