import { Text, ScrollView, StyleSheet, View } from "react-native";
import FoodOrderCard from "../../../components/user/FoodOrderCard";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type LunchOrdersParams = {
    restaurantName: string;
    orderBy: string;
    orderTime: string;
};

type LunchOrdersScreenProps = NativeStackScreenProps<{ CompletedLunchOrder: LunchOrdersParams }>;

const CompletedLunchOrder: React.FC<LunchOrdersScreenProps> = ({ route }) => {
    const { restaurantName, orderBy, orderTime } = route.params as LunchOrdersParams;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{restaurantName}</Text>
                <Text style={styles.text}>Order By:{orderBy}</Text>
                <Text style={styles.text}>{orderTime}</Text>
            </View>
            <View style={styles.orders}>
                <FoodOrderCard/>
                <FoodOrderCard/>
                <FoodOrderCard/>
                <FoodOrderCard/>
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
