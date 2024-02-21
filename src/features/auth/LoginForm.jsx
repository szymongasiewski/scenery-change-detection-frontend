import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setUser, setToken } from "./authSlice";
import useInput from "../../hooks/useInput";
import Spinner from "../../components/Spinner";

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
              : "hidden"
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
              name="email"
              placeholder="email"
              autoComplete="off"
              {...emailAttribs}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
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
              type="password"
              id="password"
              name="password"
              placeholder="password"
              {...passwordAttribs}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
