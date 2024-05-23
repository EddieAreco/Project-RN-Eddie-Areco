import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'

import CartItem from '../../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'
import { clearCart, removeItem } from '../features/cart/cartSlice'

const Cart = () => {

  const dispatch = useDispatch();

  const { localId, user } = useSelector(state => state.authReducer.value)
  const { products: CartData, total } = useSelector(state => state.cartReducer.value)
  //SE HACE UNA DESESTRUCTURACION CON LOS {} PORQUE ME INTERESA TRAER LOS ITEMS Y EL TOTAL DE state.cartReducer.value

  const [triggerPostOrder, result] = usePostOrderMutation()
  //EL 1ER PARAMETRO ES UNA FUNCION Y EL 2DO ES UNA VARIABLE, A DIFERENCIA DE QUERY, TENEMOS QUE DECIRLE A MUTATION CUANDO QUEREMOS QUE SE LLEVE A CABO

  const onConfirmOrder = () => {

    triggerPostOrder({
      products: CartData,
      id: localId,
      date: new Date().toLocaleString(),
      total: total,
      user: user,
    })

    dispatch(clearCart())

  }

  console.log('result en componente Cart', result)

  const removeProduct = () => {

    dispatch(removeItem({ id }))

  }
  const clearAllCart = () => {

    dispatch(clearCart())

  }

  return (

    <View style={styles.container}>

      {CartData && CartData.length > 0 ? (

        <>
          <FlatList
            data={CartData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <CartItem
                cartItem={item}
                onPress={() => removeProduct(item.id)}
              />
            }}
          />

          <View>

            <Pressable onPress={() => { }}>

              <Text onPress={onConfirmOrder}>Confirmar</Text>

            </Pressable>

            <Pressable onPress={() => { }}>

              <Text onPress={clearAllCart}>Vaciar Carrito</Text>

            </Pressable>

            <Text> Total: ${total} </Text>

          </View>

        </>

      ) : (

        <Text> El carrito está vacío </Text>

      )}

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})