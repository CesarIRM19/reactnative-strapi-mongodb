import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Principal from '../Screens/Principal'
import Resena from '../Screens/Resena'
import Buscar from '../Screens/Buscar'
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator()  
export default function Navigation({logout}) {

  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{unmountOnBlur: true}}>
              {() => <Principal logout={logout} />}
            </Tab.Screen>
            <Tab.Screen name="Reseñas">
              {() => <Resena logout={logout} />}
            </Tab.Screen>
            <Tab.Screen name="Perfil" >
              {() => <Buscar logout={logout} />}
            </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
  )
}