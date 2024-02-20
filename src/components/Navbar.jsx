import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useLogoutUserMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { changeDetectionApiSlice } from "../features/change-detection/changeDetectionApiSlice";
import Logo from "./Logo";

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
    <nav className="bg-gray-600 text-white">
      <div className="px-8 mx-auto">
        <div className="flex justify-between">
          <Link to="/" className="flex items-center">
            <Logo styles="mx-auto h-16 w-auto py-5" imgPath={imgPath} />
            <span className="px-3">Scenery Change Detection</span>
          </Link>
          <div className="flex items-center space-x-5">
            <Link to="/">Home</Link>
            {email ? (
              <>
                <Link to="/images">Change Detection</Link>
                <Link to="/history">History</Link>
                <Link to="/profile">{email}</Link>
                <a onClick={signOut}>Logout</a>
              </>
            ) : (
              <>
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    // <header className="n-header">
    //   <Link to="/" className="flex items-center">
    //     <Logo styles="mx-auto h-20 w-auto py-6 px-6" imgPath={imgPath} />
    //     Scenery Change Detection
    //   </Link>
    //   <nav>
    //     <Link to="/">Home</Link>
    //     {email ? (
    //       <>
    //         <Link to="/images">Change Detection</Link>
    //         <Link to="/history">History</Link>
    //         <Link to="/profile">{email}</Link>
    //         <a onClick={signOut}>Logout</a>
    //       </>
    //     ) : (
    //       <>
    //         <Link to="/signin">Sign in</Link>
    //         <Link to="/signup">Sign up</Link>
    //       </>
    //     )}
    //   </nav>
    // </header>
  );
};

export default Navbar;
