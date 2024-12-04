import { View, Text, Image, StyleSheet } from "react-native";

const UserCard = ({username,number}:{username:string,number:string}) => {
    return (
        <View
            style={s.container}
        >
            <Image
                source={{
                    uri: `https://avatar.iran.liara.run/username?username=${username}`,
                }}
                style={s.image}
                resizeMode="contain"
            />
            <View>
                <Text style={s.textContainer}>
                    {username}
                </Text>
                <Text style={s.number}>{number}</Text>
            </View>
        </View>
    );
};
export default UserCard;


const s=StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"#111829",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:20,
        padding:10,
        height:110,
        borderRadius:24,
        marginVertical:5,
    },
    image:{
        width:60,
        height:60,
    },
    textContainer:{
        color:"gray",
        fontSize:20,
        textTransform:"capitalize",
        marginBottom:5,
    },
    number:{
        color:"gray",
        fontSize:16,
    }
})