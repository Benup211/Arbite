import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AdminLogoutCard from "../../components/admin/LogoutCard";
import { useTokenStore } from "../../state/Token.state";

function AdminSettings({navigation}:{navigation:any}) {
    const {adminToken}=useTokenStore();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.roundedEdge} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.description}>
                        Manage users, settings, and more.
                    </Text>
                </View>
                <View>
                    <AdminLogoutCard navigate={navigation}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    roundedEdge: {
        height: 200,
        backgroundColor: "#111829",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    content: {
        flex: 1,
        backgroundColor: "#1a202c",
        padding: 20,
        marginTop: -100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent:"space-between"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#8B5CFF",
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        color: "#f2f3f4",
        opacity: 0.7,
    },
});

export default AdminSettings;
