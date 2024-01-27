import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await axios.post(
  //     "http://127.0.0.1:8000/api/register/",
  //     {
  //       email: email,
  //       password: password,
  //       confirm_password: confirm_password,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   );
  // };

  let registerUser = async (e) => {
    e.preventDefault();

    let response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirm_password: confirm_password,
      }),
    });

    if (response.status === 201) {
      navigate("/signin");
    } else {
      alert("something wrong");
      console.log(response);
    }
  };

  return (
    <div>
      <form className="container" onSubmit={registerUser}>
        <input
          className="item"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="item"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onPasswordChange}
        />
        <input
          className="item"
          type="password"
          name="confirm_password"
          placeholder="confirm password"
          value={confirm_password}
          onChange={onConfirmPasswordChange}
        />
        <button className="item" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
