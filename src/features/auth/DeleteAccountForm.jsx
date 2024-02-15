import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDeleteAccountMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useRef, useState, useEffect } from "react";

const DeleteAccountForm = () => {
  const errorRef = useRef();

  const [password, resetPassword, passwordAttribs] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage("");
  }, [password]);

  const handleCancel = (e) => {
    e.preventDefault();
    resetPassword();
    navigate("/profile");
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await deleteAccount({ password }).unwrap();
      dispatch(logout());
      resetPassword();
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 401) {
        setErrorMessage("Unauthorized");
      } else if (error?.status === 400) {
        setErrorMessage("Invalid password");
      } else {
        setErrorMessage("Something went wrong");
      }
      errorRef.current.focus();
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p
        ref={errorRef}
        className={errorMessage ? "error" : "offscreen"}
        aria-live="asserive"
      >
        {errorMessage}
      </p>
      <h2>Provide password</h2>
      <form onSubmit={handleDelete}>
        <label htmlFor="password">Password</label>
        <input
          className="item"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          {...passwordAttribs}
          required
        />
        <button type="submit">Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
