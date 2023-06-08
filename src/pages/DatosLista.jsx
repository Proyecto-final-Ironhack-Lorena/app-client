import { useEffect, useState } from "react";
import * as BackendService from "../services/auth.services";
import { useNavigate, useParams } from "react-router";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import NewListItem from "../components/NewListItem";

function DatosLista() {

    const [listaId, setListaId] = useState("")
    const [items, setItems] = useState();
  const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const params = useParams()

    const handleUpdateList = async (event) => {
      event.preventDefault();

    const list = {
      items
    };

    try {
      await BackendService.getUpdateList(params.id, list);
      navigate("/listas");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
    const handleNewListItemChange = (newItems) => {
      setItems(newItems);
    };

    useEffect(() => {
        const uniqueList = async () => {
            const list = await BackendService.getListasId(params.id)
            setListaId(list.data)
            setItems(list.data.items)
        }
        uniqueList()
    }, [params.id])
  return (
    <Container>
         <Typography variant="h3" sx={{ marginTop: "7rem" }}>
        {listaId && listaId.title}
      </Typography>
      <Box component="form" onSubmit={handleUpdateList}>
        <NewListItem initialItems={items} onChange={handleNewListItemChange} />
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
    </Container>
     
  )
}

export default DatosLista;