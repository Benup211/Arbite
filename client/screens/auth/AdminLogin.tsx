import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native";
import { s } from "./Auth.style";
import { useState } from "react";
import { useEffect } from "react";
import { useTokenStore } from "../../state/Token.state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../../api/ApiManager";
import Toast from "react-native-toast-message";
export default function AdminLogin({ navigation }: { navigation: any }) {
    const { isAdminAuthenticated, checkAdminAuth, adminLogin,setAdminToken } =
        useTokenStore();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        if (!userName || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        try {
            Toast.show({
                type: "info",
                position: "top",
                text1: "Logging in",
                text2: "Please wait...",
                visibilityTime: 4000,
            });
            const token = await adminLogin(userName, password);
            if (token) {
                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "Success",
                    text2: "Logged in successfully",
                    visibilityTime: 4000,
                });
                await AsyncStorage.setItem("adminToken", token);
                navigation.navigate("Admin" as never);
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.errorMessage || "An error occurred";
            Toast.show({
                type: "error",
                position: "top",
                text1: "Error",
                text2: errorMessage,
                visibilityTime: 4000,
            });
        }
    };
    useEffect(() => {
        const checkAdmin = async () => {
            const adminToken = await AsyncStorage.getItem("adminToken");
            if (adminToken) {
                try {
                    await checkAdminAuth(adminToken).finally(()=>{
                        Toast.show({
                            type: "success",
                            position: "top",
                            text1: "Success",
                            text2: "Logged in successfully",
                            visibilityTime: 4000,
                        }),
                        setAdminToken(adminToken as string),
                        navigation.navigate("Admin" as never)
                    }
                    );
                } catch (error:any) {
                    const errorMessage =
                        error.response?.data?.errorMessage ||
                        "An error occurred";
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "Error",
                        text2: errorMessage,
                        visibilityTime: 4000,
                    });
                    setAdminToken("");
                }
            }
        };
        checkAdmin();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={s.container}>
                <View style={s.logo}>
                    <Image
                        source={require("../../assets/arbite.png")}
                        resizeMode="contain"
                        style={{ width: 200, height: 200 }}
                    />
                </View>
                <View style={s.loginForm}>
                    <Text style={s.welcome}>Admin Login.</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Username"
                        placeholderTextColor={"#666"}
                        keyboardType="default"
                        value={userName}
                        onChangeText={setUserName}
                    />

                    <TextInput
                        style={s.input}
                        placeholder="Password"
                        placeholderTextColor={"#666"}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={s.button} onPress={handleLogin}>
                        <Text style={s.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login" as never);
                        }}
                    >
                        <Text style={s.registerLink}>Back to User Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
