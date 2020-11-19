import Axios from "axios";

export const instance = Axios.create({
  baseURL: "http://e32897a9a675.ngrok.io",
});
