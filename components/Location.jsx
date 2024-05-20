import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as LocationExpo from 'expo-location'

import { googleMapsApiKey } from '../src/databases/googleMaps'
import { usePostLocationMutation } from '../src/services/shopService'
import { useSelector } from 'react-redux'
import { Colors } from '@/constants/Colors'
import SubmitButton from './SubmitButton'

const { height, width } = Dimensions.get('window')

const Location = () => {

    const [location, setLocation] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [address, setAddress] = useState('')

    const [errorLocation, setErrorLocation] = useState('')

    const [triggerPostUserLocation, result] = usePostLocationMutation()

    const { localId, user } = useSelector(state => state.authReducer.value)

    // const { data: location , isLoading, errorLocationQuery } = useGetLocationQuery(localId)
    //USAR ESTO SI VOY A MOSTRAR LA DIRECCION EN OTRO COMPONENTE

    const handleGetLocation = async () => {

        try {

            let { granted } = await LocationExpo.requestForegroundPermissionsAsync();

            if (!granted) {
                Alert.alert('El permiso a la ubicación fue denegado')
                return
            }

            let locationUser = await LocationExpo.getCurrentPositionAsync({})

            const objectLocation = {
                latitude: locationUser.coords.latitude,
                longitude: locationUser.coords.longitude,
            }

            console.log('objectLocation', objectLocation)

            setLocation(objectLocation)
            setConfirm(true)

        } catch (err) {
            console.log('error en location es:', err)
            Alert.alert('Ubicación no encontrada')
        }
    }

    //OBTENER DIRECCION
    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    console.log('data es', data)
                    console.log('setadrees es', data.results[0].formatted_address)
                    setAddress(data.results[0].formatted_address);
                }
            } catch (e) {
                setErrorLocation(e.message);
                console.log(errorLocation)
            }
        })();
    }, [location])

    const handleSubmitLocation = async () => {

        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                dateLocation: new Date().toLocaleString(),
                user: user,
            },
            localId: localId
        }),
            //GUARDAR UBICACION EN BASE DE DATOS

            Alert.alert('Ubicación guardada')
        setConfirm(false)
    }


    return (

        <View style={styles.container}>

            <View>
                {location ?
                    <View style={styles.containerLocation}>

                        <Image style={styles.imgLocation} source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=500x500&maptype=roadmap
&markers=color:blue%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${googleMapsApiKey}`
                        }} />

                        <Text style={styles.textLocation}> latitud: {location.latitude}, longitud: {location.longitude}</Text>
                        <Text style={styles.textLocation}>direccion: {address}</Text>

                    </View>
                    :

                    <View style={styles.containerLocation}>

                        <Image style={styles.imgLocation} source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
                            &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
                            &markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${googleMapsApiKey}`
                        }} />

                        <Text> No hay dirección cargada </Text>

                    </View>

                }
            </View>

            {!confirm &&

                <SubmitButton
                    onPress={handleGetLocation}
                    title={location ? 'Cambiar ubicación' : 'Obtener ubicación'}
                >

                </SubmitButton>
            }

            {confirm &&

                <SubmitButton
                    onPress={handleSubmitLocation}
                    title='Guardar ubicación'
                />
            }

        </View>

    )
}

export default Location

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    containerLocation: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.7,
        height: 150,
        marginVertical: 10,
    },
    imgLocation: {
        height: '100%',
        width: '100%',
    },
    textLocation:{
        marginVertical: 3,
        fontSize: 14
    },
})