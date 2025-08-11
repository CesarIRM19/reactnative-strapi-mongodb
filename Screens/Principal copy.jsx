import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import conjuntoImg from '../util/imagenes'
import Header from '../compoents/Peliculas/Heder'

export default function App() {
  const movies = [
    {
      title: 'The Room',
      price: '$303',
      year: '2003',
      director: 'Tommy Wiseau',
      production: 'Tommy Wiseau',
      script: 'Tommy Wiseau',
      image: conjuntoImg.room, // Link público
    },
    {
      title: 'Saving Christmas',
      price: '$323',
      year: '2014',
      director: 'Darren Doane',
      production: 'Raphi Henly, David Shannon',
      script: 'Darren Doane, Cheston Hervey',
      image: conjuntoImg.savingChristmas, // Link público
    },
    {
      title: 'Glitter',
      price: '$447',
      year: '2001',
      director: 'Vondie Curtis-Hall',
      production: 'Laurence Mark',
      script: 'Kate Lanier',
      image: conjuntoImg.glitter, // Link público
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.movieContainer}>
        {movies.map((movie, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{movie.title}</Text>
            <Image source={movie.image} style={styles.image} />
            <Text style={styles.text}>Precio: {movie.price}</Text>
            <Text style={styles.text}>Estreno: {movie.year}</Text>
            <Text style={styles.text}>Dirección: {movie.director}</Text>
            <Text style={styles.text}>Producción: {movie.production}</Text>
            <Text style={styles.text}>Guion: {movie.script}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0076',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#800080',

  },
  movieContainer: {
    alignItems: 'center',
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