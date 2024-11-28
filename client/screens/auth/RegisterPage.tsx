import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native";
import { s } from "./Auth.style";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function RegiserPage() {
    const [userName, setUserName] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const handleRegister = () => {
        if (!userName || !password || !phoneno || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={s.container}>
                <View style={s.logo}>
                    <Text style={s.title}>Arbite</Text>
                    <Text style={s.slogan}>Taste Innovation</Text>
                </View>
                <View style={s.loginForm}>
                    <Text style={s.welcome}>Create Account.</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Username"
                        keyboardType="default"
                        value={userName}
                        onChangeText={setUserName}
                    />
                    <TextInput
                        style={s.input}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        value={phoneno}
                        onChangeText={setPhoneno}
                    />
                    <TextInput
                        style={s.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={s.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={s.button} onPress={handleRegister}>
                        <Text style={s.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {navigation.navigate("Login" as never)}}>
                        <Text style={s.registerLink}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
