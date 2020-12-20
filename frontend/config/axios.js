import Axios from 'axios';

const url = 'http://c13866e5f0d1.ngrok.io';
export const instance = Axios.create({
  baseURL: url,
});

export const urlLink = {
  url: url,
};
