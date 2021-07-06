import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;

import Listagem from './src/Listagem'

export default function App() {

  const [nome, setNome] = useState("")
  const [cargo, setCargo] = useState(null)
  const [usuarios,setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {

    async function Dados(){ //como faz uma req, criou uma função async

      await firebase.database().ref('usuario').on('value', (snapshot) => {
        setUsuarios([]) //seta assim pra quando add, não repetir

        snapshot.forEach((childItem) => {//percorrer todo o banco
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            cargo: childItem.val().cargo
          };

          setUsuarios(oldArray => [...oldArray, data].reverse()) //resverse, pra exibir o ultimo add primeiro
        }) 

        setLoading(false)

      })
    }
  
    Dados();

  }, [])


  async function cadastrar(){ //async, pra garantir que vai ser enviado
    if(nome !== "" & cargo !== ''){
      let usuario = await firebase.database().ref('usuario'); //pra ficar acessando ele em uma variável
      let chave = usuario.push().key; //criando uma key aleatória.

      usuario.child(chave).set({ //cria uma child de usuario com a key que foi criada.
        nome: nome,
        cargo: cargo
      });

      alert("Cadastrado com Sucesso")
      setCargo('');
       setNome('');

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}> Nome </Text>
      <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      value={nome}
      onChangeText={(texto) => { setNome(texto)}}/>

      <Text style={styles.texto}> Cargo</Text>
      <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      value={cargo}
      onChangeText={(texto) => { setCargo(texto)}}/>

      <Button
      title="Novo Funcionário"
      onPress={cadastrar}/>
      
      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
        ):
        (
       <FlatList
        keyExtractor={item => {item.key}}
        data={usuarios}
        renderItem={({item}) => ( <Listagem data={item} />) }
        />
        )}
      

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
