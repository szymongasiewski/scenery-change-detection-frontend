import { useState, useRef, useEffect } from "react";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "./authApiSlice";
import { PASSWORD_PATTERN } from "../../utils/regexPatterns";
import Spinner from "../../components/Spinner";

const ChangePasswordForm = () => {
  const errorRef = useRef();

  const [oldPassword, resetOldPassword, oldPasswordAttribs] = useInput("");

  const [newPassword, resetNewPassword, newPasswordAttribs] = useInput("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);

  const [
    confirmNewPassword,
    resetConfirmNewPassword,
    confirmNewPasswordAttribs,
  ] = useInput("");
  const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(false);
  const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  useEffect(() => {
    const result = PASSWORD_PATTERN.test(newPassword);
    setValidNewPassword(result);
    const confirmResult = newPassword === confirmNewPassword;
    setValidConfirmNewPassword(confirmResult);
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [oldPassword, newPassword, confirmNewPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }).unwrap();
      setErrorMessage("");
      resetOldPassword();
      resetNewPassword();
      resetConfirmNewPassword();
      navigate("/profile");
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 401) {
        setErrorMessage("Unauthorized");
      } else if (error?.status === 400) {
        if (error?.data?.old_password) {
          setErrorMessage(error.data.old_password[0]);
        } else if (error?.data?.new_password) {
          setErrorMessage(error.data.new_password[0]);
        } else if (error?.data?.non_field_errors) {
          setErrorMessage(error.data.non_field_errors[0]);
        }
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    resetOldPassword();
    resetNewPassword();
    resetConfirmNewPassword();
    navigate("/profile");
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
            htmlFor="oldPassword"
          >
            Old password
          </label>
          <div className="mt-2">
            <input
              {...oldPasswordAttribs}
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="old password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
        <button
          className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
