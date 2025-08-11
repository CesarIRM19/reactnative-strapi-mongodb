import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput,Button } from 'react-native-paper';
import { styleForm } from '../../Styles/index'

export default function Login({cambiarForm}) {
  return (
    <View>
      <TextInput
            label="Correo"
            style={styleForm.input}
        />

        <TextInput
            label="Contraseña"
            style={styleForm.input}
            secureTextEntry
        />
        
        <Button 
          mode="contained" 
          style={styleForm.registrarBtn}
          onPress={() => console.log('Pressed')}>
          Iniciar sesion
        </Button>

        <Button 
          mode="text" 
          style={styleForm.LogBtn}
          labelStyle={styleForm.LabelBtn}
          onPress={cambiarForm}>
          Registrar
        </Button>
    </View>
  )
}