import { useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import { usePasswordResetRequestMutation } from "./authApiSlice";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const PasswordResetRequestForm = () => {
  const errorRef = useRef();

  const [email, resetEmail, emailAttribs] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [passwordResetRequest, { isLoading }] =
    usePasswordResetRequestMutation();

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //eslint-disable-next-line no-unused-vars
      const response = await passwordResetRequest({ email }).unwrap();
      resetEmail();
      setErrorMessage("");
      setSent(true);
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 400) {
        if (error?.data?.email?.[0]) {
          setErrorMessage(error?.data?.email?.[0]);
        } else {
          setErrorMessage("Something went wrong");
        }
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
              : "invisible"
          }
          aria-live="asserive"
        >
          {errorMessage}
        </p>
      </div>
      {sent ? (
        <div>
          <p className="space-y-6 mb-4 flex w-full items-center justify-center">
            Check your email
          </p>
          <Link
            to="/"
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Go back home
          </Link>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Provide your email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                {...emailAttribs}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default PasswordResetRequestForm;
