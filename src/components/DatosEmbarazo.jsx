import { ClassNames } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./ImageCss.css"

function DatosEmbarazo(props) {
  const [showButton, setShowButton] = useState(props.showButton);

  const handleClickAddButton = () => {
    setShowButton(false);
  };

  const handleChangeValue = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginTop: "2rem", marginBottom: "1.5rem" }}
      >
      {props.name}
      </Typography>

      {showButton && !props.value && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickAddButton}
          sx={{backgroundColor: "#F8E3F1", color: "#B2D080", '&:hover': {backgroundColor: '#E8F3D8', color: "#B2D080"}, padding: "0.5rem 4rem 0.5rem 4rem"}}
        >
            +
        </Button>
      )}
      {(!showButton || props.value) && (
        <TextField
          color="success"
          id={props.id}
          type={props.type}
          variant="outlined"
          onChange={handleChangeValue}
          value={props.value}
          InputProps={ClassNames.inputText}
          sx={{backgroundColor: "#EDF5E0", borderColor: "#B2D080"}}
        />
      )}
    </Box>
  );
}

export default DatosEmbarazo;
