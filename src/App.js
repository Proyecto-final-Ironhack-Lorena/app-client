
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







      </Routes>
    </Box>
  );
}

export default App;
