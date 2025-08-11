import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import conjuntoImg from '../util/imagenes'
import Header from '../compoents/Peliculas/Heder'
import { resenaObtener } from "../API/resenas";
import { API_URL } from '../util/constants';
import AuthContext from '../context/AuthContext';



export default function Principal({logout}) {
  const [resenas, setresenas] = useState([])
  const [username, setusername] = useState(null)
  const usuario = useContext(AuthContext)

  


  
  const url = API_URL
  useEffect(() => {
    const getResenas = async () => {
      const res = await resenaObtener(usuario)
      console.log('esto es lo que hay en resenas: ')
      console.log(res[0])
      setusername(res[1])
      setresenas(res[0])
    }
    getResenas()
  }, [])
  
  console.log(username)
  return(
    <ScrollView style={styles.container}>
      
      <Header Texto={username} logout={logout}/>
      
      <View style={styles.movieContainer}>
        <Text style={styles.title}>Tus Reseña</Text>
        {console.log(resenas.titulo)}
        {resenas.map((resenas, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title_film}>{resenas.titulo}</Text>
            {console.log("Esto son las caratulas: ",resenas.caratula.url)}
            <Image source={
              {
                
              uri: url+resenas.caratula.url
              }
              } style={styles.image} />
            <Text style={styles.text}>Opinion</Text>
            <Text style={styles.text}>{resenas.opinion}</Text>
            <Text style={styles.text}>{
            resenas.recomendacion ? "Recomendado" : "No recomendado"
            }</Text>
            <Text style={styles.text}>Calificacion: {resenas.calificacion}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0076',
    
  },
  
  movieContainer: {
    alignItems: 'center',
    
    padding: 20,
    backgroundColor: '#4B0082',
  },
  card: {
    backgroundColor: '#29004D',
    borderRadius: 8,
    width: '90%',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  title_film: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0076',
  },
});