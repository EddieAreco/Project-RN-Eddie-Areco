import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useWindowDimensions, Platform, SafeAreaView } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import { useFonts } from 'expo-font';
import Home from '../../src/screens/Home';

import Navigator from '../../src/navigation/Navigator';
import { Provider } from 'react-redux';

import store from '../../src/Store/index.js'

import { initSQLiteDB } from '../../src/persistence/index';

(async () => {

  try {

    const response = await initSQLiteDB()
    console.log({responseCreatinDB: response})
    console.log('DB INICICIALIZADA')
    
  } catch (error) {
    console.log({errorCreatingDB: error})
  }

}) ()

export default function HomeScreen() {

  // const { width, height } = useWindowDimensions()

  // useEffect( () => {

  //   if (width > height){
  //     setOrientation ("landscape")
  //   } else{
  //     setOrientation("portrait")
  //   }

  // }, [ width, height])
  
  const [ fontsLoaded, fontError ] = useFonts({
    'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded || fontError){
    return null;
  }

  if (fontsLoaded && !fontError){
    
  return (
    <SafeAreaView style={styles.container}>

    <Provider store= {store}> 
      
    <Navigator />

    </Provider>
      
    </SafeAreaView>
  );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
