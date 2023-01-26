import { useContext, useState } from 'react';
import { AuthContent } from '../components/auth/AuthContent'
import { ErrorOverlay } from '../components/UI/ErrorOverlay';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/AuthContext';
import { AuthValuesProps } from '../types/auth';
import { signUp } from '../utils/auth'

export const SignupScreen = () => {
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const { authenticated } = useContext(AuthContext)

  const signUpHandler = async ({ email, password }: AuthValuesProps) => {
    setIsLoading(true);
    try {
      const token = await signUp(email, password);
      authenticated?.(token);
    } catch (error) {
      console.log(error);
      setError(error)
      setIsLoading(false);
    }
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />
  }
  if (isLoading) {
    return <LoadingOverlay message="Creating a new User" />
  }

  return <AuthContent onAuthenticate={signUpHandler} />
}