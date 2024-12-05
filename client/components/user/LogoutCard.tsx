import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTokenStore } from "../../state/Token.state";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
const LogoutCard = ({ navigation }: { navigation: any }) => {
    const { setToken, setIsAuthenticated } = useTokenStore();
    const handleUserLogout = async () => {
        Toast.show({
            type: "success",
            position: "top",
            text1: "Success",
            text2: "Logged out successfully",
            visibilityTime: 4000,
        });
        await AsyncStorage.removeItem("userToken").finally(() => {
            setToken("");
            setIsAuthenticated(false);
        });
        navigation.navigate("Login" as never);
    };
    return (
        <TouchableOpacity onPress={handleUserLogout}>
            <View style={s.container}>
                <AntDesign
                    name="logout"
                    style={s.image}
                    size={28}
                    color="#8B5CFF"
                />
                <View>
                    <Text style={s.textContainer}>Logout</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default LogoutCard;

const s = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#111829",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        padding: 10,
        height: 70,
        borderRadius: 12,
        marginVertical: 5,
    },
    image: {
        marginLeft: 10,
    },
    textContainer: {
        color: "gray",
        fontSize: 20,
        textTransform: "capitalize",
        marginBottom: 5,
    },
});
