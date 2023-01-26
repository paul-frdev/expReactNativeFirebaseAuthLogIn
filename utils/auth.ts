import axios from "axios";

const API_KEY = `AIzaSyA4672D-IdsmT5CXDCvylG_IldHDsG_S6o`;

export const authenticate = async (
  mode: string,
  email: string,
  password: string
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
};
export const signUp = (email: string, password: string) => {
  return authenticate("signUp", email, password);
};

export const login = (email: string, password: string) => {
  return authenticate("signInWithPassword", email, password);
};
