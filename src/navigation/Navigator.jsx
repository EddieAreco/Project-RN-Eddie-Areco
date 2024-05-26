import { StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'

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

                if (response.rows._array.length) {

                    const user = response.rows._array[0]

                    dispatch( setUser({
                        email: user.email,
                        idToken: user.idToken,
                        localId: user.localId,
                    }) )

                }

            } catch (error) {
                Alert.alert(
                    'Error',
                    `Error al obtener la sesión: ${error.message}`
                );
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