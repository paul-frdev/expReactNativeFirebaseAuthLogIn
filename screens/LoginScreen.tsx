import { useContext, useState } from 'react';
import { AuthContent } from '../components/auth/AuthContent'
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/AuthContext';
import { AuthValuesProps } from '../types/auth';
import { login } from '../utils/auth';

export const LoginScreen = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { authenticated } = useContext(AuthContext);

  const logInHandler = async ({ email, password }: AuthValuesProps) => {
    setIsLoading(true);
    try {
     const token = await login(email, password);
     authenticated?.(token);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Logging you in..." />
  }

  return (
    <AuthContent isLogin onAuthenticate={logInHandler} />
  )
}