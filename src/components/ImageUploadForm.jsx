import FileInput from "./FileInput";
import PropTypes from "prop-types";

const ImageUploadForm = ({ onSubmit, onImage1Change, onImage2Change }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <FileInput label="Image 1" onChange={onImage1Change} />
        <FileInput label="Image 2" onChange={onImage2Change} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

ImageUploadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onImage1Change: PropTypes.func.isRequired,
  onImage2Change: PropTypes.func.isRequired,
};

export default ImageUploadForm;
