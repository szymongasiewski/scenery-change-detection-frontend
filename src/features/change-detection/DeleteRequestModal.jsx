import PropTypes from "prop-types";

const DeleteRequestModal = ({ visible, onClose, onConfirm }) => {
  return !visible ? null : (
    <div
      onClick={() => onClose()}
      className="flex justify-center items-center fixed inset-0 bg-gray-600 bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-md p-6">
        <p className="p-4">Are you sure you want to delete this request?</p>
        <div className="flex justify-around p-4">
          <button
            onClick={() => onConfirm()}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={() => onClose()}
            className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteRequestModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteRequestModal;
