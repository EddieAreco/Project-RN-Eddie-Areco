import { View, StyleSheet, Text, Image, Pressable, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Header from '../../components/Header'
import Home from '../screens/Home'
import ItemListCategory from '../screens/ItemListCategory'
import Detail from '../screens/Detail'

// import { colors } from '../constants/colors'

import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'

import Feather from '@expo/vector-icons/Feather';

const Stack = createNativeStackNavigator()

const HomeStack = ({ navigation }) => {

    const { imageCamera, localId } = useSelector(state => state.authReducer.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const prueba = { uri: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyaW5rfGVufDB8fDB8fHww" }

    return (
        <View style={styles.containerHomeStack}>


            <ImageBackground
                source={prueba}
                resizeMode='cover'
                blurRadius={5}
                style={styles.imageBackground}
            >

                <View style={styles.head}>

                    <Pressable onPress={() => navigation.goBack()} >

                        <Feather name="arrow-left-circle" size={30} color={'red'} />

                    </Pressable>

                    <View style={styles.containerBrandName}>
                        <Text style={styles.brandName}>
                            EMPORIO ARECO
                        </Text>
                    </View>

                    {imageFromBase || imageCamera ? (
                        <Image
                            source={{ uri: imageFromBase?.image || imageCamera }}
                            resizeMode='cover'
                            style={styles.imageProfile}
                        />
                    ) : (
                        <Image
                            source={{ uri: "https://i.ibb.co/yXZXXJ1/user-login-icon-14.png" }}
                            style={styles.imageProfile}
                        />
                    )
                    }

                </View>

            </ImageBackground>

            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: styles.headerStyle,
                    headerTitleAlign: 'center',
                    headerShown: false
                }}
            // screenOptions={
            //     ({ route }) => (
            //         {
            //             header: () => {
            //                 return <Header title={
            //                     route.name === 'Home' ? 'CategoryItem' : route.name === 'ItemListCategory' ? route.params.category : 'Detail'
            //                 } />
            //             },
            //         }
            //     )
            // }
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

            </Stack.Navigator>
        </View>
    )
}

export default HomeStack

const styles = StyleSheet.create({
    containerHomeStack: {
        flex: 1,
    },
    head: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 5,
    },
    containerBrandName: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
    },
    brandName: {
        color: 'red',
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
        backgroundColor: 'red',
        borderBottomWidth: 10
    },
    bar: {
        backgroundColor: 'blue'
    }
})

