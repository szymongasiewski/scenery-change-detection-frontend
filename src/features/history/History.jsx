import { useGetHistoryQuery } from "./historyApiSlice";
import { useState } from "react";

const History = () => {
  const [page, setPage] = useState(1);
  const {
    data: history,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetHistoryQuery(page);

  let content;

  if (isLoading || isFetching) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {JSON.stringify(error)}</p>;
  } else if (history.count === 0) {
    content = <p>No images</p>;
  } else if (isSuccess) {
    console.log("history", history);
    content = (
      <div>
        <h1>History</h1>
        <ul>
          {history.results.map((item) => (
            <li key={item.id}>
              <p>{item.status}</p>
              {item.input_images.length === 2 ? (
                <>
                  <img src={item.input_images[0].image} alt="wrong" />
                  <img src={item.input_images[1].image} alt="wrong" />
                </>
              ) : (
                <p>No inputs</p>
              )}
              {item.output_image === null ? (
                <p>No output</p>
              ) : (
                <img src={item.output_image.image} alt="wrong" />
              )}
            </li>
          ))}
        </ul>
        <button
          disabled={history.previous === null}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <p>{page}</p>
        <button
          disabled={history.next === null}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  }
  return content;
};

export default History;
