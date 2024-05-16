import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { View, StyleSheet, Text } from "react-native"
import { FontAwesome5, FontAwesome6, FontAwesome } from '@expo/vector-icons';

import Header from "../../components/Header"
import CartTabNavigator from "./CartTabNavigator"
import MyProfileStackNavigator from "./MyProfileStackNavigator";

// import { colors } from "../constants/colors";

import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator()

const HomeTab = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                // header: () => {
                //     return <Header route={route} />
                // },
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
                    tabBarBadge: 3,
                }}
            />

            <Tab.Screen
                name="My Profile"
                component={MyProfileStackNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <View style={styles.containertabBarIcon}>

                            <FontAwesome
                                name="user"
                                size={30}
                                color={color}
                            />

                                <Text style={styles.texttabBarIcon}>Mi Perfil</Text>

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
        fontSize: 15,
    }
})