import { useEffect, useState } from "react";
import DatosEmbarazo from "../../components/DatosEmbarazo";
import ImageUploader from "../../components/ImageUploader";
import * as BackendService from "../../services/auth.services";
import { Container } from "@mui/material";


function Profile() {

    const [weekDaysValue, setWeekDaysValue] = useState("");
    const [babyNameValue, setBabyNameValue] = useState("");
    const [userData, setUserData] = useState(null);

    const handleWeekDaysValue = async (newValue) => {
        setWeekDaysValue(newValue);
        await BackendService.updatePerfil({weekDays: newValue})
        //TODO::::::::::::::::::::::::::

    }

    const handleBabyNameValue = async (newValue) => {
        setBabyNameValue(newValue)
        await BackendService.updatePerfil({babyName: newValue})
    }

    const handlegetUserData = async () => {
        const response = await BackendService.getUserData()
        setUserData(response.data);
        setWeekDaysValue(response.data.weekDays)
        setBabyNameValue(response.data.babyName)
      }
    

    useEffect(() => {
        handlegetUserData()
    }, []);

  return (
    <Container>
      <h3>Perfil</h3>
      <div>
        <ImageUploader />
      </div>
      <h4>{userData && userData.username}</h4>
      <div>
        <DatosEmbarazo id="weekDays" type="text"  name="Semanas de embarazo" onChange={handleWeekDaysValue} value={weekDaysValue} showButton={weekDaysValue === ""}/>
        <DatosEmbarazo id="babyName" type="text"  name="Nombre del bebé" onChange={handleBabyNameValue} value={babyNameValue} showButton={babyNameValue === ""}/>
      </div>
    </Container>
  );
}

export default Profile;
