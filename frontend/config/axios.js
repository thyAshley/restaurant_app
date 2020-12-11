import Axios from "axios";

export const instance = Axios.create({
  baseURL: "http://205db53cbb25.ngrok.io",
});

export const urlLink = {
  url: "http://205db53cbb25.ngrok.io",
};
