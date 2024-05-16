import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'

import ProductItem from '../../components/ProductItem';

import Search from '../../components/Search';

import { useGetProductsByCategoryQuery } from '../services/shopService'
import { colors } from '../constants/colors';

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
      <View style = {styles.containerItemListCategory}>

        <Search 
        onSearch={setKeyword}  
        />

        <FlatList
          data={productsFiltered}

          renderItem={({ item }) => 

          <ProductItem product={item} navigation={navigation} />

        }

          keyExtractor={(product) => product.id}
        />
      </View>
    </>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  containerItemListCategory: {
    alignItems: 'center',
    backgroundColor: 'blue',
  },
})