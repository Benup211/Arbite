import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function foodOrderCard() {
    return (
        <View style={s.container}>
            <View>
                <Ionicons name="fast-food" size={48} color="#8B5CFF" />
            </View>
            <View style={s.order}>
                <View style={s.lunch}>
                    <Text style={s.food}>Momo</Text>
                    <Text style={s.orderBy}>Order By:benup211</Text>
                </View>
                <View style={s.tea}>
                    <AntDesign name="plus" size={14} color="#8B5CFF" />
                    <Feather name="coffee" size={32} color="#8B5CFF" />
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 110,
        width: "90%",
        backgroundColor: "#111829",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    order: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },
    lunch: {
        justifyContent: "center",
        alignItems: "flex-start",
    },
    tea:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap:2
    },
    food:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff'
    },
    orderBy:{
        fontSize:14,
        color:'gray'
    }
});
