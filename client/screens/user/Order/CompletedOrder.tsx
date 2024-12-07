import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import CompletedOrderCard from "../../../components/user/CompletedOrderCard";
import { useTokenStore } from "../../../state/Token.state";
import { useOrderStore } from "../../../state/user/Order.state";
import Toast from "react-native-toast-message";
export default function CompletedOrders({ navigation }: { navigation: any }) {
    const { getCompletedOrders, completedOrders, loadingOrders, setLoadingOrders } =
        useOrderStore();
    const { token } = useTokenStore();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                await getCompletedOrders(token).finally(() => {
                    setLoadingOrders(false);
                });
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.errorMessage || "An error occurred";
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Error",
                    text2: errorMessage,
                    visibilityTime: 4000,
                });
            }
        };
        fetchOrders();
    }, []);
    if (loadingOrders) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ScrollView>
                    <View style={{}}>
                        <Text>Loading...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={s.restaurants}>
                    {completedOrders.map((order, index) => (
                        <CompletedOrderCard
                            key={index}
                            order_id={order.order_id}
                            restaurantName={order.restaurant.name}
                            orderBy={order.ordered_by_user.username}
                            orderTime={new Date(order.timestamp)}
                            navigation={navigation}
                        />
                    ))}
                    {completedOrders.length === 0 && (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                            No Orders Completed
                        </Text>
                    </View>
                    )}
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
