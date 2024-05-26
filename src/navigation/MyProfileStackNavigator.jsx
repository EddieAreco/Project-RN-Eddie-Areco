import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'
import AuthStackNavigator from './AuthStackNavigator'

const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
    return (

        <Stack.Navigator
            initialRouteName='MyProfile'
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen
                component={MyProfile}
                name="MyProfile"
            />

            <Stack.Screen
                component={ImageSelector}
                name="Image-selector"
            />

            <Stack.Screen
                component={AuthStackNavigator}
                name="AuthStackNavigator"
            />

        </Stack.Navigator>
    )
}

export default MyProfileStackNavigator

const styles = StyleSheet.create({})