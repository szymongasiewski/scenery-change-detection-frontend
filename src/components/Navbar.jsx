import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useLogoutUserMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const email = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const signOut = async () => {
    dispatch(logout());
    await logoutUser();
    navigate("/");
  };

  return (
    <header>
      <h3 className="logo">Logo</h3>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/images">Images</Link>
        <Link to="/history">History</Link>
        {email ? (
          <>
            <a>{email}</a>
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
