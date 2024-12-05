import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTokenStore } from "../../state/Token.state";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AdminLogoutCard = ({navigate}:{navigate:any}) => {
    const {setAdminToken,setIsAdminAuthenticated}=useTokenStore();
    const handleLogout = async () => {
        await AsyncStorage.removeItem("adminToken").finally(()=>{
            setAdminToken("");
            setIsAdminAuthenticated(false);
            Toast.show({
                type: "success",
                position: "top",
                text1: "Success",
                text2: "Logged out successfully",
                visibilityTime: 4000,
            });
            navigate.navigate("Admin Login" as never);
        });
    }
    return (
        <TouchableOpacity onPress={()=>{
            handleLogout()
        }}>
            <View style={s.container}>
                <AntDesign name="logout" style={s.image} size={28} color="#8B5CFF" />
                <View>
                    <Text style={s.textContainer}>Logout</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default AdminLogoutCard;

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
    image:{
        marginLeft:10
    },
    textContainer: {
        color: "gray",
        fontSize: 20,
        textTransform: "capitalize",
        marginBottom: 5,
    },
});
