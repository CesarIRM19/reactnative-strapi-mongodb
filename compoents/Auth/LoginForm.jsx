import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//import { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import { loginAPI } from '../../API/user'
import { styleForm } from '../../Styles/index'
import useAuth from '../../hooks/useAuth'
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function LoginForm({cambiarForm}) {


  const {login} = useAuth()
  //console.log(login)


  const SignupSchema = Yup.object({
    password: Yup.string().required('Required'),
    identifier: Yup.string().email('correo Invalido').required('Required'),
  });
  const formik = useFormik({
    initialValues: { 
      identifier: '' ,
      password: '',

    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      try {
        const response = await loginAPI(values)
        console.log('Respuesta: ' + JSON.stringify(response))
        if(response.statusCode) throw "Error en el usuario o contraseña"
        console.log(response)
        login(response)
        
      } catch (error) {
        console.log(error)
      }
    }

  })
  return (
    <View>
      
        <TextInput
            label="Correo"
            onChangeText={(value) => formik.setFieldValue('identifier', value)}
            error={formik.errors.email}
        />
        <Text style={styleForm.input}>{formik.errors.email}</Text>
        
        <TextInput
            label="Contraseña"
            
            onChangeText={(value) => formik.setFieldValue('password', value)}
            error={formik.errors.password}
            secureTextEntry
        />
        <Text style={styleForm.input}>{formik.errors.password}</Text>
        
        <Button 
          mode="contained" 
          style={styleForm.registrarBtn}
          onPress={formik.handleSubmit}
        >
          Iniciar sesion
        </Button>

        <Button 
          mode="text" 
          style={styleForm.LogBtn}
          labelStyle={styleForm.LabelBtn}
          onPress={cambiarForm}>
          Registrarse
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({})