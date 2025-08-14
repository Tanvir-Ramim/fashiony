import axios from "axios";

const Api = axios.create({
  baseURL: "https://fashiony.vercel.app/fashion/api/v1",
});

export default Api;
