import {create} from 'zustand';
import ApiManager from '../../api/ApiManager';

interface Restaurant {
    name: string;
}

interface OrderedByUser {
    user_id: number;
    username: string;
}

interface Order {
    order_id: number;
    timestamp: string;
    restaurant: Restaurant;
    ordered_by_user: OrderedByUser;
}

interface OrderState {
    orders: Order[];
    completedOrders: Order[];
    setOrders: (orders: Order[]) => void;
    setCompletedOrders: (completedOrders: Order[]) => void;
    loadingOrders: boolean;
    setLoadingOrders: (loadingOrders: boolean) => void;
    getOngoingOrders: (token:string) => any;
    getCompletedOrders: (token:string) => any;
}

export const useOrderStore = create<OrderState>((set)=>({
    orders: [],
    completedOrders: [],
    setOrders: (orders) => set({orders}),
    setCompletedOrders: (completedOrders) => set({completedOrders}),
    loadingOrders: false,
    setLoadingOrders: (loadingOrders) => set({loadingOrders}),
    getOngoingOrders: async(token:string) => {
        set({loadingOrders: true});
        try{
            const orders = await ApiManager("/auth/ongoingOrders",{
                method:"GET",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            console.log(orders.data);
            set({orders:orders.data});
        }catch(error){
            throw error;
        }
    },
    getCompletedOrders: async(token:string) => {
        set({loadingOrders: true});
        try{
            const orders = await ApiManager("/auth/completedOrders",{
                method:"GET",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            set({completedOrders:orders.data});
        }catch(error){
            throw error;
        }
    }
}));