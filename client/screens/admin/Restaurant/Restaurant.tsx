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
import React, { useEffect } from "react";
import { useRestaurantStore } from "../../../state/Restaurant.state";
import Toast from "react-native-toast-message";
export default function Restaurant({ navigation }: { navigation: any }) {
    const {getRestaurants,restaurants,loadingRestaurants,setLoadingRestaurants}=useRestaurantStore();
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                await getRestaurants().finally(() => {
                    setLoadingRestaurants(false);
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
        fetchRestaurants();
    }, []);
    if(loadingRestaurants){
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
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.restaurant_id}
                            id={restaurant.restaurant_id}
                            name={restaurant.name}
                            location={restaurant.location}
                            number={restaurant.phone_no}
                            navigation={navigation}
                        />
                    ))}
                {restaurants.length === 0 && (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{fontSize:16,color:'#fff'}}>Empty! Tap on floating icon to Add Restaurant</Text>
                    </View>
                )}
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
