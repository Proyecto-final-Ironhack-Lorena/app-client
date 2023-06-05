import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as BackendService from "../services/auth.services";

function AñadirRespuesta() {
  const [description, setDescription] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams()

  const navigate = useNavigate();
  const handleDescriptionChange = (e) => setDescription(e.target.value);


  const handleNewAnswer = async (event) => {
    event.preventDefault();

    const answer = {
      description
    };

    try {
      await BackendService.getNewAnswer(params.id,answer);
      navigate("/preguntas");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <Box component="div">
      <Typography variant="h3" gutterBottom>
        Añadir respuesta
      </Typography>
      <Box component="form" onSubmit={handleNewAnswer}>
        <TextField
          id="description"
          label="Respuesta..."
          variant="outlined"
          onChange={handleDescriptionChange}
          value={description}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="contained" type="submit" color="secondary">
          Añadir respuesta!
        </Button>
      </Box>
    </Box>
  );
}

export default AñadirRespuesta;
