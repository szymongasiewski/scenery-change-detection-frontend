import { useDeleteRequestMutation } from "./changeDetectionApiSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";

const DeleteRequest = ({ requestId }) => {
  const errorRef = useRef();

  const [deleteRequest, { isLoading }] = useDeleteRequestMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
  }, [requestId]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await deleteRequest(requestId).unwrap();
      navigate("/history");
    } catch (error) {
      if (!error?.status) {
        setErrorMessage("Server is not responding");
      } else if (error?.status === 401) {
        setErrorMessage("Unauthorized");
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
            errorMessage ? "text-red-600 text-sm text-center" : "hidden"
          }
        >
          {errorMessage}
        </p>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </>
  );
};

DeleteRequest.propTypes = {
  requestId: PropTypes.string.isRequired,
};

export default DeleteRequest;
