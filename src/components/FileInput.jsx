import PropTypes from "prop-types";

const FileInput = ({ label, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="file" onChange={onChange} accept="image/*" />
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
