import Axios from 'axios';

const url = 'http://9877a7f4b9c5.ngrok.io';
export const instance = Axios.create({
  baseURL: url,
});

export const urlLink = {
  url: url,
};
