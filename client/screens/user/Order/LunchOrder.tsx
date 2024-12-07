import {
    Text,
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import FoodOrderCard from "../../../components/user/FoodOrderCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTokenStore } from "../../../state/Token.state";
import { useEffect } from "react";
import useLunchOrderStore from "../../../state/user/Lunch.order.state";
import Toast from "react-native-toast-message";
type LunchOrdersParams = {
    restaurantName: string;
    orderBy: string;
    orderTime: string;
    order_id:number
    order_user_id:number
};

type LunchOrdersScreenProps = NativeStackScreenProps<{LunchOrder: LunchOrdersParams }>;

const LunchOrder: React.FC<LunchOrdersScreenProps> = ({
    route,
    navigation,
}) => {
    const { restaurantName, orderBy, orderTime,order_id,order_user_id } =  route.params as LunchOrdersParams;
    const {user,token}=useTokenStore();
    const {Lunchorders,getLunchOrders,setLoadingLunchOrders,loadingLunchOrders,completingOrder,setCompletingOrder,completeOrder}=useLunchOrderStore();
    const handleCompleteOrder=async()=>{
        try{
            await completeOrder(token,order_id).finally(()=>{
                setCompletingOrder(false);
                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "Success",
                    text2: "Order Marked Completed",
                    visibilityTime: 4000,
                });
                navigation.navigate("OngoingOrder" as never);
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
    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                await getLunchOrders(token,order_id).finally(()=>{
                    setLoadingLunchOrders(false);
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
    if(loadingLunchOrders){
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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{restaurantName}</Text>
                <Text style={styles.text}>Order By:{orderBy}</Text>
                <Text style={styles.text}>{orderTime}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Order Food" as never,{
                            restaurantName,
                            orderBy,
                            orderTime,
                            order_id,
                            order_user_id
                        });
                    }}
                    style={styles.add}
                >
                    <Ionicons name="add-circle" size={52} color="#8B5CFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.orders}>
                {Lunchorders.map((order, index) => (
                    <FoodOrderCard
                        key={index}
                        lunchOrder={order.lunchOrder}
                        orderBy={order.user.username}
                        tea={order.tea}
                    />
                ))}
                {Lunchorders.length === 0 && (
                    <View style={{ alignItems: "center", marginVertical: 20 }}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                            Empty! Tap on floating icon to Order Lunch
                        </Text>
                    </View>
                )}
            </View>
            {(user.id === order_user_id) &&
            (
                <TouchableOpacity
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom:10
                }}
                disabled={completingOrder}
                onPress={handleCompleteOrder}
            >
                <View style={styles.btncontainer}>
                    <Text style={styles.btntextContainer}>Mark Completed</Text>
                    <AntDesign name="check" size={24} style={{marginTop:-6}} color="#8B5CFF" />
                </View>
            </TouchableOpacity>
            )}
        </ScrollView>
    );
};
export default LunchOrder;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    add: {
        alignSelf: "flex-end",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#8B5CFF",
        marginBottom: 8,
        textTransform: "capitalize",
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
    orders: {
        justifyContent: "center",
        alignItems: "center",
    },
    btncontainer: {
        width: "90%",
        backgroundColor: "#111829",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
        height: 70,
        borderRadius: 12,
    },
    btntextContainer: {
        color: "gray",
        fontSize: 20,
        textTransform: "capitalize",
        marginBottom: 5,
    },
});
