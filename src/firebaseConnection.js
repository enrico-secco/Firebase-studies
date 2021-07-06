import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyAUzHsvBn1LZ-9wa_kGhVOlzPQ8WtI0iCE",
    authDomain: "meuapp-95eb1.firebaseapp.com",
    databaseURL: "https://meuapp-95eb1.firebaseio.com",
    projectId: "meuapp-95eb1",
    storageBucket: "meuapp-95eb1.appspot.com",
    messagingSenderId: "267340330265",
    appId: "1:267340330265:web:a0778c50c299f73dd8c188",
    measurementId: "G-8D2S3JVGHF"
  };
  

  //Para não ter duas conexões, se não dá erro.
  if(!firebase.apps.length){ //se não tem nada criado ou inicializado, ele abre a conexão.
                             //  o length não vai ser 0 se já tiver uma conexão, então ele pula pra não abrir mais uma.

      // Initialize Firebase, abrir conexão
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;

