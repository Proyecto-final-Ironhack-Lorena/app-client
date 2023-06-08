import { Card, Rating, Typography, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as BackendService from "../services/auth.services";
import { Link } from "react-router-dom";
import "./everyPages.css";

function DatosDiario() {
  const [diarioId, setDiarioId] = useState("");
  const [ranking, setRanking] = useState(1);
  const params = useParams();

  const handleDate = (date) => {
    if (date) {
      return date.substring(0, date.indexOf("T"));
    }
  };

  useEffect(() => {
    const uniqueDiary = async () => {
      const diario = await BackendService.getDiarioId(params.id);
      setDiarioId(diario.data);
      setRanking(diario.data.score);
    };
    uniqueDiary();
  }, [params.id]);

  return (
    <Container>
      <Typography variant="h3" sx={{ marginTop: "7rem" }}>
        {diarioId && diarioId.title}
      </Typography>
      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
        {diarioId && handleDate(diarioId.date)}
      </Typography>
      <Card
        sx={{
          textAlign: "center",
          margin: "5rem 20rem 2rem 20rem",
          backgroundColor: "#F2F7E8",
          padding: "4rem",
          boxShadow: "5px 7px 7px #F8E3F1",
        }}
        aria-label="centered"
      >
        <Typography variant="p">{diarioId && diarioId.description}</Typography>

        <Box sx={{ display: "flex", marginTop: "2rem" }}>
          <Card
            sx={{
              width: "10rem",
              backgroundColor: "#F8E3F1",
              marginRight: "6rem",
            }}
          >
            <Typography component="legend" variant="h6">Ranking del día</Typography>
            <Rating
              name="read-only"
              value={ranking}
              readOnly
              sx={{textAlign: "center" }}
            />
          </Card>
          <Card sx={{backgroundColor: "#F8E3F1"}}>
            <Typography component="legend" variant="h6">Emoji del día</Typography>
            <Typography
              variant="h3"
              x={{
                backgroundColor: "#F8E3F1",
                width: "10rem",
              }}
            >
              {diarioId && diarioId.emoji}
            </Typography>
          </Card>
        </Box>
      </Card>

      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Link to="/diario" id="link">
          Volver
        </Link>
      </Button>
    </Container>
  );
}

export default DatosDiario;
