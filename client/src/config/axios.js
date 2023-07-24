import axios from "axios";

const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
  /* mode: "cors",
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, DELETE, HEAD, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  }, */
});

export default clienteAxios;
