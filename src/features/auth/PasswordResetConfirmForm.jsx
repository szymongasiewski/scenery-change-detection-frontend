import useInput from "../../hooks/useInput";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD_PATTERN } from "../../utils/regexPatterns";
import Spinner from "../../components/Spinner";
import { usePasswordResetConfirmMutation } from "./authApiSlice";
import PropTypes from "prop-types";

const PasswordResetConfirmForm = ({ uid, token }) => {
  const errorRef = useRef();

  const [newPassword, resetNewPassword, newPasswordAttribs] = useInput("");
  const [
    confirmNewPassword,
    resetConfirmNewPassword,
    confirmNewPasswordAttribs,
  ] = useInput("");

  const [errorMessage, setErrorMessage] = useState("");

  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(false);

  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);

  const navigate = useNavigate();

  const [passwordResetConfirm, { isLoading }] =
    usePasswordResetConfirmMutation();

  useEffect(() => {
    const result = PASSWORD_PATTERN.test(newPassword);
    setValidNewPassword(result);
    const confirmResult = newPassword === confirmNewPassword;
    setValidConfirmNewPassword(confirmResult);
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //eslint-disable-next-line no-unused-vars
      const response = await passwordResetConfirm({
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
        uid,
        token,
      }).unwrap();
      setErrorMessage("");
      resetNewPassword();
      resetConfirmNewPassword();
      navigate("/signin");
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 400) {
        if (error?.data?.new_password?.[0]) {
          setErrorMessage(error?.data?.new_password?.[0]);
        } else if (error?.data?.confirm_new_password?.[0]) {
          setErrorMessage(error?.data?.confirm_new_password?.[0]);
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
              : "hidden"
          }
        >
          {errorMessage}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="newPassword"
          >
            New password
          </label>
          <div className="mt-2">
            <input
              {...newPasswordAttribs}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="new password"
              aria-invalid={validNewPassword ? "false" : "true"}
              aria-describedby="newPasswordNote"
              onFocus={() => setNewPasswordFocus(true)}
              onBlur={() => setNewPasswordFocus(false)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className={
            newPasswordFocus && !validNewPassword
              ? "flex w-full space-y-6 mb-2"
              : "hidden"
          }
        >
          <p
            id="newPasswordNote"
            className="block text-s font-semibold leading-6"
          >
            8 to 128 characters.
            <br />
            Must include one lowercase letter, one uppercase letter, one digit
            and one special character.
          </p>
        </div>
        <div>
          <label
            className="block test-sm font-medium leading-6 text-gray-900"
            htmlFor="confirmNewPassword"
          >
            Confirm new password
          </label>
          <div className="mt-2">
            <input
              {...confirmNewPasswordAttribs}
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="confirm new password"
              aria-invalid={validConfirmNewPassword ? "false" : "true"}
              aria-describedby="confirmNewPasswordNote"
              onFocus={() => setConfirmNewPasswordFocus(true)}
              onBlur={() => setConfirmNewPasswordFocus(false)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className={
            confirmNewPasswordFocus && !validConfirmNewPassword
              ? "flex w-full space-y-6 mb-2"
              : "hidden"
          }
        >
          <p
            id="confirmNewPasswordNote"
            className="block text-s font-semibold leading-6"
          >
            Passwords do not match.
          </p>
        </div>
        <button
          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600 disabled:opacity-25"
          type="submit"
          disabled={
            !validNewPassword || !validConfirmNewPassword ? true : false
          }
        >
          Submit
        </button>
      </form>
    </>
  );
};

PasswordResetConfirmForm.propTypes = {
  uid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default PasswordResetConfirmForm;
