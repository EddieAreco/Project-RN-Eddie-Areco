import { StyleSheet, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Card from './Card';

import { useDispatch } from 'react-redux';
import { setIdSelected } from '../src/features/shop/shopSlice';

const ProductItem = (
    { product,
        navigation,
        setProductSelected = () => { },
    }) => {

    const dispatch = useDispatch();

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
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: 'auto'
    },
    pressable: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textCategory: {
        color: 'black',
        width: '50%',
        fontSize: 15
    },
    img: {
        height: 120,
        width: 100,
        borderRadius: 8
    },
})