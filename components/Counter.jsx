import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../src/features/counter/counterSlice'
import SubmitButton from './SubmitButton'

const Counter = ( { quantity, addItemCart, decreaceItem } ) => {

    const dispatch = useDispatch()

    return (
    
            <View style={styles.container}>

                <SubmitButton
                    onPress={decreaceItem}
                    title='-'
                    style={styles.botonesOperacion}
                >
                </SubmitButton>

                <Text>
                    {quantity}
                </Text>

                <SubmitButton
                    onPress={addItemCart}
                    title='+'
                    style={styles.botonesOperacion}
                >
                </SubmitButton>
            
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonesOperacion: {
        width: 50
    },
})