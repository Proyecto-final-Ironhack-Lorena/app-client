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
      <Typography variant="h3" gutterBottom sx={{marginTop: "8rem", marginBottom: "3rem"}}>
        Añadir respuesta
      </Typography>
      <Box component="form" onSubmit={handleNewAnswer} className="card">
        <TextField
          id="description"
          label="Respuesta..."
          variant="outlined"
          multiline
          onChange={handleDescriptionChange}
          value={description}
          color="success"
          sx={{backgroundColor: "#EDF5E0", width: '30rem' }}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <Button
        variant="contained"
        color="secondary"
        type="submit"
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
        >
        Responder
        </Button>
      </Box>
    </Box>
  );
}

export default AñadirRespuesta;
