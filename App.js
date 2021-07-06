import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/Feather'
import firebase from './src/firebaseConnection'
import TaskList from './src/TaskList'


console.disableYellowBox = true;

export default function App() {
  const inputRef = useRef(null);

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])
  const [key, setKey] = useState('') //criou essa key, pra ver se ta alterando ou adicionando

  useEffect( () => {

    async function loadTasks(){
      await firebase.database().ref('tarefas').on('value', (snapshot) => {
        setTasks([])

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };

          setTasks( oldArray => [...oldArray, data])
        })

      } )
    }

    loadTasks();
  },[])

  async function handleAdd(){
    if(newTask !== ""){

      if(key !== ""){ //verificando pra ver se é alteração ou ta adicionando
        await firebase.database().ref('tarefas').child(key).update({
          nome: newTask
        })
        Keyboard.dismiss();
        setNewTask(""); //limpar o imput
        setKey("") // se não quando fosse add outra, na hora de add ia substituir a última editada
        return;
      }

      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key

      tarefas.child(chave).set({
        nome: newTask
      });

     Keyboard.dismiss();
     setNewTask('');

    }
  }

  async function handleDelete(key){
    await firebase.database().ref('tarefas').child(key).remove();

  }

  async function handleEdit(data){
    setNewTask(data.nome);
    setKey(data.key) // seta uma key pra depois ver se é alteração ou adicionar.
    inputRef.current.focus(); //focar no input e abrir teclado

  }

  function cancelEdit(){
    setKey("") //pra sair 
    Keyboard.dismiss();
    setNewTask(""); //limpar input
  }

  return (
    <View style={styles.container}>

     {key !== "" ? ( 
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={cancelEdit}>
          <Icon name="x-circle" size={20} color="#ff0000"/>
        </TouchableOpacity>
        <Text 
        style={{paddingLeft: 5, paddingBottom: 15, color: "#ff0000"}}
        > 
          Você está editando uma tarefa
        </Text>
      </View>
      ): 
        <Text></Text> }

      
      <View style={styles.containerTask}>  
        <TextInput
        style={styles.input}
        placeholder="Tarefas de Hoje"
        underlineColorAndroid="transparent"
        onChangeText={(taskInput) => { setNewTask(taskInput)}}
        value={newTask}
        ref={inputRef}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      
      </View>

      <FlatList 
      data={tasks} 
      keyExtractor={item => item.key} 
      renderItem={({item}) => (
        <TaskList data={item} 
        deleteItem={handleDelete} 
        editItem={handleEdit} 
        />   //PASSA AO DELETE ITEM COM A FUNC HANDLE DELETE
      )} />

    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    marginTop: 40,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  containerTask:{
    flexDirection: "row",
    alignItems:"center"
  },
  input:{
    flex:1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 40,
    fontSize:16
  },
  buttonAdd:{
    height:40,
    width: 40,
    backgroundColor: "#121212",
    justifyContent:"center",
    alignItems:"center",
    marginLeft: 5
    
  },
  buttonText:{
    color:"#fff",
    fontSize: 16
  }
})
