import PropTypes from "prop-types";

const Logo = ({ size, imgPath, fontSize }) => {
  return (
    <div
      className="logo"
      style={fontSize && { fontSize: `${fontSize}px`, fontWeight: "bold" }}
    >
      <img src={imgPath} alt="logo" height={size} width={size} />
      Scenery Change Detection
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
};

export default Logo;
