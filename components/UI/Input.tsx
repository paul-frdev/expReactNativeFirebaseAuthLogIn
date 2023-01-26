import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants';
import IconButton from './IconButton';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { Ionicons } from "@expo/vector-icons";

interface InfoConfigProps {
  KeyboardType?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  numberOfLines?: number;
  autoCorrect?: boolean;
  onChangeText?: (data: string) => void;
  value?: any;
}

interface InputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  inValid?: boolean;
  label: string;
  style?: object;
  secureTextEntry?: boolean;
  textInfoConfig: InfoConfigProps;
  onPressIcon?: () => void;
}
export const Input = ({ label, textInfoConfig, style, inValid, secureTextEntry = false, onPressIcon, iconName = "eye" }: InputProps) => {

  const { passwordVisibility } = useTogglePasswordVisibility();

  const inputStyles: any = [styles.textInput];
  if (textInfoConfig && textInfoConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>{label}</Text>
      <View style={styles.wrapper}>
        <TextInput
          secureTextEntry={secureTextEntry}
          {...textInfoConfig}
          style={inputStyles}
        />
        {passwordVisibility && label === "Password" && (
          <IconButton
            onPress={onPressIcon}
            iconName={iconName}
            color="#000"
            customStyles={styles.eyeIcon}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  wrapper: {
    position: "relative",
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: "700",
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.error50
  },
  eyeIcon: {
    position: "absolute",
    top: -38,
    right: 0
  }
})