import clienteAxios from "../config/axios";

//Valida si el token guardado en localstorage es de un usuario válido
const validateUser = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNzZiNWI1ZGUtODQzYy00YTVmLWE2MDgtM2NmYTA0Yjk3OTI4IiwibmFtZSI6IkVkIn0sImlhdCI6MTY5MDAwMjQ5OCwiZXhwIjoxNjkyNTk0NDk4fQ.RSUGNuwVCb9RqchZexIl6oXeaLIKP6A2_c7QpuUBmvM";
    //localStorage.getItem("user");
    clienteAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    const response = await clienteAxios.get(`/users/verify-user/${token}`);
    return response.data.data;
  } catch (error) {
    console.log("validateUser error", error.response.data.message);
  }
};

export default validateUser;
