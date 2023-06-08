import { Typography, Button, Card, CardContent } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import * as BackendService from "../services/auth.services";
import { Link } from "react-router-dom";



function Diario() {
    const [diario, setDiario] = useState("")

    const handleDiario = async () => {
      const diarios = await BackendService.getDiarios()
      setDiario(diarios.data)
    }

    const handleDate = (date) => {
      if(date) {
        return date.substring(0,date.indexOf("T"))
      }
    }

    useEffect(() => {
        handleDiario();
      }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ marginTop: "2rem", marginBottom: "2rem"}}
      >
        Mi diario 
      </Typography>
    
    <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080"},
          alignItems: "center",
          marginBottom: "2rem"
        }}
      >
        <Link to="/diario/newDiario" id="link">Nueva entrada!</Link>
      </Button>
      {diario &&
        diario.map((diario) => {
          return (
            <Link id="link" to={`/diario/${diario._id}`}>
              <Card sx={{width: "70vw", marginBottom: "1rem", backgroundColor: "#F2F7E8", color: "#C897B8", '&:hover': {backgroundColor: '#E8F3D8', color: "#B2D080"}}} variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    gutterBottom
                  >
                    {handleDate(diario.date)}
                  </Typography>
                  <Typography variant="body2" sx={{color: "#000"}}>
                    {diario.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
  </Container>
  )
}

export default Diario;