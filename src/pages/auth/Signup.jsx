import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BackendService from "../../services/auth.services";
import { Box, Button, Card, TextField, Typography } from "@mui/material";

import "./Auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const user = {
        username,
        email,
        password,
      };

      await BackendService.signup(user);
      navigate("/auth/login");
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
      <Card sx={{ backgroundColor: "#E8F3D8", padding: "6rem 10rem 6rem 10rem" }}>
        <Typography variant="h3" gutterBottom sx={{ marginBottom: "4rem" }}>
          Regístrate
        </Typography>

        <Box component="form" onSubmit={handleSignup}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            color="success"
            onChange={handleUsernameChange}
            sx={{ backgroundColor: "#fff" }}
            value={username}
          />

          <TextField
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            color="success"
            sx={{ backgroundColor: "#fff" }}
            onChange={handleEmailChange}
            value={email}
          />

          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            sx={{ backgroundColor: "#fff" }}
            color="success"
            onChange={handlePasswordChange}
            value={password}
          />

          {errorMessage && <p>{`* ${errorMessage}`}</p>}

          <Button
            variant="contained"
            type="submit"
            color="success"
            sx={{ backgroundColor: "#BBCCA4" }}
          >
            Registrarse
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Signup;
