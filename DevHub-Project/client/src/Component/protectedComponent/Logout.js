import {useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  useEffect(()=>{
    navigate("/login");
    props.onLogout(false);
  },[Logout]) 
  
};

export default Logout