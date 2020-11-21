import Axios from "axios";

export const instance = Axios.create({
  baseURL: "http://fe8309747e4f.ngrok.io",
});
