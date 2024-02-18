import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setUser, setToken } from "./authSlice";
import useInput from "../../hooks/useInput";

const LoginForm = () => {
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, resetEmail, emailAttribs] = useInput("");
  const [password, resetPassword, passwordAttribs] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUser(response.email));
      dispatch(setToken(response.access_token));
      resetEmail();
      resetPassword();

      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 401) {
        setErrorMessage("Invalid email or password");
      } else if (error?.status === 400) {
        setErrorMessage("Fields cannot be empty");
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <div className="container cointainer-border-shadow">
        <p
          ref={errorRef}
          className={errorMessage ? "error" : "offscreen"}
          aria-live="asserive"
        >
          {errorMessage}
        </p>
        <h1>Sign In</h1>
        <form className="container" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="item"
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            placeholder="email"
            autoComplete="off"
            {...emailAttribs}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="item"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            {...passwordAttribs}
            required
          />
          <button className="item" type="submit">
            Sign In
          </button>
          <p>
            Do not have an account? &nbsp;
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
          <span>
            <Link to="/">Back to Home page</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
