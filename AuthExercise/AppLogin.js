import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;

import Login from './AuthExercise/Login'
import Logout from './AuthExercise/logout';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}
        options={{ headerShown: false}}/>

        <Stack.Screen name="Logout" component={Logout} 
        options={{ headerShown: false}}/>
        



      </Stack.Navigator>
    </NavigationContainer>

  );
}



