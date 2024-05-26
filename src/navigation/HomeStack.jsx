import { View, StyleSheet, Text, Image, Pressable, ImageBackground, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import ItemListCategory from '../screens/ItemListCategory'
import Detail from '../screens/Detail'
import MyProfileStackNavigator from './MyProfileStackNavigator'

import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'

import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors'
import AuthStackNavigator from './AuthStackNavigator'

const Stack = createNativeStackNavigator()

const HomeStack = ({ navigation }) => {

    const { imageCamera, localId } = useSelector(state => state.authReducer.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const backgroundHomeStack = { uri: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyaW5rfGVufDB8fDB8fHww" }

    return (
        <View style={styles.containerHomeStack}>


            <ImageBackground
                source={backgroundHomeStack}
                resizeMode='cover'
                blurRadius={5}
                style={styles.imageBackground}
            >

                <View style={styles.head}>

                    <TouchableOpacity onPress={() => navigation.goBack()} >

                        <Feather name="arrow-left-circle" size={30} color={Colors.project.primary} />

                    </TouchableOpacity>

                    <View style={styles.containerBrandName}>
                        <Text style={styles.brandName}>
                            Emporio Areco
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('My Profile')}>
                        <Image
                            source={
                                imageFromBase || imageCamera ?
                                    { uri: imageFromBase?.image || imageCamera } :
                                    { uri: "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png" }
                            }
                            resizeMode='cover'
                            style={styles.imageProfile}
                        />
                    </TouchableOpacity>

                </View>

            </ImageBackground>

            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: styles.headerStyle,
                    headerTitleAlign: 'center',
                    headerShown: false
                }}
            >
                <Stack.Screen
                    component={Home}
                    name='Home'
                    options={{ title: 'Categorias' }}
                />

                <Stack.Screen
                    component={ItemListCategory}
                    name='ItemListCategory'
                    options={{ title: 'Productos' }}
                />

                <Stack.Screen
                    component={Detail}
                    name='Detail'
                    options={{ title: 'Detalles del producto' }}
                />

                <Stack.Screen
                    component={MyProfileStackNavigator}
                    name='My Profile'
                    options={{ title: 'Mi Perfil' }}
                />

            </Stack.Navigator>
        </View>
    )
}

export default HomeStack

const styles = StyleSheet.create({
    containerHomeStack: {
        flex: 1,
    },
    imageBackground: {
        marginBottom: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 8,
    },
    containerBrandName: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        color: 'black',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center'
    },
    imageProfile: {
        height: 50,
        width: 50,
        borderRadius: 200,
    },
    headerStyle: {
        backgroundColor: Colors.project.primary,
        borderBottomWidth: 10
    },
})

