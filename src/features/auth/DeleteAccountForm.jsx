import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDeleteAccountMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useRef, useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

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
      <form className="space-y-6" onSubmit={handleDelete}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Provide password
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
        <button
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          type="submit"
        >
          Delete
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

export default DeleteAccountForm;
