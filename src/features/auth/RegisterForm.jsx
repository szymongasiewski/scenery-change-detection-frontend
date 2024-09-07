import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../utils/regexPatterns";
import useInput from "../../hooks/useInput";
import { useRegisterMutation } from "./authApiSlice";
import Spinner from "../../components/Spinner";

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
      // eslint-disable-next-line no-unused-vars
      const response = await register({
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      setErrorMessage("");
      resetEmail();
      resetPassword();
      resetConfirmPassword();
      const id = response.data.id;
      navigate(`/verify-email/${id}`);
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Network error.");
      } else if (error.status === 400) {
        if (error.data.email) {
          setErrorMessage("Email already exists.");
        } else {
          setErrorMessage("Invalid password.");
        }
      } else {
        setErrorMessage("Registration failed.");
      }
      errorRef.current.focus();
    }
  };

  return isLoading ? (
    <div className="flex w-full justify-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="space-y-6 mb-2 flex w-full justify-center">
        <p
          ref={errorRef}
          className={
            errorMessage
              ? "block text-xl font-bold leading-6 text-red-700"
              : "invisible"
          }
          aria-live="asserive"
        >
          {errorMessage}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              name="email"
              placeholder="email"
              {...emailAttribs}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className={
            emailFocus && email && !validEmail
              ? "flex w-full space-y-6 mb-2"
              : "hidden"
          }
        >
          <p id="uidnote" className="block text-s font-semibold leading-6">
            Please enter a valid email address.
          </p>
        </div>
        <div>
          <label
            className="block test-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2">
            <input
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className={
            passwordFocus && !validPassword
              ? "flex w-full space-y-6 mb-2"
              : "hidden"
          }
        >
          <p id="pwdnote" className="block text-s font-semibold leading-6">
            8 to 128 characters.
            <br />
            Must include one lowercase letter, one uppercase letter, one digit
            and one special character.
          </p>
        </div>
        <div>
          <label
            className="block test-sm font-medium leading-6 text-gray-900"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className={
            confirmPasswordFocus && !validConfirmPassword
              ? "flex w-full space-y-6 mb-2"
              : "hidden"
          }
        >
          <p id="cpwdnote" className="block text-s font-semibold leading-6">
            Passwords do not match.
          </p>
        </div>
        <button
          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600 disabled:opacity-25"
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
    </>
  );
};

export default RegisterForm;
