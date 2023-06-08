
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { Box } from '@mui/material';
import Profile from './pages/profile/Profile';
import Signout from './pages/profile/Signout';
import Preguntas from './pages/Preguntas';
import Respuestas from './pages/Respuestas';
import Navbar from './components/Navbar';
import AñadirPregunta from './pages/AñadirPregunta';
import AñadirRespuesta from './pages/AñadirRespuesta';
import Home from './pages/Home';
import Diario from './pages/Diario';

import DatosDiario from './pages/DatosDiario';
import NewDiario from './pages/NewDiario';
import Error from './pages/Error/Error';
import NotFound from './pages/Error/NotFound';
import Listas from './pages/Listas';
import DatosLista from './pages/DatosLista';
import NewList from './pages/NewList';


function App() {
  return (
    <Box component="div" className="App">
    <Navbar/>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/auth/signup" element={<Signup/>}/>
        <Route path= "/auth/login" element={<Login/>}/>
        <Route path= "/profile" element={<Profile/>}/>
        <Route path= "/signout" element={<Signout/>}/>
        <Route path= "/preguntas" element={<Preguntas/>}/>
        <Route path= "/preguntas/:id" element={<Respuestas/>}/>
        <Route path= "/preguntas/newQuestion" element={<AñadirPregunta/>}/>
        <Route path= "/preguntas/:id/newAnswer" element={<AñadirRespuesta/>}/>
        <Route path= "/diario" element={<Diario/>}/>
        <Route path= "/diario/:id" element={<DatosDiario/>}/>
        <Route path= "/diario/newDiario" element={<NewDiario/>}/>
        <Route path= "/listas" element={<Listas/>}/>
        <Route path= "/lista/:id" element={<DatosLista/>}/>
        <Route path= "/lista/newList" element={<NewList/>}/>


        <Route path= "/error" element={<Error/>}/>
        <Route path= "*" element={<NotFound/>}/>
      </Routes>
    </Box>
  );
}

export default App;
