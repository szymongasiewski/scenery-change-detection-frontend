import PropTypes from "prop-types";

const FileInput = ({ label, onChange, imagePreview }) => {
  return (
    <div className="bg-gray-200 flex flex-col p-6 justify-center items-center border-dashed border-2 border-gray-500 rounded-md text-center cursor-pointer hover:bg-gray-300 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-200">
      {!imagePreview ? (
        <>
          <input
            id={label}
            type="file"
            onChange={onChange}
            accept="image/*"
            className="hidden"
          />
          <label htmlFor={label} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mx-auto my-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="my-2 text-xl font-bold tracking-tight">
              Upload Picture
            </p>
            <p className="font-normal px-6">
              Shoud be in JPEG, JPG or PNG format.
            </p>
          </label>
        </>
      ) : (
        <>
          <input
            id={label}
            type="file"
            onChange={onChange}
            accept="image/*"
            className="hidden"
          />
          <label htmlFor={label}>
            <img className="max-h-72" src={imagePreview} alt="preview" />
          </label>
        </>
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
