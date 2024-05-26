import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const CartItem = ({ cartItem, onPress }) => {

    return (

        <View style={styles.container}>

            <View style={styles.viewCartItem}>
                <Text>nombre: {cartItem.title}</Text>
                <Text>categoria: {cartItem.category}</Text>
                <Text>precio: {cartItem.price}</Text>
                <Text>cantidad: {cartItem.quantity}</Text>
            </View>

            <Pressable onPress={ onPress }>

                <Entypo name='trash' size={30} color='black' />

            </Pressable>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        backgroundColor: Colors.project.secondary,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10
    },
    viewCartItem: {
    }
})