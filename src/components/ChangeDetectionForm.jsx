import PropTypes from "prop-types";
import FileInput from "./FileInput";

const ChangeDetectionForm = ({
  onSubmit,
  onImage1Change,
  image1Preview,
  onImage2Change,
  image2Preview,
}) => {
  return (
    <div>
      <form className="container" onSubmit={onSubmit}>
        <FileInput
          label="Image 1"
          onChange={onImage1Change}
          imagePreview={image1Preview}
        />
        <FileInput
          label="Image 2"
          onChange={onImage2Change}
          imagePreview={image2Preview}
        />
        <button className="item" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

ChangeDetectionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onImage1Change: PropTypes.func.isRequired,
  image1Preview: PropTypes.string,
  onImage2Change: PropTypes.func.isRequired,
  image2Preview: PropTypes.string,
};

export default ChangeDetectionForm;
