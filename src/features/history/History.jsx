import { useGetHistoryQuery } from "./historyApiSlice";

const History = () => {
  const {
    data: history,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHistoryQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {JSON.stringify(error)}</p>;
  } else if (isSuccess) {
    console.log("history", history);
    content = (
      <div>
        <h1>History</h1>
        <ul>
          {history.results.map((item, i) => (
            <li key={i}>
              <img src={item.image} alt={i} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return content;
};

export default History;
