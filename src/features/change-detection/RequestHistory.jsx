import { useGetHistoryQuery } from "./changeDetectionApiSlice";
import { useState } from "react";
import Spinner from "../../components/Spinner";

const RequestHistory = () => {
  const [page, setPage] = useState(1);
  const {
    data: history,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetHistoryQuery(page);

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
  } else if (history.count === 0) {
    content = (
      <div className="flex w-full justify-center mt-6">
        <p>No history</p>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full text-center divide-y-2 divide-black">
            <thead>
              <tr>
                <th className="px-6 py-3">Request status</th>
                <th className="px-6 py-3">Date sent</th>
                <th className="px-6 py-3">Input images</th>
                <th className="px-6 py-3">Output image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {history.results.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-3">{item.status}</td>
                  <td className="py-3">
                    {item.created_at.slice(0, 19).replace("T", " ")}
                  </td>
                  <td className="px-6 py-3">
                    {item.input_images.length === 2 ? (
                      <div className="flex justify-center items-center">
                        <a className="px-1" href={item.input_images[0].image}>
                          <img
                            src={item.input_images[0].image}
                            alt="wrong"
                            className="max-h-72"
                          />
                        </a>
                        <a className="px-1" href={item.input_images[1].image}>
                          <img
                            src={item.input_images[1].image}
                            alt="wrong"
                            className="max-h-72"
                          />
                        </a>
                      </div>
                    ) : (
                      "No inputs"
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      {item.output_image === null ? (
                        "No output"
                      ) : (
                        <a href={item.output_image.image}>
                          <img
                            src={item.output_image.image}
                            alt="wrong"
                            className="max-h-72"
                          />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center px-5 py-5">
          <button
            disabled={history.previous === null}
            onClick={() => setPage(page - 1)}
            className="basis-1/5 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm enabled:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-25"
          >
            Previous
          </button>
          <div className="basis-3/5 text-center font-bold">{page}</div>
          <button
            disabled={history.next === null}
            onClick={() => setPage(page + 1)}
            className="basis-1/5 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm enabled:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-25"
          >
            Next
          </button>
        </div>
      </>
    );
  }
  return content;
};

export default RequestHistory;
