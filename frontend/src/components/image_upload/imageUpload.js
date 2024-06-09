import React, { useState } from "react";
import "./imageUpload.css"; // Import your CSS file
import img2 from "./images/image1.jpg";

function ImageUpload(props) {
  const { selectedImage, setSelectedImage } = props;

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      const btn1 = (document.getElementById("btn1").style.display = "none");
    }
  };

  // Function to handle image deletion
  const handleImageDelete = () => {
    setSelectedImage(null);
    const btn1 = (document.getElementById("btn1").style.display = "inline");
  };

  return (
    <div className="container-fluid mt-5  p-0">
      <div className="row">
        <div className="col-md-9 offset-md-3 m-5">
          <h2>Image Upload</h2>
          <br></br>
          <label className="cursor" id="btn1">
            <img src={img2} alt="Selected" className="img-thumbnail mb-3" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mb-3 choose-file"
            />
          </label>
          <div className="conatiner mt-5">
            <div className="container">
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="img-thumbnail mb-3"
                  />
                  <button
                    className="btn btn-danger"
                    id="btn24"
                    onClick={handleImageDelete}
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
