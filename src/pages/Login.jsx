import Logo from "../components/Logo";
import LoginForm from "../features/auth/LoginForm";

const logoSize = 100;
const logoPath = "logo-black.svg";
const fontSize = 26;

const Login = () => {
  return (
    <div className="container">
      <Logo size={logoSize} imgPath={logoPath} fontSize={fontSize} />
      <LoginForm />
    </div>
  );
};

export default Login;
