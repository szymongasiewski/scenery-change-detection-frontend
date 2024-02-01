import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../utils/regexPatterns";

const Register = () => {
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_PATTERN.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_PATTERN.test(password);
    setValidPassword(result);
    const confirmResult = password === confirmPassword;
    setValidConfirmPassword(confirmResult);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_PATTERN.test(email);
    const v2 = PASSWORD_PATTERN.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    try {
      const response = await axios.post(
        "register/",
        {
          email: email,
          password: password,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setErrorMessage("");
      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Network error.");
      } else if (error.response?.status === 400) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Registration failed.");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className="container">
      <div className="container cointainer-border">
        <p
          ref={errorRef}
          className={errorMessage ? "error" : "offscreen"}
          aria-live="asserive"
        >
          {errorMessage}
        </p>
        <h1>Sign Up</h1>
        <form className="container" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="item"
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={emailFocus && email && !validEmail ? "show" : "hide"}
          >
            Please enter a valid email address.
          </p>
          <label htmlFor="password">Password:</label>
          <input
            className="item"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onPasswordChange}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="pwdnote"
            className={passwordFocus && !validPassword ? "show" : "hide"}
          >
            8 to 128 characters.
            <br />
            Must include one lowercase letter, one uppercase letter, one digit
            and one special character.
          </p>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            className="item"
            id="confirm_password"
            type="password"
            name="confirm_password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required
            aria-invalid={validConfirmPassword ? "false" : "true"}
            aria-describedby="cpwdnote"
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
          />
          <p
            id="cpwdnote"
            className={
              confirmPasswordFocus && !validConfirmPassword ? "show" : "hide"
            }
          >
            Passwords do not match.
          </p>
          <button
            className="item"
            type="submit"
            disabled={
              !validEmail || !validPassword || !validConfirmPassword
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? &nbsp;
          <span>
            <Link to="/signin">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
