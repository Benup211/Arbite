import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
const LogoutCard = () => {
    return (
        <TouchableOpacity>
            <View style={s.container}>
                <AntDesign name="logout" style={s.image} size={28} color="#8B5CFF" />
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
