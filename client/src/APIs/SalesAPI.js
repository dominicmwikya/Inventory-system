import axios from "axios";
const sales_url="http://localhost:5000/sales"
export const SalesAPI={
     create:async function(data){
        const response= await axios.post(`${sales_url}/create`, data, {
            headers:{userToken:localStorage.getItem("Token")}
        });
        return response;
     }
}