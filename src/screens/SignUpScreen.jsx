import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import InputForm from '../../components/inputForm'
import SubmitButton from '../../components/SubmitButton'

import { useSignUpMutation } from '../services/authenticatorService'
import { setUser } from '../features/user/userSlice'

import { signupSchema } from '../validations/authSchema'
import { Colors } from '@/constants/Colors'
// import { colors } from '../constants/colors'

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(() => {

        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
    }, [result])

    const onSubmit = () => {

        try {

            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")

            const validation = signupSchema.validateSync({ email, password, confirmPassword })
            triggerSignUp({ email, password, returnSecureToken: true })

        } catch (error) {

            console.log('Catch error signup')
            console.log(error.path)
            console.log(error.message)

            switch (error.path) {
                case 'email':
                    setErrorEmail(error.message)
                    break;
                case 'password':
                    setErrorPassword(error.message)
                    break;
                case 'confirmPassword':
                    setErrorConfirmPassword(error.message)
                    break;
                default:
                    break;
            }

        }

    }

    return (

        <View>

            <View style={styles.container}>

                <Text style={styles.title}>
                    Registro
                </Text>

                <InputForm
                    label={'email'}
                    onChange={setEmail}
                    error={errorEmail}
                />
                <InputForm
                    label={'contraseña'}
                    onChange={setPassword}
                    error={errorPassword}
                    isSecure={true}
                />
                <InputForm
                    label={'confirmar contraseña'}
                    onChange={setConfirmPassword}
                    error={errorConfirmPassword}
                    isSecure={true}
                />

                <SubmitButton onPress={onSubmit} title='Enviar' />

                <Text style={styles.options}> Ya tienes una cuenta? </Text>

                <Pressable onPress={() => navigation.navigate('Login')} >

                    <Text style={styles.options}> Loguearme </Text>

                </Pressable>

            </View>

        </View>

    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        marginVertical: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 30,
        gap: 20,
        borderWidth: 2
    },
    title:{
        fontSize: 25,
    },
    options:{
        color: Colors.project.primary,
        fontSize: 15,
    }
})