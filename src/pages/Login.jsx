import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
//import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Login = () => {
  //let { loginUser } = useContext(AuthContext);
  const { setUser } = useAuth();

  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "login/",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const accessToken = response?.data?.access_token;
      // const refreshToken = response?.data?.refresh_token;
      const userEmail = response?.data?.email;
      setUser({ userEmail, accessToken /*, refreshToken*/ });
      setEmail("");
      setPassword("");

      if (response.status === 200) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Server is not responding");
      } else if (error?.response?.status === 401) {
        setErrorMessage("Invalid email or password");
      } else if (error?.response?.status === 400) {
        setErrorMessage("Fields cannot be empty");
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className="container">
      <div>
        <h1>LOGO</h1>
      </div>
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
          {" "}
          {/* onSubmit={loginUser}> */}
          <label htmlFor="email">Email:</label>
          <input
            className="item"
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            placeholder="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="item"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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

export default Login;
