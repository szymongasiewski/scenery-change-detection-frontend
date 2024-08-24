import { useGetRequestQuery } from "./changeDetectionApiSlice";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import DeleteRequest from "./DeleteRequest";
import { useRef, useState, useEffect } from "react";

const RequestDetails = ({ requestId }) => {
  const errorRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    data: request,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetRequestQuery(requestId);

  useEffect(() => {
    setErrorMessage("");
  }, [requestId]);

  const formatString = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let content;

  if (isLoading || isFetching) {
    content = (
      <div className="flex w-full justify-center mt-6">
        <Spinner />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex w-full justify-center mt-6">
        <p>Error</p>
      </div>
    );
  } else if (request === null) {
    content = (
      <div className="flex w-full justify-center mt-6">
        <p>No data</p>
      </div>
    );
  } else if (isSuccess) {
    const parameters = JSON.parse(request.parameters);
    content = (
      <div className="flex flex-col items-center">
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
        <div className="flex flex-col lg:flex-row justify-center items-center w-full">
          <div className="flex flex-col w-full md:w-4/6 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold text-xl py-2">Input images</div>
              <div className="flex flex-wrap justify-center">
                {request.input_images.map((image) => (
                  <a key={image.image} href={image.image}>
                    <img
                      src={image.image}
                      alt="input"
                      className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-2 py-2"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-2/6 justify-center items-center bg-gray-200 border-2 border-black rounded-md md:mt-0 p-4 overflow-auto">
            <div className="flex flex-col justify-center items-center px-6 py-4 w-full">
              <div className="font-semibold text-center">Request status</div>
              <div className="text-center break-words">{request.status}</div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4 w-full">
              <div className="font-semibold text-center">Date</div>
              <div className="text-center break-words">
                {request.created_at.slice(0, 19).replace("T", " ")}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4 w-full">
              <div className="font-semibold text-center">Algorithm</div>
              <div className="text-center break-words">{request.algorithm}</div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4 w-full">
              <div className="font-semibold text-center">Parameters</div>
              <div className="w-full">
                {Object.keys(parameters).length === 0 ? (
                  <div className="text-center">Default parameters</div>
                ) : (
                  Object.keys(parameters).map((key) => (
                    <div key={key} className="flex justify-between w-full">
                      <div className="px-2 break-words">
                        {formatString(key)}:
                      </div>
                      <div className="px-2 break-words">{parameters[key]}</div>
                    </div>
                  ))
                )}
              </div>
              <DeleteRequest
                requestId={requestId}
                errorRef={errorRef}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="font-semibold py-2 text-xl">Results</div>
          <div className="flex flex-wrap justify-center">
            {request.output_images.map((image) => (
              <a key={image.image} href={image.image}>
                <img
                  src={image.image}
                  alt="output"
                  className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-2 py-2"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

RequestDetails.propTypes = {
  requestId: PropTypes.string.isRequired,
};

export default RequestDetails;
