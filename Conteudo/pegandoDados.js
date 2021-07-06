import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from '../src/firebaseConnection'
console.disableYellowBox = true;

export default function App() {

  const[nome, setNome] = useState("Carregando...")
  const [idade, setIdade] = useState(null)

  useEffect( () => {

    async function Dados(){ //como faz uma req, criou uma função async


      // Pegando dentro de usuario(Nó)
      //olheiro da database, fica monitorando a database o tempo todo. Se muda no database ele muda na hora já.
      await firebase.database().ref('usuario/1').on('value', (snapshot) => {
        setNome(snapshot.val().nome)
        setIdade(snapshot.val().idade)
      }) 

  
      //olheiro da database, fica monitorando a database o tempo todo. Se muda no database ele muda na hora já.
      /*await firebase.database().ref('nome').on('value', (snapshot) => {
        setNome(snapshot.val())
      })*/ 


      /*//busca só uma vez (ONCE), ou seja se mudar, tem que atualizar o app pra ele puxar.
      await firebase.database().ref('nome').once('value', (snapshot) => {  
        setNome(snapshot.val())
      }) */
    }

    Dados();

  }, [])

  return (
    <View style={styles.container}>
      <Text> Bem vindo {nome}</Text>
  <Text>Idade: {idade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
