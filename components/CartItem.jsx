import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons'

const CartItem = ({ cartItem }) => {

    return (

        <View style= {styles.container} onPress={() => { }}>

            <View style={ styles.viewCartItem }>
                <Text>nombre: {cartItem.title}</Text>
                <Text>categoria: {cartItem.category}</Text>
                <Text>precio: {cartItem.price}</Text>
                <Text>cantidad: {cartItem.quantity}</Text>
            </View>

            <Entypo name='trash' size={30} color='black' />

        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        backgroundColor: 'pink',
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10
    },
    viewCartItem:{
    }
})