import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from '../../components/inputForm'
import SubmitButton from '../../components/SubmitButton'
import { useSignInMutation } from '../services/authenticatorService'
import { setUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

import { signupSchema } from '../validations/authSchema'
import { insertSession } from '../persistence'
import { Colors } from '@/constants/Colors'

import Loading from '../../components/Loading'
// import { colors } from '../constants/colors'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const [triggerSignIn, result] = useSignInMutation()

    useEffect(() => {
        setLoading(true)

        if (result.isSuccess) {
            console.log('result.data es', result.data)
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken
            })
            
            try {
                dispatch(
                    setUser({
                        email: result.data.email,
                        idToken: result.data.idToken,
                        localId: result.data.localId
                    })
                )
                }
            catch{
                console.log('error en insertsession', error)
            }
        }
        setLoading(false)

    }, [result])

    const onSubmit = () => {

        try {
            // const validation = signupSchema.validateSync({ email, password })
            triggerSignIn({ email, password, returnSecureToken: true })

        } catch (error) {

            console.log('Catch error LOGIN')
            console.log(error.path)
            console.log(error.message)

        }

    }

    return loading ? (

            <Loading />
    
        ) : (

            <View>
    
                <View style={styles.container}>
    
                    <Text style={styles.title}>
                        Inicia sesión para usar la app
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
    
                    <SubmitButton
                        onPress={onSubmit}
                        title='Enviar'
                    />
    
                    <Text style={styles.options}>No tienes una cuenta aún?</Text>
    
                    <Pressable
                        onPress={() => { navigation.navigate('Signup') }}
                    >
                        <Text style={styles.options}> Registrarme </Text>
                    </Pressable>
    
                </View>
    
            </View>

    )
}

export default LoginScreen

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
    title: {
        fontSize: 25,
    },
    options: {
        color: Colors.project.primary,
        fontSize: 15,
    }
})