import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";

const operationOptions = [
  { value: "dilate", label: "Dilation" },
  { value: "erode", label: "Erosion" },
  { value: "opening", label: "Opening" },
  { value: "closing", label: "Closing" },
];

const shapeOptions = [
  { value: "ellipse", label: "Ellipse" },
  { value: "rect", label: "Rectangle" },
  { value: "cross", label: "Cross" },
];

const MorphologicalOperations = ({ onParametersChange }) => {
  const [morphologicalOperation, , morphologicalOperationAtribs] = useInput("");
  const [numberOfIterations, , numberOfIterationsAtribs] = useInput("");
  const [kernelShape, , kernelShapeAtribs] = useInput("");
  const [kernelSize, , kernelSizeAtribs] = useInput("");

  const [numberOfIterationsError, setNumberOfIterationsError] = useState("");
  const [kernelSizeError, setKernelSizeError] = useState("");

  useEffect(() => {
    onParametersChange("morphological_operation", morphologicalOperation);
  }, [morphologicalOperation]);

  useEffect(() => {
    onParametersChange("morphological_iterations", numberOfIterations);
  }, [numberOfIterations]);

  useEffect(() => {
    onParametersChange("kernel_shape", kernelShape);
  }, [kernelShape]);

  useEffect(() => {
    onParametersChange("kernel_size", kernelSize);
  }, [kernelSize]);

  useEffect(() => {
    if (
      numberOfIterations !== "" &&
      (numberOfIterations < 1 || numberOfIterations > 3)
    ) {
      setNumberOfIterationsError(
        "Number of iterations should be between 1 and 3",
      );
    } else {
      setNumberOfIterationsError("");
    }
  }, [numberOfIterations]);

  useEffect(() => {
    if (kernelSize !== "" && (kernelSize < 3 || kernelSize > 5)) {
      setKernelSizeError("Kernel size should be between 3 and 5");
    } else {
      setKernelSizeError("");
    }
  }, [kernelSize]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-2">
        <label
          className="text-sm font-medium leading-6 text-gray-900"
          htmlFor="morphologicaloperation"
        >
          Select Morphological Operation
        </label>
        <select
          className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          id="morphologicaloperation"
          name="morphologicaloperation"
          {...morphologicalOperationAtribs}
        >
          <option value={""}>None</option>
          {operationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {morphologicalOperation !== null && morphologicalOperation !== "" ? (
        <>
          <div className="flex flex-col justify-center items-center py-2">
            <label
              className="text-sm font-medium leading-6 text-gray-900"
              htmlFor="iterations"
            >
              Number of iterations
            </label>
            <input
              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              id="iterations"
              name="iterations"
              placeholder="Provide number of iterations (1-3)"
              type="number"
              max={3}
              min={1}
              {...numberOfIterationsAtribs}
            />
            {numberOfIterationsError ? (
              <p className="text-red-500 text-sm">{numberOfIterationsError}</p>
            ) : null}
          </div>
          <div className="flex flex-col justify-center items-center py-2">
            <label
              className="text-sm font-medium leading-6 text-gray-900"
              htmlFor="kernelshape"
            >
              Select Kernel Shape
            </label>
            <select
              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              id="kernelshape"
              name="kernelshape"
              {...kernelShapeAtribs}
            >
              <option value={""}>None</option>
              {shapeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {kernelShape !== null && kernelShape !== "" ? (
            <div className="flex flex-col justify-center items-center py-2">
              <label
                className="text-sm font-medium leading-6 text-gray-900"
                htmlFor="kernelsize"
              >
                Provide Kernel Size
              </label>
              <input
                className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                id="kernelsize"
                name="kernelsize"
                placeholder="Provide kernel size (3-5)"
                type="number"
                min={3}
                max={5}
                {...kernelSizeAtribs}
              />
              {kernelSizeError ? (
                <p className="text-red-500 text-sm">{kernelSizeError}</p>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

MorphologicalOperations.propTypes = {
  onParametersChange: PropTypes.func.isRequired,
};

export default MorphologicalOperations;
