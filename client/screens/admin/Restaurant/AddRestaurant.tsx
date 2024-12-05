import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    Text,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!name || !location || !number || !image) {
            Alert.alert("All fields are required!");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("number", number);
        if (image) {
            formData.append("image", {
                uri: image,
                type: "image/jpeg",
                name: "photo.jpg",
            } as any);
        }

        try {
            const response = await axios.post(
                "http://your-backend-url/api/submit",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={s.container}>
                    <Text style={s.text}>Name</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Type here.."
                        placeholderTextColor={"#666"}
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={s.text}>Location</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Type here.."
                        placeholderTextColor={"#666"}
                        value={location}
                        onChangeText={setLocation}
                    />
                    <Text style={s.text}>Number</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Type here.."
                        placeholderTextColor={"#666"}
                        value={number}
                        onChangeText={setNumber}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={pickImage} style={s.button}>
                        <Ionicons name="images" size={32} color="#8B5CFF" />
                        <Text style={s.text}>Menu</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={s.image} />}
                    <TouchableOpacity
                        style={s.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
        color: "#fff",
        opacity: 0.6,
        fontWeight: "semibold",
    },
    button: {
        backgroundColor: "#111829",
        color: "#fff",
        padding: 10,
        borderRadius: 4,
        textAlign: "center",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    submitButton: {
        backgroundColor: "#8B5CFF",
        padding: 10,
        borderRadius: 4,
        textAlign: "center",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default AddRestaurant;
