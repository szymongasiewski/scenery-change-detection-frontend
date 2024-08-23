import { useGetRequestQuery } from "./changeDetectionApiSlice";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";

const RequestDetails = ({ requestId }) => {
  const {
    data: request,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetRequestQuery(requestId);

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
      <div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-4/5 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold text-xl py-2">Input images</div>
              <div className="flex">
                {request.input_images.map((image) => (
                  <a key={image.image} href={image.image}>
                    <img
                      src={image.image}
                      alt="input"
                      className="max-w-xl px-6 py-6"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/5 justify-center items-center bg-gray-200 border-2 border-black rounded-md">
            <div className="flex flex-col justify-center items-center px-6 py-4">
              <div className="font-semibold">Request status</div>
              <div>{request.status}</div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4">
              <div className="font-semibold">Date</div>
              <div>{request.created_at.slice(0, 19).replace("T", " ")}</div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4">
              <div className="font-semibold">Algorithm</div>
              <div>{request.algorithm}</div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-4">
              <div className="font-semibold">Parameters</div>
              <div>
                {Object.keys(parameters).map((key) => (
                  <div key={key} className="flex justify-between">
                    <div className="px-2">{formatString(key)}:</div>
                    <div className="px-2">{parameters[key]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="font-semibold py-2 text-xl">Results</div>
          <div className="flex flex-col justify-center items-center">
            {request.output_images.map((image) => (
              <a key={image.image} href={image.image}>
                <img
                  src={image.image}
                  alt="output"
                  className="max-w-3xl px-6 py-6"
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
