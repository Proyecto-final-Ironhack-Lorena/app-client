import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import * as BackendService from "../services/auth.services";
import { useEffect, useState } from "react";
import "./everyPages.css"

function Preguntas() {
  const [questions, setQuestions] = useState();

  const handleQuestions = async () => {
    const questions = await BackendService.getQuestions();
    setQuestions(questions.data);
  };

  const handleSearch = async (event) => {
    if(event.target.value !== "") {
      const response = await BackendService.getSearch(event.target.value)
       setQuestions(response.data);
    } else {
      await handleQuestions()
    }
     
  }


  useEffect(() => {
    handleQuestions();
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        Preguntas frecuentes
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
          alignItems: "center",
          marginBottom: "2rem"
        }}
      >
        <Link to="/preguntas/newQuestion" id="link">Hacer una pregunta</Link>
      </Button>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', flexDirection: "row", alignItems: 'center', width: 400,  backgroundColor: "#bace9c", marginBottom: "2rem" }}
    >
      <InputBase
        sx={{paddingRight: "10rem"}}
        placeholder="Buscar pregunta..."
        onChange={handleSearch}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider orientation="horizontal"  />
    </Paper>
      {questions &&
        questions.map((question) => {
          return (
            <Link id="link" to={`/preguntas/${question._id}`}>
              <Card sx={{ width: "70vw", marginBottom: "1rem", backgroundColor: "#F2F7E8", color: "#C897B8", '&:hover': {backgroundColor: '#E8F3D8', color: "#B2D080"}}} variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    gutterBottom
                  >
                    {question.title}
                  </Typography>
                  <Typography variant="body2" sx={{color: "#000"}}>
                    {question.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
    </Container>
  );
}

export default Preguntas;
