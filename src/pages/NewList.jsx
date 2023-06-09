import { useState } from "react";
import * as BackendService from "../services/auth.services";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import NewListItem from "../components/NewListItem";

function NewList() {
  const [title, setTitle] = useState();
  const [items, setItems] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleNewListItemChange = (newItems) => {
    setItems(newItems);
  };

  const handleNewList = async (event) => {
    event.preventDefault();

    const list = {
      title,
      items,
    };

    try {
      await BackendService.getNewList(list);
      navigate("/listas");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <Box component="div" className="card">
      <Typography variant="h3" gutterBottom sx={{ marginTop: "4rem" }}>
        Nueva Lista
      </Typography>
      <TextField
        id="title"
        label="Título de la nueva lista..."
        variant="outlined"
        onChange={handleTitleChange}
        value={title}
        color="success"
        sx={{ backgroundColor: "#EDF5E0", width: "30rem", marginTop: "2rem" }}
      />
      <Box component="form" onSubmit={handleNewList}>
        <NewListItem initialItems={[]} onChange={handleNewListItemChange} />
        <Box>
           <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{
            backgroundColor: "#F8E3F1",
            color: "#B2D080",
            "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
            alignItems: "center",
            width: "15rem",
            marginBottom: "5rem"
          }}
        >
          Guardar lista
        </Button>
        </Box>
       
      </Box>
    </Box>
  );
}

export default NewList;
