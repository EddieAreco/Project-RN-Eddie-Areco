import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { View, StyleSheet, Text } from "react-native"
import { FontAwesome5, FontAwesome6, FontAwesome, Octicons } from '@expo/vector-icons';

import HomeStack from "./HomeStack";
import CartTabNavigator from "./CartTabNavigator"
import Orders from '../screens/Orders'
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator()

const HomeTab = () => {

    const { products: CartData } = useSelector(state => state.cartReducer.value)

    const cantidadCarrito = CartData.length

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'purple'
            })}
        >

            <Tab.Screen
                name="Shop"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (

                            <View style={styles.containertabBarIcon}>

                                <FontAwesome5
                                    name="shopping-basket"
                                    size={24}
                                    color={color}
                                />

                                <Text style={styles.texttabBarIcon}>Shop</Text>

                            </View>
                        )
                    }
                }}
            />

            <Tab.Screen
                name="Carro de Compras"
                component={CartTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (

                            <View style={styles.containertabBarIcon}>

                                <FontAwesome6
                                    name="cart-shopping"
                                    size={24}
                                    color={color}
                                />

                                <Text style={styles.texttabBarIcon}>Carrito</Text>

                            </View>
                        )
                    },
                    tabBarBadge: cantidadCarrito > 0 ? cantidadCarrito : 0,
                }}
            />

            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <View style={styles.containertabBarIcon}>

                                <Octicons
                                    name="list-ordered"
                                    size={30}
                                    color={color}
                                />

                                <Text style={styles.texttabBarIcon}>Pedidos</Text>

                            </View>
                        )
                    },
                }}
            />

        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    tabBar: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        borderTopWidth: 2,
        borderTopColor: 'orange',
        borderEndColor: 'orange',
        borderStartColor: 'orange',
        borderBottomColor: 'white',
        borderWidth: 2,
        height: '8%',
    },
    containertabBarIcon: {
        alignItems: 'center',
    },
    texttabBarIcon: {
        fontSize: 10,
    }
})