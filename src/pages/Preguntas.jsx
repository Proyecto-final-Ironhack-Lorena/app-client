import { Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as BackendService from "../services/auth.services";
import { useEffect, useState } from "react";

function Preguntas() {
  const [questions, setQuestions] = useState();

  const handleQuestions = async () => {
    const questions = await BackendService.getQuestions();
    setQuestions(questions.data);
  };

  useEffect(() => {
    handleQuestions();
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Preguntas y respuestas</h2>
      {questions && questions.map((question) => {
        return (
          <Link to={`/preguntas/${question._id}`}>
            <Card sx={{ width: 700 }} variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 30 }}
                  color="text.primary"
                  gutterBottom
                >
                  {question.title}
                </Typography>
                <Typography variant="body2">{question.description}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
}

export default Preguntas;
