import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const RestaurantCard = ({
    name,
    location,
    number,
    navigation,
}: {
    name: string;
    location: string;
    number: string;
    navigation: any;
}) => {
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Restaurant Detail" as never)
        }}>
            <View style={s.container}>
                <Ionicons
                    name="restaurant"
                    style={s.image}
                    size={48}
                    color="#8B5CFF"
                />
                <View style={{ padding: 5, flex: 1 }}>
                    <Text style={s.textContainer}>{name}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={s.location}>{location}</Text>
                        <Text style={s.number}>{number}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default RestaurantCard;

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
