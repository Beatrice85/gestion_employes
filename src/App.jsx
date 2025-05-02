import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import React from 'react';
import Accueil from './Components/Accueil'
import Ajout from './Components/Ajout'
import Modifier from './Components/Modifier'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Accueil/>}/>
        <Route path='/ajout' element={<Ajout/>}/>
        <Route path='/modifier' element={<Modifier/>}/>

    </Routes>
    </BrowserRouter>
  )
}


export default App;
