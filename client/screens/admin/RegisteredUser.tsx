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
import { useEffect, useState } from "react";
import { useUsersStore, UserProps } from "../../state/admin/Users.state";
import { useTokenStore } from "../../state/Token.state";
import Toast from "react-native-toast-message";
export default function RegisteredUser() {
    const { getUsers, users,loadingUsers,setLoadingUsers } = useUsersStore();
    const { adminToken } = useTokenStore();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await getUsers(adminToken).finally(() => {
                    setLoadingUsers(false);
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
        fetchUsers();
    }, []);
    if(loadingUsers){
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
        <SafeAreaView>
            <ScrollView>
                <View style={s.users}>
                    {users.map((user, index) => (
                        <UserCard
                            key={index}
                            username={user.username}
                            number={user.phone_no}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    users: {
        padding: 10,
    },
});
