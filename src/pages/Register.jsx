import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  let registerUser = async (e) => {
    e.preventDefault();
    
    let response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value, 'confirm_password': e.target.confirm_password.value})
    });
    
    if (response.status === 201) {
        navigate('/signin');
    }
    else {
        alert('something wrong');
    }
}

  return (
    <div>
      <form onSubmit={registerUser}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="password" name="confirm_password" placeholder="confirm password" />
        <input type="submit"/>
      </form>
    </div>
  )
}

export default Register