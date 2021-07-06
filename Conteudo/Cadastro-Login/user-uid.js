import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;


export default function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [name, setName] = useState("")
  

  async function cadastrar(){ //async, pra garantir que vai ser enviado
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => { 
     /// alert(value.user.uid)
     
     firebase.database().ref('usuario').child(value.user.uid).set({ //cria com o código send o uid do user
       nome: name
     })

     alert('Usuário criado')
     setName(''), setEmail(''), setPassword('')
    })
    .catch((error) => {
      alert('Algo deu errado!')
    })
  }


  return (
    <View style={styles.container}>

      <Text style={styles.texto}> Nome </Text>
      <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      value={name}
      onChangeText={(nomeInput) => { setName(nomeInput)}}/>

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
