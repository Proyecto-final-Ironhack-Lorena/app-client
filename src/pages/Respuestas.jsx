import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as BackendService from "../services/auth.services";
import "./everyPages.css";

function Respuestas() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const params = useParams();

  useEffect(() => {
    const uniqueQuestion = async () => {
      const answers = await BackendService.getAnswers(params.id);
      setQuestion(answers.data[0].question);
      setAnswers(answers.data);
    };
    uniqueQuestion();
  }, [params.id]);

  return (
    <div>
      <Typography variant="h3" sx={{ marginTop: "7rem" }}>
        {question && question.title}
      </Typography>
      <Card
        sx={{
          textAlign: "center",
          margin: "5rem 20rem 2rem 20rem",
          backgroundColor: "#F2F7E8",
          padding: "4rem",
          boxShadow: "5px 7px 7px #F8E3F1"
        }}
        aria-label="centered"
      >
        <Typography variant="p">{question && question.description}</Typography>
      </Card>
      <br />
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Link to={`/preguntas/${params.id}/newAnswer`} id="link">
          Añadir respuesta
        </Link>
      </Button>
      {answers && answers[0]._id && (
        <Typography variant="h4">Respuestas</Typography>
      )}

        <Box component="div" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: "2rem" }}>
      {answers &&
        answers[0]._id &&
        answers.map((answer) => {
          return (
            <Card
              sx={{ width: 600, marginBottom: "1rem", backgroundColor: "#F2F7E8", boxShadow: "5px 7px 7px #F8E3F1"}}
              variant="outlined"
            >
              <CardContent>
                <Typography variant="body2">{answer.description} </Typography>
              </CardContent>
            </Card>
          );
        })}
        </Box>
    </div>
  );
}

export default Respuestas;
