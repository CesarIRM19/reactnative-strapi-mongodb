import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//import { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import {registroAPI} from '../../API/user'
import { styleForm } from '../../Styles/index'
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Register({cambiarForm}) {
  const SignupSchema = Yup.object({
    username: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      /*
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      */
      .required('Required'),
    repeatPassword: Yup.string()
    /*
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      */
      .required('Required')
      .oneOf([Yup.ref('password')], true),
    email: Yup.string().email('correo Invalido').required('Required'),
  });
  const formik = useFormik({
    initialValues: { 
      email: '' ,
      username: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      console.log('Formulario enviado')
      console.log(values)
      registroAPI(values)
    }

  })
  return (
    <View>
      
        <TextInput
            label="Correo"
            onChangeText={(value) => formik.setFieldValue('email', value)}
            error={formik.errors.email}
        />
        <Text style={styleForm.input}>{formik.errors.email}</Text>
        
        <TextInput
            label="Nombre de usuario"
            
            onChangeText={(value) => formik.setFieldValue('username', value)}
            error={formik.errors.username}
        />
        <Text style={styleForm.input}>{formik.errors.username}</Text>
        
        <TextInput
            label="Contraseña"
            
            onChangeText={(value) => formik.setFieldValue('password', value)}
            error={formik.errors.password}
            secureTextEntry
        />
        <Text style={styleForm.input}>{formik.errors.password}</Text>
        
        <TextInput
            label="Confirmar contraseña"
            style={styleForm.input}
            onChangeText={(value) => formik.setFieldValue('repeatPassword', value)}
            error={formik.errors.repeatPassword}
            secureTextEntry
        />
        <Text style={styleForm.input}>{formik.errors.repeatPassword}</Text>
        <Button 
          mode="contained" 
          style={styleForm.registrarBtn}
          onPress={formik.handleSubmit}
        >
          Registrarse
        </Button>

        <Button 
          mode="text" 
          style={styleForm.LogBtn}
          labelStyle={styleForm.LabelBtn}
          onPress={cambiarForm}>
          Iniciar sesion
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({})