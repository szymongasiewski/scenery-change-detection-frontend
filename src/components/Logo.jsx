import PropTypes from "prop-types";

const Logo = ({ imgPath, styles }) => {
  return <img className={styles} src={imgPath} alt="logo" />;
};

Logo.propTypes = {
  imgPath: PropTypes.string.isRequired,
  styles: PropTypes.string,
};

export default Logo;
