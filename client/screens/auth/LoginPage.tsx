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
import { useNavigation } from "@react-navigation/native";
export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const handleLogin = () => {
        if (!userName || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        // Replace with your actual login API call
        console.log("Login attempt:", { userName, password });
        // Simulate successful login:
        Alert.alert("Success", `Welcome, ${userName}`);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={s.container}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Admin Login" as never);
                    }}
                >
                    <View style={s.logo}>
                        <Image
                            source={require("../../assets/arbite.png")}
                            resizeMode="contain"
                            style={{ width: 200, height: 200 }}
                        />
                    </View>
                </TouchableOpacity>
                <View style={s.loginForm}>
                    <Text style={s.welcome}>Welcome back.</Text>
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
                            navigation.navigate("Register" as never);
                        }}
                    >
                        <Text style={s.registerLink}>
                            Don't have an account? Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
