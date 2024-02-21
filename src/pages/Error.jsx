import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-gray-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Page not found
        </h1>
        <div className="mt-10 flex items-center justify-center">
          <Link
            to="/"
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
