import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;


export default function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState('')

  async function logar(){ //async, pra garantir que vai ser enviado
    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then( (value) => { //se deu certo   value -> como se recebesse o user
      alert("Usuario logado: " + value.user.email)
      setUser(value.user.email)
    })
    //se der errado
    .catch( (error) => {
        alert('Ops, algo deu errado')
        return;
    
    })
      setEmail("");
      setPassword("");
      
  }

  async function logout(){
    await firebase.auth().signOut();
    setUser('')
    alert('Deslogado com sucesso')
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
      title="Logar"
      onPress={logar}/>
      
      <Text> {user} </Text>

      
        {user.length > 0 ? 
            (<Button title="Logout" onPress={logout}/>)
            : <Text> Nenhum usuário Logado </Text> }
     
      
      

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
