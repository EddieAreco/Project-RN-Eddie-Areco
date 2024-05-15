import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Colors } from '../constants/Colors'

const { height, width } = Dimensions.get('window')

const SubmitButton = ({ onPress, title }) => {
    return (

        <View style={styles.container}>

            <Pressable onPress={onPress} style={styles.pressable}>

                <Text>{title}</Text>

            </Pressable>

        </View>

    )
}

export default SubmitButton

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.light.icon,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 20,
        width: width * 0.6,
    },
    pressable:{
        width: '100%',
        alignItems: 'center',
    }
})