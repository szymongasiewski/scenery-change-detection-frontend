import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../utils/regexPatterns";
import useInput from "../../hooks/useInput";
import { useRegisterMutation } from "./authApiSlice";

const RegisterForm = () => {
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, resetEmail, emailAttribs] = useInput("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, resetPassword, passwordAttribs] = useInput("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, resetConfirmPassword, confirmPasswordAttribs] =
    useInput("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_PATTERN.test(email);
    const v2 = PASSWORD_PATTERN.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    try {
      const response = await register({
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      setErrorMessage("");
      resetEmail();
      resetPassword();
      resetConfirmPassword();
      navigate("/signin");
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Network error.");
      } else if (error.status === 400) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Registration failed.");
      }
      errorRef.current.focus();
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
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
            {...emailAttribs}
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
            {...passwordAttribs}
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
            {...confirmPasswordAttribs}
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
        <span>
          <Link to="/">Back to Home page</Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
