import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/RegisterForm";
import Logo from "../components/Logo";

const logoPath = "logo-black.svg";

const Register = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo styles="mx-auto h-20 w-auto" imgPath={logoPath} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Sign Up
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account? &nbsp;
        <Link
          className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
          to="/signin"
        >
          Sign In
        </Link>
      </p>
      <div className="mt-10 flex items-center justify-center">
        <Link
          to="/"
          className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Register;
