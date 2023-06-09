import "@fontsource/roboto/300.css";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

function Home() {
  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <img src="/logo.png" alt="logoo" style= {{width: "34%"}}/>
      <Typography sx={{  width: "50vw",
              backgroundColor: "#F8E3F1",
              boxShadow: "2px 2px olive",
              padding: "1rem"}}>
        ¡Bienvenida a nuestra comunidad para embarazadas! Aquí encontrarás
        información, apoyo y recursos diseñados específicamente para acompañarte
        en esta maravillosa etapa de tu vida. Nuestro objetivo es brindarte el
        conocimiento y la tranquilidad que necesitas para disfrutar de un
        embarazo saludable y feliz. Únete a nosotras y comparte esta increíble
        experiencia con mujeres que comprenden y valoran cada momento especial.
        ¡Juntas, construiremos recuerdos inolvidables mientras esperamos la
        llegada de nuestros pequeños milagros!
      </Typography>
    </Container>
  );
}

export default Home;
