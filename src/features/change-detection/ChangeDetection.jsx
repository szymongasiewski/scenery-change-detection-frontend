import ChangeDetectionForm from "./ChangeDetectionForm";
import { useChangeDetectionMutation } from "./changeDetectionApiSlice";
import { useState, useRef, useEffect } from "react";
import ResponseImage from "../../components/ResponseImage";
import { changeDetectionApiSlice } from "./changeDetectionApiSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import useInput from "../../hooks/useInput";

const MAX_IMAGE_SIZE = 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const validOperations = ["dilate", "erode", "opening", "closing"];

const ChangeDetection = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [algorithm, resetAlgorithm, algorithmAtribs] = useInput("");
  const [parameters, resetParameters, parametersAtribs] = useInput("");

  //delete the following lines
  const [blockSize, resetBlockSize, blockSizeAtribs] = useInput("");
  const [
    numberOfIterations,
    resetNumberOfIterations,
    numberOfIterationsAtribs,
  ] = useInput("");
  const [
    morphologicalOperation,
    resetMorphologicalOperation,
    morphologicalOperationAtribs,
  ] = useInput("");
  //delete the above lines

  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  //replece the following lines with response object
  const [responseImage, setResponseImage] = useState(null);
  const [percentageOfChange, setPercentageOfChange] = useState(null);
  //replace the above lines with response object

  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const [changeDetection, { isLoading }] = useChangeDetectionMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage("");
  }, [image1, image2]);

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
    if (blockSize !== null && blockSize >= 2 && blockSize <= 5) {
      formData.append("block_size", blockSize);
    }
    if (
      morphologicalOperation !== null &&
      validOperations.includes(morphologicalOperation)
    ) {
      formData.append("morphological_operation", morphologicalOperation);
    }
    if (
      numberOfIterations !== null &&
      numberOfIterations >= 1 &&
      numberOfIterations <= 3
    ) {
      formData.append("morphological_iterations", numberOfIterations);
    }
    setResponseImage(null);
    setErrorMessage("");

    try {
      const response = await changeDetection(formData).unwrap();
      setResponseImage(response.output_image.image);
      setPercentageOfChange(response.percentage_of_change);
      resetBlockSize();
      resetMorphologicalOperation();
      resetNumberOfIterations();
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
        //delete the following lines
        blockSizeAtribs={blockSizeAtribs}
        morphologicalOperationsAtribs={morphologicalOperationAtribs}
        numberOfIterationsAtribs={numberOfIterationsAtribs}
        //delete the above lines
        algorithmAtribs={algorithmAtribs}
        parametersAtribs={parametersAtribs}
      />
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <h3 className="mb-4 font-semibold">Response Image</h3>
          <Spinner />
          <p className="mt-4">Processing images...</p>
        </div>
      ) : responseImage ? (
        <div className="flex flex-col justify-center items-center">
          <h3 className="mb-4 font-semibold">Response Image</h3>
          <p className="mb-4 font-semibold">
            Percentage of change: {percentageOfChange.toFixed(2)}%
          </p>
          <ResponseImage imageUrl={responseImage} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h3 className="mb-4 font-semibold">Response Image</h3>
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
        </div>
      )}
    </div>
  );
};

export default ChangeDetection;
