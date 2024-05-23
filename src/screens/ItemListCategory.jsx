import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'

import ProductItem from '../../components/ProductItem';

import Search from '../../components/Search';

import { useGetProductsByCategoryQuery } from '../services/shopService'
import { Colors } from '@/constants/Colors';
// import { colors } from '../constants/colors';

const ItemListCategory = (
  { setCategorySelected = () => { },
    navigation,
    route
  }) => {

  const [keyword, setKeyword] = useState("")

  const [productsFiltered, setProductsFiltered] = useState([])

  const { category: categorySelected } = route.params

  const { data: productsFetched, error: errorFetch , isLoading } = useGetProductsByCategoryQuery ( categorySelected )
  //TRAEMOS LA CATEGORIA QUE OBTUVIMOS COMO PARAMETRO DE ROUTE

  console.log('productsFetched', productsFetched)

  useEffect(() => {

    if( !isLoading){

      const filter = productsFetched.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
      setProductsFiltered(filter);

    }

  }, [keyword, categorySelected, productsFetched])

  return (
    <>
      <ScrollView style = {styles.containerItemListCategory} endFillColor={'black'}>

        <Search 
        onSearch={setKeyword}  
        />

        <FlatList
          data={productsFiltered}

          keyExtractor={(product) => product.id}

          renderItem={({ item }) => <ProductItem product={item} navigation={navigation} />}
        />
      </ScrollView>
    </>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  containerItemListCategory: {
    backgroundColor: Colors.project.background,
  },
})