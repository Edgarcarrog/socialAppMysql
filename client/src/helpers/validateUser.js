import clienteAxios from "../config/axios";

//Valida si el token guardado en localstorage es de un usuario válido
const validateUser = async () => {
  try {
    const token = localStorage.getItem("user");
    const response = await clienteAxios.get(`/users/verify-user/${token}`);
    console.log("ValidateUser", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export default validateUser;
