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
import React, { useEffect } from "react";
import { useOrderStore } from "../../../state/user/Order.state";
import { useTokenStore } from "../../../state/Token.state";
import Toast from "react-native-toast-message";
export default function UserOrders({ navigation }: { navigation: any }) {
    const {getOngoingOrders,orders,loadingOrders,setLoadingOrders}=useOrderStore();
    const {token}=useTokenStore();
    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                await getOngoingOrders(token).finally(()=>{
                    setLoadingOrders(false);
                });
            }catch(error:any){
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
        }
        fetchOrders();
    },[])
    if(loadingOrders){
        return(
            <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            order_id={order.order_id}
                            restaurantName={order.restaurant.name}
                            orderBy={order.ordered_by_user.username}
                            order_user_id={order.ordered_by_user.user_id}
                            orderTime={new Date(order.timestamp)}
                            navigation={navigation}
                        />
                    ))}
                    {orders.length === 0 && (
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                            Empty! Tap on floating icon to Add Order
                        </Text>
                    </View>
                    )}
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
