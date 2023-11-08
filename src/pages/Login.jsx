import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <form className="container " onSubmit={loginUser}>
        <input className="item" type="email" name="email" placeholder="email" />
        <input
          className="item"
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="item" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
