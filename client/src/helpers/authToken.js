import clienteAxios from "../config/axios";

const authToken = token =>{
    if(token){
        clienteAxios.defaults.headers.common['Authorization'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
};

export default authToken;