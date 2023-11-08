import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <header>
      <h3 className="logo">Logo</h3>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/images">Images</Link>
        {user ? (
          <>
            <a>{user.email}</a>
            <a onClick={logoutUser}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
