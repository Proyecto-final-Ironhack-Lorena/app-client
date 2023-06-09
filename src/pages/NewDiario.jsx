import {
  Button,
  Rating,
  TextField,
  Typography,
  MenuItem,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as BackendService from "../services/auth.services";

function NewDiario() {
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [score, setScore] = useState("Consulta");
  const [emoji, setEmoji] = useState("😊");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleScoreChange = (e) => setScore(e.target.value);
  const handleEmojiChange = (e) => setEmoji(e.target.value);

  const handleNewDiario = async (event) => {
    event.preventDefault();

    const diario = {
      date,
      title,
      description,
      score,
      emoji,
    };

    try {
      await BackendService.getNewDiario(diario);
      navigate("/diario");
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
      value: "😊",
      label: "😊",
    },
    {
      value: "😳",
      label: "😳",
    },
    {
      value: "🤦‍♀️",
      label: "🤦‍♀️",
    },
    {
      value: "🤕",
      label: "🤕",
    },
    {
      value: "🥰",
      label: "🥰",
    },
  ];

  return (
    <Box component="div" className="card">
      <Typography variant="h3" gutterBottom sx={{ marginTop: "4rem" }}>
        Nuevo diario
      </Typography>
      <Box component="form" onSubmit={handleNewDiario}>
        <TextField
          id="filled-size-normal"
          defaultValue="Normal"
          type="date"
          variant="filled"
          onChange={handleDateChange}
          value={date}
          color="success"
          sx={{
            backgroundColor: "#EDF5E0",
            width: "15rem",
            marginTop: "2rem",
            marginLeft: "8rem",
          }}
        />
        <TextField
          id="date"
          label="¿Qué ha pasado hoy?"
          variant="outlined"
          onChange={handleTitleChange}
          value={title}
          color="success"
          sx={{ backgroundColor: "#EDF5E0", width: "30rem", marginTop: "2rem" }}
        />
        <TextField
          id="description"
          label="Descripción"
          variant="outlined"
          multiline
          onChange={handleDescriptionChange}
          value={description}
          color="success"
          sx={{ backgroundColor: "#EDF5E0", width: "30rem" }}
        />
        <Box sx={{display: "flex"}}>
             <Card sx={{width: "10rem", backgroundColor: "#EDF5E0"}}>
          <Typography component="legend">Ranking del día</Typography>
          <Rating
            name="simple-controlled"
            value={score}
            onChange={handleScoreChange}
          />
        </Card>

        <TextField
          id="emoji"
          label="Emoji"
          select
          defaultValue="😊"
          variant="outlined"
          onChange={handleEmojiChange}
          value={emoji}
          color="success"
          sx={{ backgroundColor: "#EDF5E0", width: "10rem", marginLeft: "9rem" }}
        >
          {tipos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Box>
       
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
          Añadir
        </Button>
      </Box>
    </Box>
  );
}

export default NewDiario;
