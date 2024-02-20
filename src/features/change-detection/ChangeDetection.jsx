import ChangeDetectionForm from "../../components/ChangeDetectionForm";
import { useChangeDetectionMutation } from "./changeDetectionApiSlice";
import { useState } from "react";
import ResponseImage from "../../components/ResponseImage";
import { changeDetectionApiSlice } from "./changeDetectionApiSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";

const ChangeDetection = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [responseImage, setResponseImage] = useState(null);
  const [changeDetection, { isLoading }] = useChangeDetectionMutation();
  const dispatch = useDispatch();

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    setImage1Preview(URL.createObjectURL(file));
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    setImage2Preview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changeDetectionApiSlice.util.resetApiState());

    const formData = new FormData();
    formData.append("input_image1", image1);
    formData.append("input_image2", image2);

    try {
      const response = await changeDetection(formData).unwrap();
      setResponseImage("http://127.0.0.1:8000" + response.output_image.image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <ChangeDetectionForm
        onSubmit={handleSubmit}
        onImage1Change={handleImage1Change}
        image1Preview={image1Preview}
        onImage2Change={handleImage2Change}
        image2Preview={image2Preview}
      />
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      ) : responseImage ? (
        <ResponseImage imageUrl={responseImage} />
      ) : (
        <p>Resonse image</p>
      )}
    </div>
  );
};

export default ChangeDetection;
