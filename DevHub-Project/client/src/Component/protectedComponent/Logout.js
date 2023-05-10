import {useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  useEffect(()=>{
    navigate("/");
    props.onLogout(false);
  },[]) 
  
};

export default Logout