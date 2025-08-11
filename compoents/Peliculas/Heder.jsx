import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';

export default function Header({Texto,logout}) {
    
    
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{Texto}</Text>
      <TouchableOpacity style={styles.cartButton}>
        <Button title='Cerrar sesion' onPress={logout} color="#FFD700"></Button>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#800080', // Morado
    paddingTop: 25,
    paddingLeft: 10,
    paddingBottom: 10,
    
  },
  title: {
    color: '#FFD700', // Amarillo
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
  },
  cartButton: {
    backgroundColor: '#4B0082', // Morado oscuro
    padding: 10,
    borderRadius: 5,
    paddingRight: 40,
  },
  cartButtonText: {
    color: '#FFFFFF', // Blanco
    fontWeight: 'bold',
  },
});
