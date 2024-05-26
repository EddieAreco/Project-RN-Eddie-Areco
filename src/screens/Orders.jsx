import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import OrderItem from '../../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const OrderScreen = () => {

  const {user} = useSelector( state => state.authReducer.value )
  const {data: orders, isSuccess} = useGetOrdersQuery(user)
  const [ordersFiltered, setOrdersFiltered] = useState()

  useEffect(() => {
  
    try {
      
    if(isSuccess) {

      const responseTransformed = Object.values(orders)
      const ordersFiltered = responseTransformed.filter(order => order.user === user)
      setOrdersFiltered(ordersFiltered) 

    }
    } catch (error) {
      Alert.alert(`El error en generar la orden: ${error.message}`)
    }

  }, [orders, isSuccess, user])

  return (
    <View style={styles.container}>

      { ordersFiltered && ordersFiltered.length > 0 ? (
        <FlatList
            data={ordersFiltered}
            renderItem={({item}) => {
                return (
                    <OrderItem 
                      order={item}
                    />
                )
            }}
        />
        ) : (
          <Text style={styles.noOrders}> 
          
          No hay órdenes
          <FontAwesome6 name='face-frown-open' size={24} color={'black'} />
          .Por favor, diríjase a 'Shop'

            </Text>
        )}

    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrders:{
    fontSize: 20,
  },
})