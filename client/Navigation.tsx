import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './screens/auth/LoginPage';
import RegiserPage from './screens/auth/RegisterPage';
import AdminLogin from './screens/auth/AdminLogin';
import { DarkTheme,DefaultTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegiserPage} />
            <Stack.Screen name="Admin" component={AdminLogin} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <AuthStack />
        </NavigationContainer>
    )
}