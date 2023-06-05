import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BackendService from "../services/auth.services";

function AñadirPregunta() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [kind, setKind] = useState("Dolor");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleKindChange = (e) => setKind(e.target.value);

  const handleNewQuestion = async (event) => {
    event.preventDefault();

    const question = {
      title,
      description,
      kind,
    };

    try {
      await BackendService.getNewQuestion(question);
      navigate("/preguntas");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const tipos = [
    {
      value: 'Dolor',
      label: 'Dolor'
    },
    {
      value: '¿Puedo comerlo?',
      label: '¿Puedo comerlo?'
    },
    {
      value: 'Síntoma',
      label: 'Síntoma'
    }
  ]
  return (
    <Box component="div">
      <Typography variant="h3" gutterBottom>
        Añadir pregunta
      </Typography>
      <Box component="form" onSubmit={handleNewQuestion}>
        <TextField
          id="title"
          label="Título de la pregunta"
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
        />
        <TextField
          id="description"
          label="Descripción de la pregunta"
          variant="outlined"
          onChange={handleDescriptionChange}
          value={description}
        />
        <TextField
          id="kind"
          label="Tipo"
          select
          defaultValue="Dolor"
          variant="outlined"
          onChange={handleKindChange}
          value={kind}
        >
        {tipos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

         </TextField> 
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="contained" type="submit" color="secondary">
          Añadir pregunta!
        </Button>
      </Box>
    </Box>
  );
}

export default AñadirPregunta;
