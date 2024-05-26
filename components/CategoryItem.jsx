import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import Card from "./Card"
import { useDispatch } from "react-redux"
import { setCategorySelected } from "../src/features/shop/shopSlice"

const CategoryItem = ({ category, navigation }) => {

const dispatch = useDispatch()

const handleNavigate = () => {

  dispatch ( setCategorySelected(category) )

  navigation.navigate('ItemListCategory', {category: category} )
}

  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>

      <Pressable onPress={ handleNavigate }>

        <Text style={styles.text}>{category}</Text>

      </Pressable>

    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: "center",
    fontSize: 25,
  },
})