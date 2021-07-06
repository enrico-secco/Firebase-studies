import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import firebase from './src/firebaseConnection'
console.disableYellowBox = true;

export default function App() {

  const[nome, setNome] = useState("Carregando...")
  const [cargo, setCargo] = useState(null)

  useEffect( () => {

    async function Dados(){ //como faz uma req, criou uma função async

      //Criar um nó e atualizar
        //await firebase.database().ref('tipo').set('Cliente') //como não tinha um tipo, ele criou com o valor ("Cliente")
      //se agora passar outro valor no set, ele apenas atualiza

      //Remover
       //await firebase.database().ref('tipo').remove()


      //add no nó
     /* await firebase.database().ref('usuario').child(3).set({
        nome: "José",
        cargo: "Prog"
      })*/

      /*await firebase.database().ref('usuario').child(3)
      .update({ //update, se não ele deletaria o cargo e mudaria o nome
        nome: "José Augusto"
      }) */




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
