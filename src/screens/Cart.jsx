import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'

import CartItem from '../../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'
import { clearCart, removeItem } from '../features/cart/cartSlice'
import SubmitButton from '@/components/SubmitButton'
import { useNavigation } from 'expo-router'

const Cart = () => {
  
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { localId, user } = useSelector(state => state.authReducer.value)
  const { products: CartData, total } = useSelector(state => state.cartReducer.value)
  //SE HACE UNA DESESTRUCTURACION CON LOS {} PORQUE ME INTERESA TRAER LOS ITEMS Y EL TOTAL DE state.cartReducer.value

  const [triggerPostOrder, result] = usePostOrderMutation()
  //EL 1ER PARAMETRO ES UNA FUNCION Y EL 2DO ES UNA VARIABLE, A DIFERENCIA DE QUERY, TENEMOS QUE DECIRLE A MUTATION CUANDO QUEREMOS QUE SE LLEVE A CABO

  const onConfirmOrder = () => {

    if (!user) {
      navigation.navigate('Login');
      return;
    }

    triggerPostOrder({
      products: CartData,
      id: localId,
      date: new Date().toLocaleString(),
      total: total,
      user: user,
    })

    Alert.alert('Compra confirmada! Ahora se encuentra en el listado de órdenes')

    dispatch(clearCart())

  }

  const removeProduct = (id) => {

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

            <SubmitButton
            onPress={onConfirmOrder}
            title= 'Confirmar'
            style={styles.button}
            />

            <SubmitButton
            onPress={clearAllCart}
            title= 'Vaciar Carrito'
            style={styles.button}
            />

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

const styles = StyleSheet.create({
  button:{
    alignSelf: 'center'
  },
})