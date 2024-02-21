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
    <div className="mt-5">
      <form className="flex flex-col " onSubmit={onSubmit}>
        <div className="md:flex space-y-6 md:space-y-0 md:space-x-6 p-6">
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
        </div>
        <div className="mb-5 flex justify-center">
          <button
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            type="submit"
          >
            Submit
          </button>
        </div>
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
