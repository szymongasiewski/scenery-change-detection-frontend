import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import MorphologicalOperations from "./MorphologicalOperations";
import PropTypes from "prop-types";
import BoundingBoxes from "./BoundingBoxes";

const PCAkMeansForm = ({ onParametersChange }) => {
  const [blockSize, , blockSizeAtribs] = useInput("");
  const [blockSizeError, setBlockSizeError] = useState("");

  useEffect(() => {
    const parsedBlockSize = parseInt(blockSize, 10);
    if (!isNaN(parsedBlockSize)) {
      onParametersChange("block_size", parsedBlockSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockSize]);

  useEffect(() => {
    const parsedBlockSize = parseInt(blockSize, 10);
    if (
      blockSize !== "" &&
      (isNaN(parsedBlockSize) || parsedBlockSize < 2 || parsedBlockSize > 5)
    ) {
      setBlockSizeError("Block size should be between 2 and 5");
    } else {
      setBlockSizeError("");
    }
  }, [blockSize]);

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
        {blockSizeError ? (
          <p className="text-red-500 text-sm">{blockSizeError}</p>
        ) : null}
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
