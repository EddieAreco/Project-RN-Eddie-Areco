import { StyleSheet, Text, View, Image, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import Card from './Card';

// import products from '../data/products.json'
import { useDispatch } from 'react-redux';
import { setIdSelected } from '../src/features/shop/shopSlice';

const ProductItem = (
    { product,
        navigation,
        setProductSelected = () => { },
    }) => {

    const dispatch = useDispatch();

    const { height, width } = useWindowDimensions()

    const handleNavigate = () => {

        dispatch(setIdSelected(product.id))

        navigation.navigate('Detail', { productId: product.id })
    }

    return (

        <Card style={styles.additionalStylesCard}>

            <Pressable style={styles.pressable} onPress={handleNavigate}>

                <Text style={styles.textCategory}>{product.title}</Text>
                <Image
                    resizeMode='cover'
                    style={styles.img}
                    source={{ uri: product.images[0] }}
                />

            </Pressable>
        </Card>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    additionalStylesCard: {
        paddingLeft: 10,
        flexDirection: 'row',
        height: 120,
        width: 300,
        justifyContent: 'space-between',
        margin: 10,
    },
    pressable: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textCategory: {
        color: 'green',
        width: '50%'
    },
    img: {
        height: 120,
        width: 100,
        borderRadius: 8
    },
})