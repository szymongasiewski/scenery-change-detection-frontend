import { useDeleteRequestMutation } from "./changeDetectionApiSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import DeleteRequestModal from "./DeleteRequestModal";

const DeleteRequest = ({ requestId, errorRef, setErrorMessage }) => {
  //const errorRef = useRef();

  const [deleteRequest, { isLoading }] = useDeleteRequestMutation();
  //const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setErrorMessage("");
  //   }, [requestId]);

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    // e.preventDefault();

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
      if (errorRef.current) {
        errorRef.current.focus();
      }
    }
  };

  return (
    <>
      <div className="space-y-6 mb-2 flex w-full justify-center p-4">
        <button
          onClick={() => setVisible(true)}
          className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:otline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
      </div>
      <DeleteRequestModal
        visible={visible}
        onClose={handleModalClose}
        onConfirm={handleDelete}
      />
      {isLoading && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-600 bg-opacity-30 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
    </>
  );
};

DeleteRequest.propTypes = {
  requestId: PropTypes.string.isRequired,
  errorRef: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default DeleteRequest;
