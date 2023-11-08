import PropTypes from "prop-types";

const ResponseImage = ({ imageUrl }) => {
  return (
    <div>
      <img className="item" src={imageUrl} alt="" />
    </div>
  );
};

ResponseImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ResponseImage;
