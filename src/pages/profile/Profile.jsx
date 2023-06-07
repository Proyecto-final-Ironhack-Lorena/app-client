import { useEffect, useState } from "react";
import DatosEmbarazo from "../../components/DatosEmbarazo";
import ImageUploader from "../../components/ImageUploader";
import * as BackendService from "../../services/auth.services";
import {
  Box,
  Button,
  Card,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { toMonths } from "duration-fns";

function Profile() {
  const [weeksValue, setWeeksValue] = useState("");
  const [daysValue, setDaysValue] = useState("");
  const [babyNameValue, setBabyNameValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleWeeksChange = async (event) => {
    let value = event.target.value;
    if (value > 40) {
      value = 40;
    } else if (value < 0) {
      value = 0;
    }
    setWeeksValue(value);
    await BackendService.updatePerfil({ weekDays: `${value} ${daysValue}` });
  };

  const handleDaysChange = async (event) => {
    let value = event.target.value;
    if (value > 6) {
      value = 6;
    } else if (value < 0) {
      value = 0;
    }
    setDaysValue(value);
    await BackendService.updatePerfil({ weekDays: `${weeksValue} ${value}` });
  };

  const handleBabyNameValue = async (newValue) => {
    setBabyNameValue(newValue);
    await BackendService.updatePerfil({ babyName: newValue });
  };

  const handlegetUserData = async () => {
    const response = await BackendService.getUserData();
    setUserData(response.data);
    if (response.data.weekDays) {
      let values = response.data.weekDays.split(" ");
      setWeeksValue(values[0]);
      setDaysValue(values[1]);
    }
    setBabyNameValue(response.data.babyName);
  };

  const handleCalcularMeses = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#F2F7E8",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 20,
    p: 4,
    textAlign: "center",


  };

  useEffect(() => {
    handlegetUserData();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{ marginTop: "6rem" }}>
        {" "}
        Perfil{" "}
      </Typography>
      <Box>
        <ImageUploader />
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: "2rem", marginBottom: "1.5rem" }}
      >
        @{userData && userData.username}{" "}
      </Typography>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
        >
          Estoy de...
        </Typography>

        <TextField
          type="number"
          value={weeksValue}
          onChange={handleWeeksChange}
          sx={{
            maxWidth: "4rem",
            "& fieldset": {
              borderRightWidth: 0,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        ></TextField>
        <TextField
          type="text"
          value="semanas"
          disabled
          sx={{
            maxWidth: "6rem",
            "& fieldset": {
              borderLeftWidth: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              borderRightWidth: 0,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        ></TextField>
        <TextField
          type="number"
          value={daysValue}
          onChange={handleDaysChange}
          sx={{
            maxWidth: "4rem",
            "& fieldset": {
              borderLeftWidth: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              borderRightWidth: 0,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        ></TextField>
        <TextField
          type="text"
          value="días"
          disabled
          sx={{
            maxWidth: "6rem",
            "& fieldset": {
              borderLeftWidth: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            },
          }}
        ></TextField>
        <br/>  
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCalcularMeses}
          disabled={!weeksValue}
          sx={{backgroundColor: "#F8E3F1", color: "#B2D080", '&:hover': {backgroundColor: '#E8F3D8', color: "#B2D080"}, alignItems: "center", marginTop: "2rem" }}
        >
            ¿De cuántos meses estoy?
        </Button>      
        <DatosEmbarazo
          id="babyName"
          type="text"
          name="Nombre del bebé"
          onChange={handleBabyNameValue}
          value={babyNameValue}
          showButton={babyNameValue === "" || babyNameValue === undefined}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: "#C897B8"}}>
            Estás de{" "}
            {Math.floor(
              toMonths({ weeks: Number(weeksValue), days: Number(daysValue) })
            )}{" "}
            meses
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default Profile;
