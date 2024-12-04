import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "../../components/admin/UserCard";
export default function RegisteredUser() {
    const users = [
        {
            id: 1,
            username: "John Doe",
            phoneNumber: "1234567890",
        },
        {
            id: 2,
            username: "Jane Doe",
            phoneNumber: "1234567890",
        },
        {
            id: 3,
            username: "John Smith",
            phoneNumber: "1234567890",
        },
        {
            id: 4,
            username: "Jane Smith",
            phoneNumber: "1234567890",
        },
    ];
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={s.users}>
                    <UserCard username="benup" number="9861245228"/>
                    <UserCard username="benup" number="9861245228"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    users:{
        padding:10
    }
});
