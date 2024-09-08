import ImgDiffForm from "./ImgDiffForm";
import PropTypes from "prop-types";

const BgSubForm = ({ onParametersChange }) => {
  return <ImgDiffForm onParametersChange={onParametersChange} />;
};

BgSubForm.propTypes = {
  onParametersChange: PropTypes.func.isRequired,
};

export default BgSubForm;
