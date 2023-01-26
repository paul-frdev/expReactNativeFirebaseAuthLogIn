import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from '../constants';
import AllExpenses from '../screens/AllExpenses';
import RecentExpenses from '../screens/RecentExpenses';
import { BottomStackParamList } from '../types/navigation';
import { Ionicons } from "@expo/vector-icons";
import IconButton from '../components/UI/IconButton';
import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

const BottomTabsStack = createBottomTabNavigator<BottomStackParamList>();

const BottomTabsNavigation = () => {
  const { logout } = useContext(AuthContext);
  return (
    <BottomTabsStack.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <View style={styles.containerHeaderRight}>
          <IconButton
            iconName="add"
            size={28}
            color={tintColor}
            customStyles={styles.addButton}
            onPress={() => navigation.navigate("ManageExpense")}
          />
          <IconButton
            iconName="log-out"
            size={32}
            color={tintColor}
            onPress={logout}
          />
        </View>
      )
    })}>
      <BottomTabsStack.Screen name="AllExpenses" component={AllExpenses} options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
      }} />
      <BottomTabsStack.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: "Recent expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />
      }} />
    </BottomTabsStack.Navigator>
  );
};

export default BottomTabsNavigation;

const styles = StyleSheet.create({
  containerHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    marginRight: 1
  },
})

