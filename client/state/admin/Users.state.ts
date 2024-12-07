import { create } from 'zustand';
import ApiManager from '../../api/ApiManager';

export interface UserProps {
    user_id: number;
    username: string;
    phone_no: string;
}

interface UsersState {
    users: UserProps[];
    setUsers: (users: UserProps[]) => void;
    loadingUsers: boolean;
    setLoadingUsers: (loadingUsers: boolean) => void;
    getUsers: (token:string) => any;
}

export const useUsersStore = create<UsersState>((set)=>({
    users: [],
    setUsers: (users) => set({users}),
    loadingUsers: false,
    setLoadingUsers: (loadingUsers) => set({loadingUsers}),
    getUsers: async(token) => {
        set({loadingUsers: true});
        try{
            const users = await ApiManager("/admin/allUsers",{
                method:"GET",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            set({users:users.data});
        }catch(error){
            throw error;
        }
    }
}));