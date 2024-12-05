import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import CompletedOrderCard from "../../../components/user/CompletedOrderCard";
export default function CompletedOrders({ navigation }: { navigation: any }) {
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
                        <CompletedOrderCard
                            key={index}
                            restaurantName={order.restaurantName}
                            orderBy={order.orderBy}
                            orderTime={order.orderTime}
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
