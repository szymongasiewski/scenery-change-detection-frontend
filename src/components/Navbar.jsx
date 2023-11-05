import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let {user, logoutUser} = useContext(AuthContext);

  return (
    <nav>
        <Link to='/'>Home</Link>
        {user ? (
          <a onClick={logoutUser}>Logout</a>
        ) : (
          <>
            <Link to='/signin'>Sign in</Link>
            <Link to='/signup'>Sign up</Link>
          </>
        )}
        {user && <p>Hello {user.email}</p>}
    </nav>
  )
}

export default Navbar