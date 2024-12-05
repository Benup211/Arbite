import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const OrderCard = ({
    restaurantName,
    orderBy,
    orderTime,
    navigation,
}: {
    restaurantName: string;
    orderBy: string;
    orderTime: Date;
    navigation: any;
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Lunch Orders" as never,{
                    restaurantName:restaurantName,
                    orderBy:orderBy,
                    orderTime:orderTime.toDateString(),
                });
            }}
        >
            <View style={s.container}>
                <MaterialIcons
                    name="restaurant"
                    style={s.image}
                    size={48}
                    color="#8B5CFF"
                />
                <View style={{ padding: 5, flex: 1 }}>
                    <Text style={s.textContainer}>{restaurantName}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={s.location}>{orderBy}</Text>
                        <Text style={s.number}>
                            {orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {orderTime.toLocaleDateString([], { month: 'short', day: '2-digit' })}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default OrderCard;

const s = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#111829",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        padding: 10,
        height: 110,
        borderRadius: 24,
        marginVertical: 5,
    },
    image: {
        marginLeft: 20,
    },
    textContainer: {
        color: "gray",
        fontSize: 20,
        textTransform: "capitalize",
        marginBottom: 5,
    },
    number: {
        color: "gray",
        fontSize: 14,
        marginRight: 20,
    },
    location: {
        color: "gray",
        fontSize: 14,
        textTransform: "capitalize",
    },
});
