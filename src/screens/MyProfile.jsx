import { Image, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React from 'react'
import SubmitButton from '../../components/SubmitButton'
import Location from '../../components/Location'

import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import Header from '../../components/Header';

const { height, width } = Dimensions.get('window')

const MyProfile = ({ navigation }) => {
    
    const { imageCamera, localId, user } = useSelector(state => state.authReducer.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)
    
    console.log('user', user)
    console.log('localId', localId)

    const launchCamera = () => {
        navigation.navigate('Image-selector')
    }

    const closeSession = () => {
        triggerSignIn({ email: '', password: ''})
        console.log('email', email)
        console.log('password', password)
        navigation.navigate('Login')
    }

    const defaultImageRoute = "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png"

    return (

        <View>

            <View style={styles.containerPrincipal}>

                <Text style={styles.title}> Mi Perfil </Text>

            </View>

            {imageFromBase || imageCamera ? (

                <View style={styles.container}>

                <Pressable
                onPress={closeSession}
                style= {styles.closeSession}
                >

                    <Text>
                        Cerrar sesión
                    </Text>

                </Pressable>

                    <View>

                        <Image
                            source={{ uri: imageFromBase?.image || imageCamera }}
                            resizeMode='cover'
                            style={styles.imageMyProfile}
                        />

                        <View style={styles.containerAntDesign}>
                            <TouchableOpacity
                                onPress={launchCamera}
                                style={styles.touchable}
                            >
                                <AntDesign name="camera" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Location />

                </View>

            ) : (
                <View style={styles.container}>
                    <View>
                        <View style={styles.containerImage}>
                            <Image
                                source={{ uri: defaultImageRoute }}
                                resizeMode='cover'
                                style={styles.defaultImageRoute}
                            />

                        </View>

                        <View style={styles.containerAntDesign}>
                            <TouchableOpacity
                                onPress={launchCamera}
                                style={styles.touchable}
                            >
                                <AntDesign name="camera" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Location />

                </View>
            )}

        </View>

    )
}

export default MyProfile

const styles = StyleSheet.create({
    containerPrincipal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    title:{
        fontSize: 30,
        padding: 10,
    },
    imageMyProfile: {
        height: height * 0.25,
        width: width * 0.45,
        borderRadius: height * 0.5,
        resizeMode: 'center',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: '85%',
    },
    closeSession:{
        backgroundColor: 'red',
        marginBottom: 20
    },
    containerImage: {
        borderRadius: height * 0.5,
        borderWidth: 1,
        backgroundColor: 'azure',
    },
    defaultImageRoute: {
        height: height * 0.2,
        width: width * 0.35,
        borderRadius: height * 0.5,
        resizeMode: 'center',
    },
    containerAntDesign: {
        position: 'absolute',
        bottom: width * 0.01,
        right: width * 0.01,
    },
    touchable: {
        backgroundColor: '#ffffff',
        borderRadius: height * 0.5,
        borderWidth: 1,
        padding: 5,
    }
})