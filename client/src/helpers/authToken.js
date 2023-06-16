import clienteAxios from "../config/axios";

const authToken = () => {
  const token = localStorage.getItem("user");
  if (token) {
    clienteAxios.defaults.headers.common["Authorization"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["Authorization"];
  }
};

export default authToken;
