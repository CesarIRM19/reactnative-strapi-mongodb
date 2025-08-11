import { StyleSheet, Image,Text, View } from 'react-native'
import React from 'react'
import styleslayout from '../Styles/layouts'
import img from '../../assets/icon.png'
import { useState } from 'react'
import Register from '../compoents/Auth/Register'
import Login from '../compoents/Auth/LoginForm'
import AuthContext from '../context/AuthContext'



const Auth = () => {
    const [showLogin, setshowLogin] = useState(false)
    const cambiarForm = () => {
        setshowLogin(!showLogin)
    }
  return (
    <View style = {styleslayout.layout}>
        <Image style= {styles.logo} source={img} />
        {showLogin ? <Login cambiarForm={cambiarForm}/>: <Register cambiarForm={cambiarForm}/>}
    </View>
  )
}
const styles = StyleSheet.create({
    
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
})

export default Auth

