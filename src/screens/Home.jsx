import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CategoryItem from '../../components/CategoryItem'

// import categories from '../data/categories.json'
import Counter from '../../components/Counter'

import { useGetCategoriesQuery } from '../services/shopService'
import { colors } from '../constants/colors'

const Home = ({ route, navigation }) => {

  const { data: categories, error, isLoading } = useGetCategoriesQuery()

  return (
    <View style={styles.container}>

      <Counter />

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) =>

          <CategoryItem
            category={item}
            navigation={navigation}
          />}
      />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
})