import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'

const InputForm = ({ label, onChange, error = '', isSecure = false }) => {

    const [input, setInput] = useState('')

    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }

    return (

        <View style={styles.container}>

            <Text style={styles.input}>
                {label}
            </Text>

            <TextInput
                value={input}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
                style={styles.TextInput}
            />

            {error ?

                <Text>
                    {error}
                </Text>

                : null
            }

        </View>
    )
}

export default InputForm

const styles = StyleSheet.create({
    container: {
        width: '80%',
        margin: 10,
    },
    input:{
        fontSize: 15,
        marginLeft: 5,
    },
    TextInput: {
        borderWidth: 2,
        borderColor: Colors.light.background,
        borderRadius: 10
    }
})