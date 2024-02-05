import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Testing = () => {
  const [msg, setMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const loaction = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTestMsg = async () => {
      try {
        const request = await axiosPrivate.get("test/", {
          signal: controller.signal,
        });
        console.log(request.data);
        isMounted && setMsg(request.data.msg);
      } catch (error) {
        console.error("Error:", error);
        navigate("/signin", { state: { from: loaction }, replace: true });
      }
    };

    getTestMsg();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <div>{msg}</div>;
};

export default Testing;
