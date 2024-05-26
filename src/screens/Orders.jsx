import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import OrderItem from '../../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'

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
    <View>

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
          <Text> NO HAY ORDENES </Text>
        )}

    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})