import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'

import CartItem from '../../components/CartItem'
import { useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'

const Cart = () => {

  const { products: CartData, total } = useSelector(state => state.cartReducer.value)
  //SE HACE UNA DESESTRUCTURACION CON LOS {} PORQUE ME INTERESA TRAER LOS ITEMS Y EL TOTAL DE state.cartReducer.value

  const [triggerPostOrder, result] = usePostOrderMutation()
  //EL 1ER PARAMETRO ES UNA FUNCION Y EL 2DO ES UNA VARIABLE, A DIFERENCIA DE QUERY, TENEMOS QUE DECIRLE A MUTATION CUANDO QUEREMOS QUE SE LLEVE A CABO

  const onConfirmOrder = () => {
    triggerPostOrder({ products: CartData, user: 'Eddie', date: new Date().toLocaleString(), total: total })
  }

  console.log('result', result)

  return (

    <View style={styles.container}>

      <FlatList
        data={CartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />
        }}
      />

      <View>

        <Pressable onPress={() => { }}>

          <Text onPress={ onConfirmOrder }>Confirmar</Text>

        </Pressable>

        <Text> Total: ${total} </Text>

      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'blue',
  // }
})