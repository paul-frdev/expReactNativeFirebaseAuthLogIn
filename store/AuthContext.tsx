import { createContext, useState } from 'react';
import { ILogIn } from '../types/auth';
import { AppProviderProps } from '../types/expense';


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
  };

  const logout = () => {
    setAuthToken('')
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