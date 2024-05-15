import { StyleSheet, Text, View, Dimensions, Image, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as LocationExpo from 'expo-location'
import { colors } from '../constants/colors'
import { googleMapsApiKey } from '../databases/googleMaps'
import { useGetLocationQuery, usePostLocationMutation } from '../services/shopService'
import { useSelector } from 'react-redux'

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

                        <Text> latitud: {location.latitude}, longitud: {location.longitude}</Text>
                        <Text>direccion: {address}</Text>

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

                <TouchableOpacity style={styles.touchable} onPress={handleGetLocation}>

                {location ? (

                    <Text style={styles.textTouchable}> 

                    Cambiar ubicación 
                    
                    </Text>
                ): (
                    
                    <Text style={styles.textTouchable}> 

                    Obtener ubicación 
                    
                    </Text>
                )}

                </TouchableOpacity>
            }

            {confirm &&
                <TouchableOpacity style={styles.touchable} onPress={handleSubmitLocation}>
                    <Text style={styles.textTouchable}> Guardar ubicación </Text>
                </TouchableOpacity>
            }

        </View>

    )
}

export default Location

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },
    containerLocation: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        height: 250,
        marginBottom: 20,
    },
    imgLocation: {
        height: '100%',
        width: '100%',
    },
    touchable: {
        backgroundColor: colors.secondary,
        width: width * 0.6,
        marginTop: 10,
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTouchable: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
})