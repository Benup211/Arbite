import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./screens/auth/LoginPage";
import AdminLogin from "./screens/auth/AdminLogin";
import RegisteredUser from "./screens/admin/RegisteredUser";
import Restaurant from "./screens/admin/Restaurant/Restaurant";
import AdminSettings from "./screens/admin/Settings";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

//user
import UserOrders from "./screens/user/UserOrders";
import UserSettings from "./screens/user/UserSettings";
import AddRestaurant from "./screens/admin/Restaurant/AddRestaurant";
import RestaurantDetail from "./screens/admin/Restaurant/RestaurantDetail";

import RegiserPage from "./screens/auth/RegisterPage";
const RestaurantStack = createNativeStackNavigator();
function RestaurantStackScreen({ navigation }: { navigation: any }) {
    return (
        <RestaurantStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111829",
                },
            }}
        >
            <RestaurantStack.Screen
                name="Restaurant"
                component={Restaurant}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#111829",
                    },
                }}
            />
            <RestaurantStack.Screen
                name="Add Restaurant"
                component={AddRestaurant}
                options={{ presentation: "modal" }}
            />
            <RestaurantStack.Screen
                name="Restaurant Detail"
                component={RestaurantDetail}
                options={{ presentation: "modal" }}
            />
        </RestaurantStack.Navigator>
    );
}

const AdminBottomTab = createBottomTabNavigator();
function AdminGroup() {
    return (
        <AdminBottomTab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    backgroundColor: "#111829",
                },
                headerStyle: {
                    backgroundColor: "#111829",
                },
            }}
        >
            <AdminBottomTab.Screen
                name="Users"
                component={RegisteredUser}
                options={{
                    tabBarIcon: () => {
                        return (
                            <AntDesign name="user" size={24} color="#8B5CFF" />
                        );
                    },
                    tabBarActiveTintColor: "#8B5CFF",
                }}
            />
            <AdminBottomTab.Screen
                name="Restaurant Stack"
                component={RestaurantStackScreen}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Ionicons
                                name="restaurant-outline"
                                size={24}
                                color="#8B5CFF"
                            />
                        );
                    },
                    tabBarActiveTintColor: "#8B5CFF",
                    headerShown: false,
                    title: "Restaurants",
                }}
            />
            <AdminBottomTab.Screen
                name="Settings"
                component={AdminSettings}
                options={{
                    tabBarIcon: () => {
                        return (
                            <AntDesign
                                name="setting"
                                size={24}
                                color="#8B5CFF"
                            />
                        );
                    },
                    tabBarActiveTintColor: "#8B5CFF",
                    headerShown: false,
                }}
            />
        </AdminBottomTab.Navigator>
    );
}

const UserBottomTab = createBottomTabNavigator();
function UserGroup() {
    return (
        <UserBottomTab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <UserBottomTab.Screen
                name="Orders"
                component={UserOrders}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Ionicons
                                name="fast-food-outline"
                                size={24}
                                color="#8B5CFF"
                            />
                        );
                    },
                    tabBarActiveTintColor: "#8B5CFF",
                }}
            />
            <UserBottomTab.Screen
                name="Settings"
                component={UserSettings}
                options={{
                    tabBarIcon: () => {
                        return (
                            <AntDesign
                                name="setting"
                                size={24}
                                color="#8B5CFF"
                            />
                        );
                    },
                    tabBarActiveTintColor: "#8B5CFF",
                }}
            />
        </UserBottomTab.Navigator>
    );
}

const AuthStack = createNativeStackNavigator();
function MainNavigator() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Admin" component={AdminGroup} />
            <AuthStack.Screen name="User" component={UserGroup} />
            <AuthStack.Screen name="Login" component={LoginPage} />
            <AuthStack.Screen name="Register" component={RegiserPage} />
            <AuthStack.Screen name="Admin Login" component={AdminLogin} />
        </AuthStack.Navigator>
    );
}
const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#1a202c",
    },
};
export default function Navigation() {
    return (
        <NavigationContainer theme={CustomDarkTheme}>
            <MainNavigator />
        </NavigationContainer>
    );
}
