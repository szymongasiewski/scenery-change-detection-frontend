import { useEffect } from "react";
import useInput from "../../hooks/useInput";
import MorphologicalOperations from "./MorphologicalOperations";
import PropTypes from "prop-types";
import BoundingBoxes from "./BoundingBoxes";

const PCAkMeansForm = ({ onParametersChange }) => {
  const [blockSize, , blockSizeAtribs] = useInput("");

  useEffect(() => {
    onParametersChange("blockSize", blockSize);
  }, [blockSize, onParametersChange]);

  return (
    <div>
      <div className="flex flex-col justify-cemnter items-center py-2">
        <label
          className="text-sm font-medium leading-6 text-gray-900"
          htmlFor="blocksize"
        >
          Block Size
        </label>
        <input
          className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          id="blocksize"
          name="blocksize"
          placeholder="Provide block size (2-5)"
          type="number"
          max={5}
          min={2}
          {...blockSizeAtribs}
        />
      </div>
      <MorphologicalOperations onParametersChange={onParametersChange} />
      <BoundingBoxes onParametersChange={onParametersChange} />
    </div>
  );
};

PCAkMeansForm.propTypes = {
  onParametersChange: PropTypes.func.isRequired,
};

export default PCAkMeansForm;
