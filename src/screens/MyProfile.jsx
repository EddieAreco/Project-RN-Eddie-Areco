import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import SubmitButton from '../../components/SubmitButton'
import Location from '../../components/Location'

import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import Header from '../../components/Header';
import { truncateSessionsTable } from '../persistence';
import { clearUser } from '../features/user/userSlice';
import { Colors } from '@/constants/Colors';

const { height, width } = Dimensions.get('window')

const MyProfile = ({ navigation }) => {

    const { imageCamera, localId, user } = useSelector(state => state.authReducer.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const dispatch = useDispatch()

    console.log('user', user)
    console.log('localId', localId)

    const launchCamera = () => {
        navigation.navigate('Image-selector')
    }

    const closeSession = async () => {

        try {

            const response = await truncateSessionsTable()

            dispatch(clearUser())

        } catch (error) {
            console.log(error);
        }

    }

    const defaultImageRoute = "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png"

    return (

        <View>

            <View style={styles.containerPrincipal}>

                <Text style={styles.title}> Mi Perfil </Text>

            </View>

                <View style={styles.container}>

                    <View>

                        <Image
                            source={
                                imageFromBase || imageCamera ?
                                    { uri: imageFromBase?.image || imageCamera }
                                :
                                    { uri: defaultImageRoute }
                                
                            }
                            resizeMode='cover'
                            style={styles.imageMyProfile}
                        />

                        <View style={styles.containerAntDesign}>
                            <TouchableOpacity
                                onPress={launchCamera}
                                style={styles.camera}
                            >
                                <AntDesign name="camera" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Location />

                    <SubmitButton
                        title='Cerrar Sesión'
                        onPress={closeSession}
                    />

                </View>

        </View>

    )
}

export default MyProfile

const styles = StyleSheet.create({
    containerPrincipal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 5,
    },
    title: {
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
    containerAntDesign: {
        position: 'absolute',
        bottom: width * 0.01,
        right: width * 0.01,
    },
    camera: {
        backgroundColor: '#ffffff',
        borderRadius: height * 0.5,
        borderWidth: 1,
        padding: 5,
    },
    closeSession: {
        backgroundColor: 'red',
        marginBottom: 20
    },
})