import {StyleSheet, View, Text} from 'react-native'
import { Button } from 'react-native-paper';
import React from 'react'

export default function Prueba() {
  return (
    <View>
      <Text>Prueba</Text>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
      Press me
      </Button>
    </View>
    
  )
}

const styles = StyleSheet.create({})