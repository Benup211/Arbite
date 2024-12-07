import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useRestaurantStore,RestaurantProps } from "../../../state/Restaurant.state";


const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export default function RestaurantDetail({route}: {route: any}) {
    const { id } = route.params;
    const {restaurants}=useRestaurantStore();
    const restaurant: RestaurantProps | undefined = restaurants.find((restaurant) => restaurant.restaurant_id === id);
    if (!restaurant) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Restaurant not found</Text>
            </SafeAreaView>
        );
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.text}>{restaurant.location}</Text>
            <Text style={styles.text}>{restaurant.phone_no}</Text>
            <Image source={{ uri: `${apiUrl}/${restaurant.menu_image}` }} style={styles.image}resizeMode="contain" />
        </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#8B5CFF",
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
        color: "gray",
    },
    image: {
        width: "100%",
        height: 600,
        marginTop: 16,
    },
});
