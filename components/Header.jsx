import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = ( {route} ) => {

  const categorySelected = useSelector( state => state.shopReducer.value.categorySelected )

  const {height, width} = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Text style={styles.title}> { categorySelected ? categorySelected : route.name } </Text>
    </View>
  )
}

export default Header

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
      fontFamily: 'Roboto',
      fontSize: 20,
      alignSelf: 'center',
    },
})