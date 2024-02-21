import PropTypes from "prop-types";

const ResponseImage = ({ imageUrl }) => {
  return (
    <div className="bg-gray-200 m-6 p-6 border-dashed border-2 rounded-md border-gray-500">
      <img className="max-w-full" src={imageUrl} alt="response" />
    </div>
  );
};

ResponseImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ResponseImage;
