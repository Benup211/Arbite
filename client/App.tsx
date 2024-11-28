import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiManager from './api/ApiManager';
import { useTokenStore } from './state/Token.state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './screens/auth/LoginPage';
import RegiserPage from './screens/auth/RegisterPage';
import AdminLogin from './screens/auth/AdminLogin';
import Navigation from './Navigation';
export default function App() {
  const tokenData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTczMjc5Nzg1NCwiZXhwIjoxNzMzNDAyNjU0fQ.Y1H3Y4IiTBb0jyXUuPM3fiI1XKZPaBEA8ydTvZgS2ok';
  const {token,setToken,loading,setLoading} = useTokenStore();
  const [data,setData]=useState('');
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const result = await ApiManager("/auth/getUser",{
    //       method:"GET",
    //       withCredentials:true,
    //       headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":`Bearer ${token}`
    //       }
    //     });
    //     setData(result.data.username);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    const fetchToken = async () => {
      const userToken=await AsyncStorage.getItem('userToken');
      console.log(userToken);
      if(!userToken){
        setToken(tokenData);
        setLoading(false);
      }
    }
    fetchToken();
  }, []);

  if(loading){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
