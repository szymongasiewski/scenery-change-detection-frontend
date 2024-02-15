import { useState, useRef, useEffect } from "react";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "./authApiSlice";
import { PASSWORD_PATTERN } from "../../utils/regexPatterns";

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
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h2>Change password</h2>
      <div>
        <p ref={errorRef} className={errorMessage ? "error" : "offscreen"}>
          {errorMessage}
        </p>
        <form className="container" onSubmit={handleSubmit}>
          <label htmlFor="oldPassword">Old password:</label>
          <input
            className="item"
            {...oldPasswordAttribs}
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="old password"
            required
          />
          <label htmlFor="newPassword">New password:</label>
          <input
            className="item"
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
          />
          <p
            id="newPasswordNote"
            className={newPasswordFocus && !validNewPassword ? "show" : "hide"}
          >
            8 to 128 characters.
            <br />
            Must include one lowercase letter, one uppercase letter, one digit
            and one special character.
          </p>
          <label htmlFor="confirmNewPassword">Confirm new password:</label>
          <input
            className="item"
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
          />
          <p
            id="confirmNewPasswordNote"
            className={
              confirmNewPasswordFocus && !validConfirmNewPassword
                ? "show"
                : "hide"
            }
          >
            Passwords do not match.
          </p>
          <button
            className="item"
            type="submit"
            disabled={
              !validNewPassword || !validConfirmNewPassword ? true : false
            }
          >
            Submit
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
