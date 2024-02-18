import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useLogoutUserMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { changeDetectionApiSlice } from "../features/change-detection/changeDetectionApiSlice";
import Logo from "./Logo";

const logoSize = 40;
const imgPath = "logo-white.svg";

const Navbar = () => {
  const email = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const signOut = async () => {
    dispatch(logout());
    dispatch(changeDetectionApiSlice.util.resetApiState());
    await logoutUser();
    navigate("/");
  };

  return (
    <header>
      <Logo size={logoSize} imgPath={imgPath} />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/images">Images</Link>
        <Link to="/history">History</Link>
        {email ? (
          <>
            <Link to="/profile">{email}</Link>
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
