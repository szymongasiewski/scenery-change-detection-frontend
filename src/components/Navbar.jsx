import { useState } from "react";
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
  const [hidden, setHidden] = useState("hidden");

  const toggleMenu = () => {
    setHidden(hidden === "hidden" ? "" : "hidden");
  };

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
            <span className="px-3 hidden md:block">
              Scenery Change Detection
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              to="/"
            >
              Home
            </Link>
            {email ? (
              <>
                <Link
                  className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  to="/images"
                >
                  Detection
                </Link>
                <Link
                  className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  to="/history"
                >
                  History
                </Link>
                <Link
                  className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  to="/profile"
                >
                  {email}
                </Link>
                <button
                  className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  onClick={signOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  to="/signin"
                >
                  Sign in
                </Link>
                <Link
                  className="bg-slate-900 rounded-md py-2 px-3 shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  to="/signup"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="mobile-menu-button rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={hidden}>
        <div className="lg:hidden flex flex-col text-center">
          <Link
            className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            to="/"
          >
            Home
          </Link>
          {email ? (
            <>
              <Link
                className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                to="/images"
              >
                Detection
              </Link>
              <Link
                className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                to="/history"
              >
                History
              </Link>
              <Link
                className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                to="/profile"
              >
                {email}
              </Link>
              <button
                className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                onClick={signOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                to="/signin"
              >
                Sign in
              </Link>
              <Link
                className="mb-2 rounded-md py-2 px-3 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )}
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
