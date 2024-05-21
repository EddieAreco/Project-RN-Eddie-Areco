import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import OrderData from '../data/orders.json'
import OrderItem from '../../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'

const OrderScreen = () => {

  const {user} = useSelector( state => state.authReducer.value )
  const {data: orders, isSuccess} = useGetOrdersQuery(user)
  const [ordersFiltered, setOrdersFiltered] = useState()

  console.log({orders})

  useEffect(() => {
  
    try {
      
    if(isSuccess) {

      const responseTransformed = Object.values(orders)
      
      console.log({user})
      const ordersFiltered = responseTransformed.filter(order => order.user === user)
      setOrdersFiltered(ordersFiltered) 

    }
    } catch (error) {
      console.log(error)
    }

  }, [orders, isSuccess, user])

  console.log({ordersFiltered})

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