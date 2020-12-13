import Axios from 'axios';

const url = 'http://ace0ddd81b6e.ngrok.io';
export const instance = Axios.create({
  baseURL: url,
});

export const urlLink = {
  url: url,
};
