import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as BackendService from "../services/auth.services";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function Listas() {
  const [lista, setListas] = useState();

  const handleList = async () => {
    const listas = await BackendService.getListas();
    setListas(listas.data);
  };

  const handleDeleteList = async (id) => {
    await BackendService.getDeleteList(id)
    await handleList()
  }

 
  useEffect(() => {
    handleList();
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
        Mis listas
      </Typography>
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
        <Link to="/lista/newList" id="link">
          Nueva lista
        </Link>
      </Button>
      {lista &&
        lista.map((lista) => {
          return (
            <Link id="link" to={`/lista/${lista._id}`}>
              <Card
                sx={{
                  width: "70vw",
                  marginBottom: "1rem",
                  backgroundColor: "#F2F7E8",
                  color: "#C897B8",
                  "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
                }}
                variant="outlined"
              >
                <CardContent sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography sx={{ fontSize: 30}} gutterBottom>
                    {lista.title}
                  </Typography>
                  <Box>
                    <Tooltip title="Delete" sx={{color: "#F0C7E4"}}>
                    <IconButton onClick={((event) => {
                        event.preventDefault();
                        handleDeleteList(lista._id)
                    })}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  </Box>
                  
                </CardContent>
              </Card>
            </Link>
          );
        })}
        
    </Container>
  );
}

export default Listas;
