import PasswordResetRequestForm from "../features/auth/PasswordResetRequestForm";

const PasswordResetRequest = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Password Reset Request
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetRequestForm />
      </div>
    </div>
  );
};

export default PasswordResetRequest;
