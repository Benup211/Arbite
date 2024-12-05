import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

const restaurant = {
    name: "The Great Restaurant",
    location: "123 Main St, Anytown, USA",
    phone: "(123) 456-7890",
    image: "https://example.com/restaurant.jpg",
};

export default function UserRestaurantDetail() {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.text}>{restaurant.location}</Text>
            <Text style={styles.text}>{restaurant.phone}</Text>
            <Image source={{ uri: restaurant.image }} style={styles.image} />
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
        backgroundColor: "red",
    },
});
