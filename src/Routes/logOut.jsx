import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContexts } from "../Hooks/mainContext";

const Logout = () => {
     
  const navigate = useNavigate();
  const { changeContext } =useContexts();

  useEffect(() => {
    changeContext({
      state: "auth",
      auth: "",
    });
    navigate("/home")
  });
  return (<></>)
};

export default Logout;
