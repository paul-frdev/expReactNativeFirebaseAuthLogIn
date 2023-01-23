import { useState } from 'react';
import { AuthContent } from '../components/auth/AuthContent'
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { AuthValuesProps } from '../types/auth';
import { createUser } from '../utils/auth'

export const SignupScreen = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async ({ email, password }: AuthValuesProps) => {
    setIsLoading(true);
    try {
      await createUser(email, password);
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong")
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating a new User"/>
  }

  return <AuthContent onAuthenticate={signupHandler} />
}