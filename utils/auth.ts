import axios from "axios";

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp`;
const API_KEY = `AIzaSyA4672D-IdsmT5CXDCvylG_IldHDsG_S6o`;

export const createUser = async (email: string, password: string) => {
 const response = await axios.post(`${URL}?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true
  });
};
