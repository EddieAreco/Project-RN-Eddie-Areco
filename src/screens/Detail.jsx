import { StyleSheet, Text, View, Image, Button, Dimensions, Pressable, ScrollView, Alert } from 'react-native'
import React from 'react'

import Counter from '../../components/Counter'

import { useDispatch, useSelector } from "react-redux"
import { useGetProductsByIdQuery } from '../services/shopService'

import { addItem, decreaceItem } from '../features/cart/cartSlice'
import { Colors } from '@/constants/Colors'

const { height, width } = Dimensions.get('window')
const Detail = ({ route }) => {

    const dispatch = useDispatch();

    const { productId: itemIdSelected } = route.params

    const { data: products, error, isLoading } = useGetProductsByIdQuery(itemIdSelected)

    const cart = useSelector(state => state.cartReducer.value);

    const productInCart = cart.products.find(item => item.id === itemIdSelected);
    const quantity = productInCart ? productInCart.quantity : 0;

    const handleAddItem = () => {

        dispatch(addItem({ ...products, quantity: 1 }))
        Alert.alert('producto agregado al carrito')

    }

    const reduceItemCart = () => {

        dispatch(decreaceItem({ ...products, quantity: 1 }))

        quantity > 0 && Alert.alert('producto restado del carrito')

    }

    return (
        <ScrollView style={styles.container}>

            {products ? (
                <View>

                    <View style={styles.containerImage}>

                        <Image
                            resizeMode='cover'
                            source={{ uri: products.images[0] }}
                            style={styles.imgDetail}
                        />

                    </View>

                    <View style={styles.containerTexts}>

                        <Text style={styles.titleProduct}> {products.title} </Text>
                        <Text style={styles.priceProduct}> $ {products.price} </Text>
                        <Text style={styles.detailProduct}> Marca: {products.brand} </Text>
                        <Text style={styles.detailProduct}> Descripción: </Text>
                        <Text style={styles.detailProduct}> {products.description} </Text>

                    </View>

                    <View style={styles.containerButton}>
                        <Counter 
                        quantity={quantity} 
                        addItemCart={handleAddItem}
                        decreaceItem={reduceItemCart}
                        />
                    </View>

                </View>
            ) : null}

        </ScrollView>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    containerImage: {
        height: height * 0.4,
        width: width * 1,
        shadowColor: "@000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 15,
        alignSelf: 'center',
    },
    imgDetail: {
        height: '100%',
    },
    containerTexts: {
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'flex-start',
        gap: 7,
        width: '90%',
    },
    titleProduct: {
        fontSize: 30
    },
    priceProduct: {
        color: '#1da1f2',
        fontWeight: '300',
        fontSize: 25
    },
    detailProduct: {
        fontSize: 15
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCart: {
        backgroundColor: Colors.project.primary,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 10,
    },
})