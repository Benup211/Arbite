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
                <View>
                    <DataTable>
                        <DataTable.Header style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
                            <DataTable.Title><Text style={{color:'gray',fontWeight:'semibold',textTransform:'uppercase'}}>Username</Text></DataTable.Title>
                            <DataTable.Title numeric>
                            <Text style={{color:'gray',fontWeight:'semibold',textTransform:'uppercase'}}>Phone Number</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row
                            style={{ borderWidth: 0, borderBottomWidth: 2 }}
                        >
                            <DataTable.Cell>John Doe</DataTable.Cell>
                            <DataTable.Cell numeric>25</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Jane Smith</DataTable.Cell>
                            <DataTable.Cell numeric>30</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Olu Ola</DataTable.Cell>
                            <DataTable.Cell numeric>39</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
