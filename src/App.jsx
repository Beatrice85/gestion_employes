import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Accueil from './Components/Accueil'
import Ajout from './Components/Ajout'
import Modifier from './Components/Modifier'

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Accueil/>}/>
      <Route path='/ajout' element={<Ajout/>}/>
      <Route path='/modifier/:id' element={<Modifier/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;
