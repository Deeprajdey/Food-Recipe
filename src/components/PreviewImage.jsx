import React from "react";
import "./PreviewImage.css";
const PreviewImage = ({ src, handleDeleteImage, className = "" }) => {
  return (
    <div style={{ position: "relative" }} className={className}>
      <div className="cross" onClick={handleDeleteImage}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <img src={src} alt="image" className="preview-image" />
    </div>
  );
};

export default PreviewImage;
