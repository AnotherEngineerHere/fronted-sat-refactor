import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:9095/satapi",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
