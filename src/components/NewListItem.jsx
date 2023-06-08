import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function NewListItem({ initialItems, onChange }) {
  const [items, setItems] = useState(initialItems);

  const handleNewItem = () => {
    setItems((previous) => {
      if (!previous) {
        previous = [];
      }
      return [...previous, ""];
    });
  };

  const handleItemsChanged = (value, index) => {
    setItems((previous) => {
      let newArr = [...previous];
      newArr.splice(index, 1, value);
      onChange(newArr);
      return newArr;
    });
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {items &&
          items.length > 0 &&
          items.map((eachItem, index) => {
            return (
              <Box>
                <TextField
                  id="item"
                  variant="outlined"
                  onChange={(event) =>
                    handleItemsChanged(event.target.value, index)
                  }
                  value={eachItem}
                  color="success"
                  sx={{
                    backgroundColor: "#EDF5E0",
                    width: "30rem",
                    marginTop: "2rem",
                    marginRigth: "2rem",
                  }}
                />
              </Box>
            );
          })}
      </Box>
      {(!items || items.length === 0) &&
        initialItems &&
        initialItems.length > 0 &&
        initialItems.map((eachItem, index) => {
          return (
            <TextField
              id="item"
              label="Items"
              variant="outlined"
              onChange={(event) =>
                handleItemsChanged(event.target.value, index)
              }
              value={eachItem}
              color="success"
              sx={{ backgroundColor: "#EDF5E0", width: "30rem" }}
            />
          );
        }) &&
        setItems(initialItems)}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleNewItem}
        sx={{
          backgroundColor: "#F8E3F1",
          color: "#B2D080",
          "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
          alignItems: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        Añadir item
      </Button>
    </Box>
  );
}

export default NewListItem;
