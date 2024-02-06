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
    //const controller = new AbortController();

    const getTestMsg = async () => {
      try {
        const response = await axiosPrivate.get("test/");
        console.log(response.data);
        isMounted && setMsg(response.data.msg);
      } catch (error) {
        console.error("Error:", error);
        navigate("/signin", { state: { from: loaction }, replace: true });
      }
    };

    getTestMsg();

    return () => {
      isMounted = false;
      //controller.abort();
    };
  }, []);

  return <div>{msg ? <p>{msg}</p> : <p>Loading...</p>}</div>;
};

export default Testing;
