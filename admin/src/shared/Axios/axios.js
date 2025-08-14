import axios from "axios";
const Api = axios.create({
  // baseURL: "http://localhost:8080/fashion/api/v1",

  baseURL: "https://fashiony.vercel.app/fashion/api/v1",
});

export default Api;
