import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { useNavigation, StackActions } from '@react-navigation/native'


import firebase from '../src/firebaseConnection'


export default function Logout() {

    const navigation = useNavigation();

    async function logout(){
        await firebase.auth().signOut();
        navigation.dispatch(StackActions.popToTop)
        alert('Deslogado com sucesso')
        
      }
 return (
   <View style={{marginTop: 50}}>

        <Button title="Logout" onPress={logout}/>
   </View>
  );
}