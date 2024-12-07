import {create} from 'zustand';
import ApiManager from '../api/ApiManager';
interface TokenState {
    token: string;
    setToken: (token: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    adminToken: string;
    setAdminToken: (adminToken: string) => void;
    user:{
        id:number,
        username:string,
        phoneno:string,
    },
    admin:{
        id:string,
        username:string,
    }
    setUser: (user: {id:number,username:string,phoneno:string}) => void;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    isAdminAuthenticated:boolean;
    setIsAdminAuthenticated:(isAdminAuthenticated:boolean)=>void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsAuthenticating: (isAuthenticating: boolean) => void;
    checkAuth: (token:string) => void;
    loginUser:(username:string,password:string)=>any;
    adminLogin:(username:string,password:string)=>any;
    checkAdminAuth: (adminToken:string) => any;
}

export const useTokenStore = create<TokenState>((set) => ({
    token: '',
    setToken: (token) => set({token}),
    loading: false,
    setLoading: (loading) => set({loading}),
    adminToken: '',
    setAdminToken: (adminToken) => set({adminToken}),

    user:{
        id:0,
        username:'',
        phoneno:'',
    },
    admin:{
        id:'',
        username:'',
    },
    setUser: (user) => set({user}),
    isAuthenticating: true,
    isAuthenticated: false,
    isAdminAuthenticated:false,
    setIsAdminAuthenticated:(isAdminAuthenticated)=>set({isAdminAuthenticated}),
    setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
    setIsAuthenticating: (isAuthenticating) => set({isAuthenticating}),

    checkAuth: async(token:string) => {

    },

    loginUser:async(username,password)=>{
        set({loading:true});
        try {
            const result = await ApiManager("/auth/login",{
                method:"POST",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                },
                data:JSON.stringify({
                    username:username,
                    password:password
                })
            });
            set({token:result.data.token});
            set({user:result.data.user});
            set({isAuthenticated:true});
            set({loading:false});
            return result.data.token;
        } catch (error) {
            throw error;
        } finally {
            set({loading:false});
        }
    },
    adminLogin:async(username,password)=>{
        set({loading:true});
        try {
            const result = await ApiManager("/admin/login",{
                method:"POST",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                },
                data:JSON.stringify({
                    username:username,
                    password:password
                })
            });
            set({adminToken:result.data.adminToken});
            set({admin:result.data.admin});
            set({isAdminAuthenticated:true});
            set({loading:false});
            return result.data.adminToken;
        } catch (error) {
            throw error;
        } finally {
            set({loading:false});
        }
    },
    checkAdminAuth: async(adminToken:string) => {
        set({loading:true});
        try {
            const result = await ApiManager("/admin/getAdmin",{
                method:"GET",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${adminToken}`
                }
            });
            set({adminToken:adminToken});
            set({admin:result.data.admin});
            set({isAdminAuthenticated:true});
            set({loading:false});
            return result.data.admin;
        } catch (error) {
            throw error;
        } finally {
            set({loading:false});
        }
    },
}));