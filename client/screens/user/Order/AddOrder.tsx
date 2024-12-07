import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAddingRestaurantStore } from "../../../state/user/AddRestaurant.state";
import Toast from "react-native-toast-message";
import { useTokenStore } from "../../../state/Token.state";

export default function AddOrder({navigation}:{navigation:any}) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const {token}=useTokenStore();
    const {
        restaurants,
        loadingRestaurants,
        setLoadingRestaurants,
        getRestaurants,
        createOrderByRestaurant
    } = useAddingRestaurantStore();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                await getRestaurants().finally(() => {
                    Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Restaurants loaded successfully",
                    });
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
    const handleSubmitOrder=async()=>{
        try{
            await createOrderByRestaurant(token,parseInt(selectedLanguage));
            Toast.show({
                type: "success",
                position: "top",
                text1: "Success",
                text2: "Order Created",
                visibilityTime: 4000,
            });
            navigation.navigate("OngoingOrder" as never);

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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={s.container}>
                <Text style={{ color: "#8B5CFF", fontSize: 18, width: "90%" }}>
                    Choose restaurant:
                </Text>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue: string) =>
                        setSelectedLanguage(itemValue)
                    }
                    style={s.input}
                >
                    {restaurants.map((restaurant, index) => (
                        <Picker.Item
                            key={index}
                            label={restaurant.name}
                            value={restaurant.restaurant_id.toString()}
                        />
                    ))}
                </Picker>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                    onPress={()=>{
                        handleSubmitOrder();
                    }}
                >
                    <View style={s.btncontainer}>
                        <Text style={s.btntextContainer}>Create Order</Text>
                        <AntDesign
                            name="check"
                            size={24}
                            style={{ marginTop: -6 }}
                            color="#8B5CFF"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: 50,
        backgroundColor: "#111829",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#8B5CFF",
        color: "#fff",
    },
    btncontainer: {
        width: "90%",
        backgroundColor: "#111829",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
        height: 50,
        borderRadius: 12,
    },
    btntextContainer: {
        color: "gray",
        fontSize: 20,
        textTransform: "capitalize",
        marginBottom: 5,
    },
});
