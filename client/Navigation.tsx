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
import UserOrders from "./screens/user/Order/UserOrders";
import UserSettings from "./screens/user/UserSettings";
import AddRestaurant from "./screens/admin/Restaurant/AddRestaurant";
import RestaurantDetail from "./screens/admin/Restaurant/RestaurantDetail";

import RegiserPage from "./screens/auth/RegisterPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserRestaurant from "./screens/user/Restaurant/Restaurant";
import UserRestaurantDetail from "./screens/user/Restaurant/RestaurantDetail";
import CompletedOrders from "./screens/user/Order/CompletedOrder";
import LunchOrder from "./screens/user/Order/LunchOrder";
import AddOrder from "./screens/user/Order/AddOrder";
import CompletedLunchOrder from "./screens/user/Order/CompletedLunchOrder";
import AddFoodOrder from "./screens/user/Order/AddFoodOrder";
import { useTokenStore } from "./state/Token.state";
import { useEffect } from "react";
import ApiManager from "./api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

const UserRestaurantStack = createNativeStackNavigator();
function UserRestaurantStackScreen({ navigation }: { navigation: any }) {
    return (
        <UserRestaurantStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111829",
                },
            }}
        >
            <UserRestaurantStack.Screen
                name="User Restaurant"
                component={UserRestaurant}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#111829",
                    },
                    title: "Restaurants",
                }}
            />
            <UserRestaurantStack.Screen
                name="User Restaurant Detail"
                component={UserRestaurantDetail}
                options={{ presentation: "modal", title: "Restaurant Detail" }}
            />
        </UserRestaurantStack.Navigator>
    );
}

//order types
const UserOrderTopTab = createMaterialTopTabNavigator();
function OrderGroup() {
    return (
        <UserOrderTopTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#111829",
                },
                tabBarLabelStyle: {
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: 12,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#8B5CFF",
                    height: 3,
                },
            }}
        >
            <UserOrderTopTab.Screen name="Ongoing" component={UserOrders} />
            <UserOrderTopTab.Screen
                name="Completed"
                component={CompletedOrders}
            />
        </UserOrderTopTab.Navigator>
    );
}

//order-lunch list
const UserOrderOngoing = createNativeStackNavigator();
function UserOrderOngoingScreen({ navigation }: { navigation: any }) {
    return (
        <UserOrderOngoing.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111829",
                },
                headerShown: true,
                title: "Orders",
            }}
        >
            <UserOrderOngoing.Screen
                name="OngoingOrder"
                component={OrderGroup}
                options={{
                    headerShown: true,
                }}
            />
            <UserOrderOngoing.Screen
                name="Lunch Orders"
                component={LunchOrder}
                options={{
                    headerShown: true,
                    title: "Lunch Order",
                }}
            />
            <UserOrderOngoing.Screen
                name="Add Order"
                component={AddOrder}
                options={{
                    headerShown: true,
                    title: "Add Order",
                }}
            />
            <UserOrderOngoing.Screen
                name="Completed Lunch Orders"
                component={CompletedLunchOrder}
                options={{ presentation: "modal", title: "Completed Lunch" }}
            />
            <UserOrderOngoing.Screen
                name="Order Food"
                component={AddFoodOrder}
                options={{
                    headerShown: true,
                    title: "Order Food",
                }}
            />
        </UserOrderOngoing.Navigator>
    );
}

const UserBottomTab = createBottomTabNavigator();
function UserGroup() {
    return (
        <UserBottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#111829",
                },
                headerStyle: {
                    backgroundColor: "#111829",
                },
            }}
        >
            <UserBottomTab.Screen
                name="Orders"
                component={UserOrderOngoingScreen}
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
                    headerShown: false,
                    tabBarActiveTintColor: "#8B5CFF",
                }}
            />
            <UserBottomTab.Screen
                name="Restaurant Stack"
                component={UserRestaurantStackScreen}
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
const MainNavigator = () => {
    const { isAuthenticated } = useTokenStore();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {isAuthenticated ? (
                <>
                    <AuthStack.Screen name="User" component={UserGroup} />
                </>
            ) : (
                <>

                    <AuthStack.Screen name="Login" component={LoginPage} />
                    <AuthStack.Screen
                        name="Admin Login"
                        component={AdminLogin}
                    />
                    <AuthStack.Screen name="Register" component={RegiserPage} />
                    <AuthStack.Screen name="Admin" component={AdminGroup} />
                </>
            )}
        </AuthStack.Navigator>
    );
};
const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#1a202c",
    },
};
export default function Navigation() {
    const {
        user,
        setUser,
        setIsAuthenticated,
        setIsAuthenticating,
        isAuthenticating,
    } = useTokenStore();
    const { token, setToken } = useTokenStore();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("userToken");
            if (token) {
                try {
                    const result = await ApiManager("/auth/getUser", {
                        method: "GET",
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser({
                        id: result.data.user.id,
                        username: result.data.user.username,
                        phoneno: result.data.user.phoneno,
                    });
                    setToken(token);
                    setIsAuthenticated(true);
                    Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Token validated successfully",
                    });
                } catch (error) {
                    await AsyncStorage.removeItem("userToken");
                    Toast.show({
                        type: "error",
                        text1: "Authentication Failed",
                        text2: "Invalid or expired token.",
                    });
                } finally {
                    setIsAuthenticating(false);
                }
            } else {
                setIsAuthenticating(false);
                Toast.show({
                    type: "info",
                    text1: "Notice",
                    text2: "Please log in to continue.",
                });
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticating) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <>
            <NavigationContainer theme={CustomDarkTheme}>
                <MainNavigator />
            </NavigationContainer>
            <Toast />
        </>
    );
}
