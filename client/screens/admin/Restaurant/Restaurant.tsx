import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../../../components/admin/RestaurantCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
export default function Restaurant({ navigation }: { navigation: any }) {
    const restaurants = [
        {
            id: 1,
            name: "Annapurna Kitchen's",
            location: "naxal",
            number: "9861245228",
        },
        {
            id: 2,
            name: "Bistro Delight",
            location: "thamel",
            number: "9801234567",
        },
        {
            id: 3,
            name: "Gourmet Paradise",
            location: "baneshwor",
            number: "9812345678",
        },
        
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={s.restaurants}>
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            location={restaurant.location}
                            number={restaurant.number}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Add Restaurant" as never);
                }}
                style={s.addButton}
            >
                <Ionicons name="add-circle" size={52} color="#8B5CFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    restaurants: {
        padding: 10,
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
