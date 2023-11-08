import { useState } from "react";
import axios from "axios";
import ImageUploadForm from "../components/ImageUploadForm";
import ResponseImage from "../components/ResponseImage";

const Images = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [responseImage, setResponseImage] = useState(null);

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResponseImage("http://127.0.0.1:8000" + response.data.processed_image);
      console.log(response.data.processed_image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <ImageUploadForm
        onSubmit={handleSubmit}
        onImage1Change={handleImage1Change}
        onImage2Change={handleImage2Change}
      />
      {responseImage && <ResponseImage imageUrl={responseImage} />}
    </div>
  );
};

export default Images;
