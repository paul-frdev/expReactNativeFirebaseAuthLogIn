import { StatusBar } from 'expo-status-bar';
import {  Navigation } from './navigators/AuthStackNavigation';
import AuthContextProvider from './store/AuthContext';


export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Navigation />
    </AuthContextProvider>
  );
}
