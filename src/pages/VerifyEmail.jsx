import { useParams } from "react-router-dom";
import VerifyEmailForm from "../features/auth/VerifyEmailForm";

const VerifyEmail = () => {
  const { id } = useParams();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Verify your email
        </h1>
        <p className="text-center font-semibold leading-9 tracking-tight text-gray-600">
          Check your email
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <VerifyEmailForm id={id} />
      </div>
    </div>
  );
};

export default VerifyEmail;
