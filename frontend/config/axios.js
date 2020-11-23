import Axios from "axios";

export const instance = Axios.create({
  baseURL: "http://3410bc12af32.ngrok.io/",
});
