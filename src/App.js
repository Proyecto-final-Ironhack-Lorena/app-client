
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { Box } from '@mui/material';
import Profile from './pages/profile/Profile';
import Signout from './pages/profile/Signout';
import Preguntas from './pages/Preguntas';
import Respuestas from './pages/Respuestas';

function App() {
  return (
    <Box component="div" className="App">

      <Routes>
        <Route path= "/auth/signup" element={<Signup/>}/>
        <Route path= "/auth/login" element={<Login/>}/>
        <Route path= "/profile" element={<Profile/>}/>
        <Route path= "/signout" element={<Signout/>}/>
        <Route path= "/preguntas" element={<Preguntas/>}/>
        <Route path= "/preguntas/:id" element={<Respuestas/>}/>





      </Routes>
    </Box>
  );
}

export default App;
