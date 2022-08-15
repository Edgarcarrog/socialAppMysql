import { getCookie } from "./cookie";
import clienteAxios from "../config/axios";

const validateCookie = async () => {
  const cookie = getCookie("user");
  //console.log(cookie);
  const response = await clienteAxios.get(`/users/verify-cookie/${cookie}`);
  // console.log("Respuesta de la cookie", response.data.data);
  return response.data.data;
};

export default validateCookie;
