import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AddOrder() {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={s.container}>
                <Text style={{ color: "#8B5CFF", fontSize: 18,width:"90%" }}>Choose restaurant:</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue: string) =>
                        setSelectedLanguage(itemValue)
                    }
                    style={s.input}
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <View style={s.btncontainer}>
                        <Text style={s.btntextContainer}>
                            Create Order
                        </Text>
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
