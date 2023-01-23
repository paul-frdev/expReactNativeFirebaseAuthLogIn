import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants'

interface Props {
  message?: string;
}
export const LoadingOverlay = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary700
  },
  message: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 24,
  },
})