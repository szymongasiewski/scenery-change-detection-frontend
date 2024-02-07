import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header>
      <h3 className="logo">Logo</h3>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/images">Images</Link>
        {user.userEmail ? (
          <>
            <a>{user.userEmail}</a>
            <a onClick={signOut}>Logout</a>
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
