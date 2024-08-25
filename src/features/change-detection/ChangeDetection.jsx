import ChangeDetectionForm from "./ChangeDetectionForm";
import { useChangeDetectionMutation } from "./changeDetectionApiSlice";
import { useState, useRef, useEffect } from "react";
import ResponseImage from "../../components/ResponseImage";
import { changeDetectionApiSlice } from "./changeDetectionApiSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import useInput from "../../hooks/useInput";
import { Link } from "react-router-dom";

const MAX_IMAGE_SIZE = 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const ChangeDetection = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [algorithm, resetAlgorithm, algorithmAtribs] = useInput("");
  const [parameters, setParameters] = useState({});

  const handleParametersChange = (name, value) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const resetParameters = () => {
    setParameters({});
  };

  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  const [responseObject, setResponseObject] = useState(null);

  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const [changeDetection, { isLoading }] = useChangeDetectionMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage("");
  }, [image1, image2]);

  useEffect(() => {
    resetParameters();
  }, [algorithm]);

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        reject("Only JPEG, JPG and PNG images are allowed");
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > MAX_IMAGE_SIZE || img.height > MAX_IMAGE_SIZE) {
          reject(
            `Image size should not exceed ${MAX_IMAGE_SIZE}x${MAX_IMAGE_SIZE}`,
          );
        } else {
          resolve();
        }
      };
    });
  };

  const handleImage1Change = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await validateImage(file);
        setImage1(file);
        setImage1Preview(URL.createObjectURL(file));
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
        errorRef.current.focus();
      }
    }
  };

  const handleImage2Change = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await validateImage(file);
        setImage2(file);
        setImage2Preview(URL.createObjectURL(file));
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
        errorRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image1 === null || image2 === null) return;

    dispatch(changeDetectionApiSlice.util.resetApiState());

    const formData = new FormData();
    formData.append("input_image1", image1);
    formData.append("input_image2", image2);

    if (algorithm !== null && algorithm !== "") {
      formData.append("algorithm", algorithm);
    } else {
      setErrorMessage("Please select an algorithm");
      errorRef.current.focus();
      return;
    }

    const filteredParameters = Object.fromEntries(
      Object.entries(parameters).filter(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => value !== "" && value !== null,
      ),
    );

    formData.append("parameters", JSON.stringify(filteredParameters));

    setErrorMessage("");
    setResponseObject(null);

    try {
      const response = await changeDetection(formData).unwrap();

      resetAlgorithm();
      resetParameters();
      setResponseObject(response);
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 400) {
        setErrorMessage(() => {
          if (error?.data?.input_image1?.[0]) {
            return error?.data?.input_image1?.[0];
          } else if (error?.data?.input_image2?.[0]) {
            return error?.data?.input_image2?.[0];
          } else if (error?.data?.block_size?.[0]) {
            return error?.data?.block_size?.[0];
          } else if (error?.data?.morphological_operation?.[0]) {
            return error?.data?.morphological_operation?.[0];
          } else if (error?.data?.morphological_iterations?.[0]) {
            return error?.data?.morphological_iterations?.[0];
          } else {
            return "Something went wrong";
          }
        });
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6 mb-2">
        <p
          ref={errorRef}
          className={
            errorMessage
              ? "mt-6 block text-xl font-bold leading-6 text-red-700"
              : "hidden"
          }
          aria-live="asserive"
        >
          {errorMessage}
        </p>
      </div>
      <ChangeDetectionForm
        onSubmit={handleSubmit}
        onImage1Change={handleImage1Change}
        image1Preview={image1Preview}
        onImage2Change={handleImage2Change}
        image2Preview={image2Preview}
        algorithmAtribs={algorithmAtribs}
        onParametersChange={handleParametersChange}
      />
      <div className="flex flex-col justify-center items-center">
        <h3 className="mb-4 font-semibold">Response</h3>
        {responseObject && responseObject.id && (
          <Link
            className="font-semibold leading-6 text-gray-600 hover:text-gray-500 underline"
            to={`/requets-details/${responseObject.id}`}
          >
            Show details
          </Link>
        )}
        {isLoading ? (
          <>
            <Spinner />
            <p className="mt-4">Processing images...</p>
          </>
        ) : responseObject ? (
          <>
            {responseObject.percentage_of_change && (
              <p className="text-lg font-semibold">
                Percentage of change: {responseObject.percentage_of_change}%
              </p>
            )}
            {responseObject.request.output_images &&
              responseObject.request.output_images.map((imageObj, index) => (
                <ResponseImage key={index} imageUrl={imageObj.image} />
              ))}
          </>
        ) : (
          <div className="bg-gray-200 p-6 border-dashed border-2 rounded-md border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-36 h-36 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeDetection;
