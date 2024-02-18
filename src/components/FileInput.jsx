import PropTypes from "prop-types";

const FileInput = ({ label, onChange, imagePreview }) => {
  return (
    <div>
      <label className="item">{label}</label>
      <input
        className="item"
        type="file"
        onChange={onChange}
        accept="image/*"
      />
      {imagePreview && (
        <img
          className="item"
          src={imagePreview}
          alt="preview"
          style={{ width: "200px" }}
        />
      )}
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
};

export default FileInput;
