import { useParams } from "react-router-dom";
import RequestDetails from "../features/change-detection/RequestDetails";

const Request = () => {
  const id = useParams();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          {`Request ${id.id}`}
        </h1>
      </div>
      <div>
        <RequestDetails requestId={id.id} />
      </div>
    </div>
  );
};

export default Request;
