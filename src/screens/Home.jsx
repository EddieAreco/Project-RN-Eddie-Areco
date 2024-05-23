import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CategoryItem from '../../components/CategoryItem'

import { useGetCategoriesQuery } from '../services/shopService'
import { Colors } from '@/constants/Colors'
// import { colors } from '../constants/colors'

const Home = ({ route, navigation }) => {

  const { data: categories, error, isLoading } = useGetCategoriesQuery()

  return (
    <View style={styles.container}>

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
    backgroundColor: Colors.project.background
  },
})