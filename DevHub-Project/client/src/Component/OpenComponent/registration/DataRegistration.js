import axios from 'axios';

const DataRegistration = async (data) => {
  try {
        await axios.post("http://localhost:8080/register", data);
      } catch (error) {
        alert("cannot Register");
      }
    };


export default DataRegistration;