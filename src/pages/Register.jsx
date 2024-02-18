import Logo from "../components/Logo";
import RegisterForm from "../features/auth/RegisterForm";

const logoSize = 100;
const logoPath = "logo-black.svg";
const fontSize = 26;

const Register = () => {
  return (
    <div className="container">
      <Logo size={logoSize} imgPath={logoPath} fontSize={fontSize} />
      <RegisterForm />
    </div>
  );
};

export default Register;
