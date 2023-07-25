import clienteAxios from "../config/axios";

//Valida si el token guardado en localstorage es de un usuario válido
const validateUser = async () => {
  try {
    const token = localStorage.getItem("user");
    clienteAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    const response = await clienteAxios.get(`/users/verify-user/${token}`);
    return response.data.data;
  } catch (error) {
    console.log("validateUser error", error.response.data.message);
  }
};

export default validateUser;
