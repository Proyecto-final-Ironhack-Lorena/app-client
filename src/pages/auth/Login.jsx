import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BackendService from "../../services/auth.services";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";

import "./Auth.css";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = {
        email,
        password,
      };

      const response = await BackendService.login(user);
      localStorage.setItem("tokenAuth", response.data.tokenAuth);
      localStorage.setItem("email", email);
      await context.tokenVerification();
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <Box component="div" className="auth">
      <Card  sx={{ backgroundColor: "#E8F3D8", padding: "6rem"}}>
        <Typography variant="h3" gutterBottom sx={{marginBottom: "4rem"}}>
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          <TextField
            id="email"
            type="email"
            label="Email"
            color="success"
            variant="outlined"
            onChange={handleEmailChange}
            value={email}
            sx={{ backgroundColor: "#fff" }}
          />

          <TextField
            id="password"
            type="password"
            label="Password"
            color="success"
            variant="outlined"
            onChange={handlePasswordChange}
            sx={{ backgroundColor: "#fff" }}
            value={password}
          />

          {errorMessage && <p>{errorMessage}</p>}

          <Button
            variant="contained"
            type="submit"
            color="success"
            sx={{ backgroundColor: "#BBCCA4" }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;
