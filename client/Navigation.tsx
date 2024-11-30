import { DarkTheme,DefaultTheme } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginPage from './screens/auth/LoginPage';
import RegiserPage from './screens/auth/RegisterPage';
import AdminLogin from './screens/auth/AdminLogin';
import RegisteredUser from './screens/admin/RegisteredUser';
import Restaurant from './screens/admin/Restaurant';
import AdminSettings from './screens/admin/Settings';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const AdminBottomTab = createBottomTabNavigator();
function AdminGroup() {
    return (
        <AdminBottomTab.Navigator screenOptions={{
            headerShown: false
        }}>
            <AdminBottomTab.Screen name="Users" component={RegisteredUser} options={{
                tabBarIcon: () => {
                    return <AntDesign name="user" size={24} color="#8B5CFF" />
                },
                tabBarActiveTintColor: "#8B5CFF",
            }} />
            <AdminBottomTab.Screen name="Restaurant" component={Restaurant} options={{
                tabBarIcon: () => {
                    return <Ionicons name="restaurant-outline" size={24} color="#8B5CFF" />
                },
                tabBarActiveTintColor: "#8B5CFF",
            }} />
            <AdminBottomTab.Screen name="Settings" component={AdminSettings} options={{
                tabBarIcon: () => {
                    return <AntDesign name="setting" size={24} color="#8B5CFF" />
                },
                tabBarActiveTintColor: "#8B5CFF",
            }} />
        </AdminBottomTab.Navigator>
    )
}

const AuthStack = createNativeStackNavigator();
function MainNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AuthStack.Screen name="Admin" component={AdminGroup} />
            <AuthStack.Screen name="Login" component={LoginPage} />
            <AuthStack.Screen name="Register" component={RegiserPage} />
            <AuthStack.Screen name="Admin Login" component={AdminLogin} />
        </AuthStack.Navigator>
    )
}
const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#1a202c',
    },
  };
export default function Navigation() {
    return (
        <NavigationContainer theme={CustomDarkTheme}>
            <MainNavigator />
        </NavigationContainer>
    )
}