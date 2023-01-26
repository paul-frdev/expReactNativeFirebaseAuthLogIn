import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Navigation } from './navigators/AuthStackNavigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import AppLoading from 'expo-app-loading';



const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const { authenticated } = useContext(AuthContext);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authenticated?.(storedToken);
      }

      setIsTryingLogin(false);
    };

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />
  }

  return (
    <Navigation />
  )
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Root />
    </AuthContextProvider>
  );
}
