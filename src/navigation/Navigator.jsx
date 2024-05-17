import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import HomeStack from './HomeStack'
import HomeTab from './HomeTab'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AuthStackNavigator from './AuthStackNavigator'

import { useSelector } from 'react-redux'

const Navigator = () => {

    const { user } = useSelector( state => state.authReducer.value )

    return (

        <>

            {user ? <HomeTab /> : <AuthStackNavigator />}

        </>
    )
}

export default Navigator

const styles = StyleSheet.create({})