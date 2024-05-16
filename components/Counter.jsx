import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../src/features/counter/counterSlice'

const Counter = () => {

    const count = useSelector( state => state.counterReducer.value )
    const dispatch = useDispatch()
    const [inputToAdd, setInputToAdd] = useState(null)

    return (
        <View>
            <View>
                <Pressable
                    onPress={() => dispatch(decrement())}>
                    <Text>
                        -
                    </Text>
                </Pressable>
            </View>
            <Text>
                {count}
            </Text>
            <View>
                <Pressable
                    onPress={() => dispatch(increment())}>
                    <Text>
                        +
                    </Text>
                </Pressable>
            </View>
            <View>
                <TextInput 
                placeholder='Cantidad a aumentar'
                onChangeText={setInputToAdd}
                value={inputToAdd}
                />

                <Pressable
                onPress={ () => dispatch(incrementByAmount( Number(inputToAdd))) }
                >
                    <Text>
                        Add
                    </Text>
                </Pressable>
            </View>
            <Pressable
            onPress={ () => dispatch(reset())}
            >
                <Text>
                    Reset
                </Text>
            </Pressable>
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({})