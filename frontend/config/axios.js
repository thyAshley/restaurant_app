import Axios from "axios";

export const instance = Axios.create({
  baseURL: "http://d376017dd801.ngrok.io",
});
