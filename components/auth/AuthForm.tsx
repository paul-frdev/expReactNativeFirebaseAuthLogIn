import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../UI/Button';
import { Input } from '../UI/Input';

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
            value: enteredEmail,
          }}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            inValid={emailsDontMatch}
            textInfoConfig={{
              onChangeText: updateInputValueHandler.bind(this, 'confirmEmail'),
              value: enteredConfirmEmail,
              KeyboardType: "email-address"
            }}
          />
        )}
        <Input
          label="Password"
          inValid={passwordIsInvalid}
          textInfoConfig={{
            onChangeText: updateInputValueHandler.bind(this, 'password'),
            secure: true,
            value: enteredPassword
          }}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            inValid={passwordsDontMatch}
            textInfoConfig={{
              onChangeText: updateInputValueHandler.bind(
                this,
                'confirmPassword'
              ),
              secure: true,
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
  form: {}
});