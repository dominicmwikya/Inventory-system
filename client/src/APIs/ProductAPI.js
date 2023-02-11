import axios from "axios"
const url="http://localhost:5000/products"
export const ProductAPI = {
    getAll: async function () {
      const response = await axios.get(`${url}`, {
        headers:{userToken:localStorage.getItem("Token")}
      });
      return response.data;
    },
    get: async function (id) {
        const response=await axios.get(`${url}/${id}`,
        {headers:{userToken:localStorage.getItem("Token")}});
  
      return response;
    },
    delete_product: async function (id) {
       const response= axios.delete(`${url}/delete/${id}`,{
              headers: {  userToken: localStorage.getItem("Token")
              }
            })
      return response;
    },
    update: async function (data) {
       const response= await axios.put(`${url}/update`, data,{
        headers: {userToken: localStorage.getItem("Token")}
      })
      return response;
    },
    sale: async function (data) {
        const response= await axios.put(`${url}/sales/create`, data,{
         headers: {userToken: localStorage.getItem("Token")}
       })
       return response;
     },
  }
  