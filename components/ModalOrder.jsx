import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

import SubmitButton from './SubmitButton'

const ModalOrder = ( {modalVisible, selectedOrder, closeModal} ) => {
  return (
    <View>
      <Modal
                    visible={modalVisible}
                    animationType='slide'
                    presentationStyle='pageSheet'
                >
                    <View style={styles.containerModal}>
                        <Text style={styles.text2}>Detalles de la Orden</Text>

                        <Text style={styles.text2}>Productos:</Text>

                        {selectedOrder.products.map((product, index) => (
                            <Text key={index} style={styles.productText}>
                                {product.brand} - ${product.price} - {product.quantity} {product.quantity > 1 ? 'unidades' : 'unidad'}
                            </Text>
                        ))}

                        <SubmitButton title='Volver' onPress={closeModal} style={styles.button}/>
                    </View>
                </Modal>
    </View>
  )
}

export default ModalOrder

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    text2:{
        fontSize: 19,
        color: "gray",
        marginVertical: 10,
    },
    button:{
        alignSelf: 'center'
    },
})