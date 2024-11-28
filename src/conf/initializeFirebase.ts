import {initializeApp} from 'firebase/app';

// Importa tu configuración de Firebase desde la consola
const firebaseConfig = {
  apiKey: 'AIzaSyCgBtFxEe8S0NrIZmJEXoVvhswAMJH4TAg',
  authDomain: 'equipobasquet-8b3aa.firebaseapp.com',
  projectId: 'equipobasquet-8b3aa',
  storageBucket: 'equipobasquet-8b3aa.appspot.com',
  messagingSenderId: '286353703122',
  appId: '1:286353703122:web:6e61539b9fe50ec52ead0b',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export default app;
