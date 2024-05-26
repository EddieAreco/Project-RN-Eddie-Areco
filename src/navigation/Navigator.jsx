import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import HomeTab from './HomeTab'

import AuthStackNavigator from './AuthStackNavigator'

import { useSelector, useDispatch } from 'react-redux'
import { getSession } from '../persistence'
import { setUser } from '../features/user/userSlice'

const Navigator = () => {

    const { user } = useSelector( state => state.authReducer.value )

    const dispatch = useDispatch()

    useEffect(() => {

        (async()=>{

            try {
                
                const response = await getSession()
                console.log('response de navigator es', response);

                if (response.rows._array.length) {

                    const user = response.rows._array[0]
                    console.log({user});

                    dispatch( setUser({
                        email: user.email,
                        idToken: user.idToken,
                        localId: user.localId,
                    }) )

                }

            } catch (error) {
                console.log(error);
            }
        })()

    }, [])

    return (

        <>

            {user ? <HomeTab /> : <AuthStackNavigator />}

        </>
    )
}

export default Navigator

const styles = StyleSheet.create({})