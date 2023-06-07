import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as BackendService from "../services/auth.services";

import "./ImageCss.css";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef();

  const handleImageChange = async (event) => {
    console.log("object");
    const file = event.target.files[0];
    if (file) {
      const newImage = await encodeImg(file);
      setSelectedImage(newImage);
      await BackendService.updatePerfil({ image: newImage });
    }
  };

  const handlegetUserData = async () => {
    const response = await BackendService.getUserData();
    setSelectedImage(response.data.image);
  };

  useEffect(() => {
    handlegetUserData();
  }, []);

  const handleClickButon = () => {
    inputRef.current.click();
  };

  const encodeImg = (img) => {
    return new Promise((exito, fallo) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        exito(fileReader.result);
      };
    });
  };

  return (
    <Button
      color="secondary"
      id="buttImage"
      sx={{
        backgroundColor: "#F8E3F1",
        color: "#B2D080",
        "&:hover": { backgroundColor: "#E8F3D8", color: "#B2D080" },
      }}
      variant="contained"
      onClick={handleClickButon}
    >
      {!selectedImage && "Añadir foto"}
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          style={{ height: "100px", width: "100px" }}
        />
      )}
    </Button>
  );
};

export default ImageUploader;
