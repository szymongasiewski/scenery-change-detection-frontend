import PropTypes from "prop-types";
import MorphologicalOperations from "./MorphologicalOperations";
import BoundingBoxes from "./BoundingBoxes";

const ImgDiffForm = ({ onParametersChange }) => {
  return (
    <div>
      <MorphologicalOperations onParametersChange={onParametersChange} />
      <BoundingBoxes onParametersChange={onParametersChange} />
    </div>
  );
};

ImgDiffForm.propTypes = {
  onParametersChange: PropTypes.func.isRequired,
};

export default ImgDiffForm;
