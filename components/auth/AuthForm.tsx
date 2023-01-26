import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import Button from '../UI/Button';
import { Input } from '../UI/Input';
import { Ionicons } from "@expo/vector-icons";

interface AuthFormProps {
  isLogin: boolean | undefined;
  credentialsInvalid: any;
  onSubmit: (data: any) => void;
}

export const AuthForm = ({ isLogin, credentialsInvalid, onSubmit }: AuthFormProps) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          inValid={emailIsInvalid}
          textInfoConfig={{
            KeyboardType: 'email-address',
            onChangeText: updateInputValueHandler.bind(this, 'email'),
            value: enteredEmail.toLowerCase(),
          }}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            inValid={emailsDontMatch}
            textInfoConfig={{
              onChangeText: updateInputValueHandler.bind(this, 'confirmEmail'),
              value: enteredConfirmEmail.toLowerCase(),
              KeyboardType: "email-address",
            }}
          />
        )}
        <Input
          label="Password"
          inValid={passwordIsInvalid}
          secureTextEntry={passwordVisibility}
          onPressIcon={handlePasswordVisibility}
          iconName={rightIcon as keyof typeof Ionicons.glyphMap}
          textInfoConfig={{
            onChangeText: updateInputValueHandler.bind(this, 'password'),
            value: enteredPassword
          }}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            inValid={passwordsDontMatch}
            secureTextEntry={passwordVisibility}
            onPressIcon={handlePasswordVisibility}
            iconName={rightIcon as keyof typeof Ionicons.glyphMap}
            textInfoConfig={{
              onChangeText: updateInputValueHandler.bind(
                this,
                'confirmPassword'
              ),
              value: enteredConfirmPassword
            }}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  form: {
    backgroundColor: GlobalStyles.colors.gray500
  }
});