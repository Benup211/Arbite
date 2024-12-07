import { Text, ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import FoodOrderCard from "../../../components/user/FoodOrderCard";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTokenStore } from "../../../state/Token.state";
import useLunchOrderStore from "../../../state/user/Lunch.order.state";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

type LunchOrdersParams = {
    order_id:number
    restaurantName: string;
    orderBy: string;
    orderTime: string;
};

type LunchOrdersScreenProps = NativeStackScreenProps<{ CompletedLunchOrder: LunchOrdersParams }>;

const CompletedLunchOrder: React.FC<LunchOrdersScreenProps> = ({ route }) => {
    const { restaurantName, orderBy, orderTime,order_id } =  route.params as LunchOrdersParams;
    const {user,token}=useTokenStore();
    const {completeLunchOrders,getCompleteOrders,setLoadingCompleteLunchOrders,loadingCompleteLunchOrders,setCompletingOrder,completeOrder}=useLunchOrderStore();
    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                await getCompleteOrders(token,order_id).finally(()=>{
                    setLoadingCompleteLunchOrders(false);
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
    if(loadingCompleteLunchOrders){
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
            </View>
            <View style={styles.orders}>
            {completeLunchOrders.map((order, index) => (
                    <FoodOrderCard
                        key={index}
                        lunchOrder={order.lunchOrder}
                        orderBy={order.user.username}
                        tea={order.tea}
                    />
                ))}
                {completeLunchOrders.length === 0 && (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                            Empty Lunch Orders
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
export default CompletedLunchOrder;
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
        textTransform:'capitalize'
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
    orders:{
        justifyContent:'center',
        alignItems:'center'
    }
});
