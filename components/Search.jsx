import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { FontAwesome6 } from '@expo/vector-icons';

const Search = ({ onSearch = () => {}, error = "", goBack = () => {} }) => {

  const [keyword, setKeyword] = useState("")
  
  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome6 name="searchengin" size={24} color="black" />
      </Pressable>

      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome5 name="eraser" size={24} color="black" />
      </Pressable>

      {error ? <Text>{error}</Text> : null}
      
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginTop: 10,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: 'pink',
    color: 'red',
    borderRadius: 10,
  },
})