import RequestHistory from "../features/change-detection/RequestHistory";

const History = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          History
        </h1>
      </div>
      <div>
        <RequestHistory />
      </div>
    </div>
  );
};

export default History;
