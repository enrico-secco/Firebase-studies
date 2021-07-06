import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import { useNavigation} from '@react-navigation/native'

import firebase from '../src/firebaseConnection'

export default function Login() {

    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation();
  

  async function logar(){ //async, pra garantir que vai ser enviado
    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then( (value) => { //se deu certo   value -> como se recebesse o user
      alert("Usuario logado: " + value.user.email)
      navigation.navigate('Logout')
    })
    //se der errado
    .catch( (error) => {
        alert('Ops, algo deu errado')
        alert(error)
        return;
    
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
    title="Logar"
    onPress={logar}/>
    
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