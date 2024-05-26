import { StyleSheet, Platform, SafeAreaView, StatusBar, Alert } from 'react-native';

import { useFonts } from 'expo-font';

import Navigator from '../../src/navigation/Navigator';
import { Provider } from 'react-redux';

import store from '../../src/Store/index.js'

import { initSQLiteDB } from '../../src/persistence/index';

(async () => {

  try {

    const response = await initSQLiteDB()
    
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Error', `Error creando la base de datos: ${error.message}`);
    } else {
      Alert.alert('Error', 'Error creando la base de datos: Error desconocido');
    }
  }

}) ()

export default function HomeScreen() {
  
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
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
