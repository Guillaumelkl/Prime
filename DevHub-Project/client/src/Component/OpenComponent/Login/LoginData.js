import axios from "axios";

const DataLogin = async (data) =>{
    try {
        const response = await axios.post("http://localhost:8080/login", data);
        if(response.status === 200) {
            localStorage.setItem("token",response.data);
            alert("You are logged in!!");
            console.log(response)
            return true
        }
        
    } catch (error) {
        alert("unable to login");
        
    }
};

export default DataLogin;