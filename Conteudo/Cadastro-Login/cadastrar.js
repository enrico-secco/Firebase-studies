import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;


export default function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(null)
  

  async function cadastrar(){ //async, pra garantir que vai ser enviado
    await firebase.auth().createUserWithEmailAndPassword(email, password) //é uma promise, devolve se deu certo ou errado
    .then( (value) => { //se deu certo.  
      alert("Usuario criado: " + value.user.email)
    })
    //se der errado
    .catch( (error) => {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres')
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert("Email invalido")
        return;
      } else{
        alert('Ops, algo deu errado')
      }
    })

    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}> Email </Text>
      <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      value={email}
      onChangeText={(texto) => { setEmail(texto)}}/>

      <Text style={styles.texto}> Senha</Text>
      <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      value={password}
      onChangeText={(texto) => { setPassword(texto)}}/>

      <Button
      title="Cadastrar"
      onPress={cadastrar}/>
      
      

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  texto:{
    fontSize:20
  },
  input:{
    marginBottom:25,
    fontSize:14,
    backgroundColor: "#fff",
    padding:5,
    width: '50%',
    borderRadius: 8
  }

});
