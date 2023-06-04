import { Button, TextField } from "@mui/material";
import { useState } from "react";

function DatosEmbarazo(props) {
  const [showButton, setShowButton] = useState(props.showButton);

  const handleClickAddButton = () => {
    setShowButton(false);
  };

  const handleChangeValue = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <h4>{props.name}</h4>
      {showButton && !props.value && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClickAddButton}
        >
            +
        </Button>
      )}
      {(!showButton || props.value) && (
        <TextField
          id={props.id}
          type={props.type}
          variant="outlined"
          onChange={handleChangeValue}
          value={props.value}
        />
      )}
    </div>
  );
}

export default DatosEmbarazo;
