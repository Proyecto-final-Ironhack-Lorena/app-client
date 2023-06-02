import { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as BackendService from "../services/auth.services";
import { Box, Button, TextField, Typography } from "@mui/material";

import './Signup.css';

function Signup() {

    const [username, setUsername ] = useState("")
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignup = async (event) => {
        event.preventDefault()

        try{

            const user ={
                username,
                email,
                password
            }

            await BackendService.signup(user)
            navigate("/auth/login")


        } catch(error) {
            if(error.response.status === 400) {
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }


    }
  return (
    <Box component="div" className="signup">

      <Typography variant="h3" gutterBottom>Sign Up</Typography>
    
      <Box component="form" onSubmit={handleSignup}>
        
        <TextField id="username" label="Username" variant="outlined" onChange={handleUsernameChange} value={username}/>

        <TextField id="email" type="email" label="Email" variant="outlined" onChange={handleEmailChange} value={email}/>

        <TextField id="password" type="password" label="Password" variant="outlined" onChange={handlePasswordChange} value={password}/>

        {errorMessage && <p>{errorMessage}</p>}

        <Button variant="contained" type="submit" color="secondary">
        Registrarse
        </Button>
      </Box>
      
    </Box>
  )
}

export default Signup;