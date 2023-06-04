import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as BackendService from "../../services/auth.services";
import { Box, Button, TextField, Typography } from "@mui/material";

import './Auth.css';
import { AuthContext } from "../../context/auth.context";

function Login() {
  
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const context = useContext(AuthContext);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async (event) => {
        event.preventDefault()

        try{

            const user ={
                email,
                password
            }

            const response = await BackendService.login(user)
            localStorage.setItem("tokenAuth", response.data.tokenAuth);
            localStorage.setItem("email", email)
            await context.tokenVerification();
            navigate("/profile")


        } catch(error) {
            if(error.response.status === 400) {
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }


    }
  return (
    <Box component="div" className="auth">

      <Typography variant="h3" gutterBottom>Login</Typography>
    
      <Box component="form" onSubmit={handleLogin}>

        <TextField id="email" type="email" label="Email" variant="outlined" onChange={handleEmailChange} value={email}/>

        <TextField id="password" type="password" label="Password" variant="outlined" onChange={handlePasswordChange} value={password}/>

        {errorMessage && <p>{errorMessage}</p>}

        <Button variant="contained" type="submit" color="secondary">
        Login
        </Button>
      </Box>
      
    </Box>
  )
}

export default Login;