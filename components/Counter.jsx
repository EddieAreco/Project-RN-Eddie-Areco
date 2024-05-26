import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
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