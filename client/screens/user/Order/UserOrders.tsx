import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../../components/user/OrderCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
export default function UserOrders({ navigation }: { navigation: any }) {
    const orders=[
        {
            restaurantName:"restaurant1",
            orderBy:"user1",
            orderTime:new Date(),
        },
        {
            restaurantName:"restaurant2",
            orderBy:"user2",
            orderTime:new Date(),
        },
        {
            restaurantName:"restaurant3",
            orderBy:"user3",
            orderTime:new Date(),
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={s.restaurants}>
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            restaurantName={order.restaurantName}
                            orderBy={order.orderBy}
                            orderTime={order.orderTime}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Add Order" as never);
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
