import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

const Home = () => {
  const email = useSelector(selectUser);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Welcome to the Scenery Change Detection Web App
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full text-center sm:max-w-sm">
        <p className="text-xl">
          This application was developed as part of a Diploma thesis entitled
          &quot;Detection of scenery changes in time in pictures&quot; at
          the&nbsp;
          <a
            className="underline text-blue-500 hover:text-blue-700 focus:outline-none focus-visible:underline focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
            href="https://wi.pb.edu.pl/en/"
          >
            Faculty of Computer Science, Białystok University of Technology.
          </a>
        </p>
      </div>
      {!email && (
        <div className="p-6">
          <Link
            to="/signup"
            className="text-white bg-slate-900 rounded-md py-3 px-5 shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
