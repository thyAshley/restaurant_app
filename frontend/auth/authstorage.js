import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const authStorage = {
  async saveToken(token) {
    try {
      await SecureStore.setItemAsync("token", token);
    } catch (error) {
      console.log(error);
    }
  },

  async getToken() {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.log(error);
    }
  },

  getUser() {
    return jwtDecode(getToken()) || null;
  },
};

module.exports = { authStorage };
