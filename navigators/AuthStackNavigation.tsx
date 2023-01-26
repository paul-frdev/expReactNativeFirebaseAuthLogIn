import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import AppProvider from '../store/AppContext';
import { AuthContext } from '../store/AuthContext';
import { NativeNavigation } from './NativeNavigation';


const Stack = createNativeStackNavigator<any>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

export const AuthenticatedStackNavigation = () => {
  return (
    <AppProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Welcome" component={NativeNavigation} options={{
          headerTitle: ""
        }} />
      </Stack.Navigator>
    </AppProvider>
  )
}


export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStackNavigation /> : <AuthenticatedStackNavigation />}
    </NavigationContainer>
  )
}
