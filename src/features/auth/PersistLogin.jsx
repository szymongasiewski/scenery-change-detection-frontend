import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshTokenMutation } from "./authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken, selectToken } from "./authSlice";
import Spinner from "../../components/Spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refreshToken().unwrap();
        dispatch(setUser(response.email));
        dispatch(setToken(response.access));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
