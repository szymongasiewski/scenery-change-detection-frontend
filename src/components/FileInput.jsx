import PropTypes from "prop-types";

const FileInput = ({ label, onChange }) => {
  return (
    <div>
      <label className="item">{label}</label>
      <input
        className="item"
        type="file"
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
