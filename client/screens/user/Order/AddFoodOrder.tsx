import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AddFoodOrder = () => {
    const [isSelected, setIsSelected] = useState(false); // State to track selection

    const handleIconPress = () => {
        setIsSelected(!isSelected); // Toggle the state
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Your Order:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your order..."
                placeholderTextColor="#fff"
            />
            <Text style={styles.label}>Order Tea (Tap To Select):</Text>
            <TouchableOpacity
                onPress={handleIconPress}
                style={styles.iconContainer}
            >
                <FontAwesome
                    name="coffee"
                    size={50}
                    color={isSelected ? "#8B5CFF" : "white"}                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
    },
    iconContainer: {
        marginBottom: 20,
    },
    label: {
        color: "white",
        fontSize: 14,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    input: {
        height: 50,
        width: "100%",
        backgroundColor: "#111829",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        color: "#fff",
    },
    button: {
        backgroundColor: "#111829",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignSelf: "center",
    },
    buttonText: {
        color: "#8B5CFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AddFoodOrder;
