import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Card = ({children, style}) => {
  return (
    <View style={{...styles.container, ...style}}>
        {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.project.secondary,
        height: 70,
        shadowColor: "#000",
        shadowOffset:{
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 20,
        justifyContent: 'center'
    }
})
