import useInput from "../../hooks/useInput";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyEmailMutation } from "./authApiSlice";
import Spinner from "../../components/Spinner";
import PropTypes from "prop-types";

const VerifyEmailForm = ({ id }) => {
  const errorRef = useRef();

  const [otp, resetOtp, otpAttribs] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(
    JSON.parse(sessionStorage.getItem("timer")) || 0,
  );
  const timerId = useRef();

  const navigate = useNavigate();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp] = useResendOtpMutation();

  useEffect(() => {
    setTimer(JSON.parse(sessionStorage.getItem("timer")) || 0);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("timer", JSON.stringify(timer));
  }, [timer]);

  useEffect(() => {
    setErrorMessage("");
  }, [otp]);

  useEffect(() => {
    if (timer <= 0) {
      setTimer(0);
      return;
    } else {
      timerId.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //eslint-disable-next-line no-unused-vars
      const response = await verifyEmail({ id, otp }).unwrap();

      resetOtp();
      setTimer(0);
      sessionStorage.removeItem("timer");
      navigate("/signin");
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 400) {
        setErrorMessage("Invalid or expired OTP");
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();

    try {
      //eslint-disable-next-line no-unused-vars
      const response = await resendOtp({ id }).unwrap();

      setTimer(60);
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
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
              ? "block text-xl font-bold leading-6 text-gray-700"
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
            htmlFor="password"
          >
            Provide OTP
          </label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="one time password"
              {...otpAttribs}
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
        <button
          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600 disabled:opacity-25"
          onClick={handleResendOtp}
          disabled={timer > 0}
        >
          {timer === 0 ? <>Resend OTP</> : <>{timer}s</>}
        </button>
      </form>
    </>
  );
};

VerifyEmailForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default VerifyEmailForm;
