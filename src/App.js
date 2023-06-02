
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import { Box } from '@mui/material';

function App() {
  return (
    <Box component="div" className="App">

      <Routes>
        <Route path= "/auth/signup" element={<Signup/>}/>

      </Routes>
    </Box>
  );
}

export default App;
