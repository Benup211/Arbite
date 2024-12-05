import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import UserRestaurantCard from "../../../components/user/RestaurantCard";
export default function UserRestaurant({ navigation }: { navigation: any }) {
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
                        <UserRestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            location={restaurant.location}
                            number={restaurant.number}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    restaurants: {
        padding: 10,
    },
});
