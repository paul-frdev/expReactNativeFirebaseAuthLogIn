import { createContext, useEffect, useState } from 'react';
import { ILogIn } from '../types/auth';
import { AppProviderProps } from '../types/expense';

import AsyncStorage from "@react-native-async-storage/async-storage";


const defaultState = {
  token: '',
  isAuthenticated: false,
  authenticated: () => { },
  logout: () => { }
};

export const AuthContext = createContext<ILogIn>(defaultState);

const AuthContextProvider = ({ children }: AppProviderProps) => {
  const [authToken, setAuthToken] = useState('');

  const authenticated = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token)
  };

  const logout = () => {
    setAuthToken('');
    AsyncStorage.removeItem('token');
  };


  const value: ILogIn = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticated,
    logout
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;