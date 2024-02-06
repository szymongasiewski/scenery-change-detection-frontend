import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "token/refresh/",
      {},
      {
        withCredentials: true,
      },
    );
    setUser((prev) => {
      console.log(JSON.stringify(prev));
      console.log(JSON.stringify(response.data.access));
      return {
        ...prev,
        accessToken: response.data.access,
      };
    });
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
