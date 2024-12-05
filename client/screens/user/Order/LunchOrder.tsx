import {
    Text,
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import FoodOrderCard from "../../../components/user/FoodOrderCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type LunchOrdersParams = {
    restaurantName: string;
    orderBy: string;
    orderTime: string;
};

type LunchOrdersScreenProps = NativeStackScreenProps<{LunchOrder: LunchOrdersParams }>;

const LunchOrder: React.FC<LunchOrdersScreenProps> = ({
    route,
    navigation,
}) => {
    const { restaurantName, orderBy, orderTime } =  route.params as LunchOrdersParams;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{restaurantName}</Text>
                <Text style={styles.text}>Order By:{orderBy}</Text>
                <Text style={styles.text}>{orderTime}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Order Food" as never);
                    }}
                    style={styles.add}
                >
                    <Ionicons name="add-circle" size={52} color="#8B5CFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.orders}>
                <FoodOrderCard />
                <FoodOrderCard />
                <FoodOrderCard />
                <FoodOrderCard />
            </View>
            <TouchableOpacity
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom:10
                }}
            >
                <View style={styles.btncontainer}>
                    <Text style={styles.btntextContainer}>Mark Completed</Text>
                    <AntDesign name="check" size={24} style={{marginTop:-6}} color="#8B5CFF" />
                </View>
            </TouchableOpacity>
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
