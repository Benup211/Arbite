import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-evenly",
        alignItems:"center",
        marginVertical:20,
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontFamily: "Mono",
        color: "#8B5CFF",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    slogan: {
        fontSize: 14,
        fontFamily: "Mono",
        color: "#8B5CFF",
        textTransform: "uppercase",
    },
    loginForm:{
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 400,
    },
    welcome:{
        fontSize: 20,
        fontWeight: "bold",
        opacity: 0.7,
        textTransform: "uppercase",
        color:"#8B5CFF"
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      button: {
        width: '100%',
        height: 50,
        backgroundColor: '#8B5CFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      registerLink: {
        color: '#8B5CFF',
        marginTop: 10,
      },
});
