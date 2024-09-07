import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import PropTypes from "prop-types";

const MAX_SIZE = 1024 * 1024;

const BoundingBoxes = ({ onParametersChange }) => {
  const [lowerLimit, , lowerLimitAtribs] = useInput("");
  const [upperLimit, , upperLimitAtribs] = useInput("");

  const [lowerLimitError, setLowerLimitError] = useState("");
  const [upperLimitError, setUpperLimitError] = useState("");

  useEffect(() => {
    const parsedLowerLimit = parseInt(lowerLimit, 10);
    if (!isNaN(parsedLowerLimit)) {
      onParametersChange("area_lower_limit", parsedLowerLimit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowerLimit]);

  useEffect(() => {
    const parsedUpperLimit = parseInt(upperLimit, 10);
    if (!isNaN(parsedUpperLimit)) {
      onParametersChange("area_upper_limit", parsedUpperLimit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upperLimit]);

  useEffect(() => {
    const parsedLowerLimit = parseInt(lowerLimit, 10);
    if (
      lowerLimit !== "" &&
      (isNaN(parsedLowerLimit) ||
        parsedLowerLimit < 1 ||
        parsedLowerLimit > MAX_SIZE)
    ) {
      setLowerLimitError(`Lower limit should be between 1 and ${MAX_SIZE}`);
    } else {
      setLowerLimitError("");
    }
  }, [lowerLimit]);

  useEffect(() => {
    const parsedUpperLimit = parseInt(upperLimit, 10);
    if (
      upperLimit !== "" &&
      (isNaN(parsedUpperLimit) ||
        parsedUpperLimit < 1 ||
        parsedUpperLimit > MAX_SIZE)
    ) {
      setUpperLimitError(`Upper limit should be between 1 and ${MAX_SIZE}`);
    } else {
      setUpperLimitError("");
    }
  }, [upperLimit]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-2">
        <span className="text-sm font-medium leading-6 text-gray-900">
          Bounding Boxes
        </span>
        <div className="flex py-2">
          <div className="flex flex-col justify-center items-center px-2">
            <label
              className="text-sm font-medium leading-6 text-gray-900"
              htmlFor="lowerlimit"
            >
              Area lower limit
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              id="lowerlimit"
              name="lowerlimit"
              placeholder="Lower limit"
              type="number"
              min={1}
              {...lowerLimitAtribs}
            />
          </div>
          <div className="flex flex-col justify-center items-center px-2">
            <label
              className="text-sm font-medium leading-6 text-gray-900"
              htmlFor="upperlimit"
            >
              Area upper limit
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              id="upperlimit"
              name="upperlimit"
              placeholder="Upper limit"
              type="number"
              min={1}
              {...upperLimitAtribs}
            />
          </div>
        </div>
        {lowerLimitError ? (
          <p className="text-red-500 text-sm">{lowerLimitError}</p>
        ) : null}
        {upperLimitError ? (
          <p className="text-red-500 text-sm">{upperLimitError}</p>
        ) : null}
      </div>
    </div>
  );
};

BoundingBoxes.propTypes = {
  onParametersChange: PropTypes.func.isRequired,
};

export default BoundingBoxes;
