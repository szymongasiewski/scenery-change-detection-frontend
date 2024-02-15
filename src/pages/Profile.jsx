import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <button>
          <Link to="/delete-account">Delete Account</Link>
        </button>
        <button>
          <Link to="/change-password">Change Password</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
