import {create} from 'zustand';
import ApiManager from '../../api/ApiManager';

interface Restaurant {
    restaurant_id: number;
    name: string;
}

interface OrderRestaurantState{
    restaurants: Restaurant[];
    setRestaurants: (restaurants: Restaurant[]) => void;
    loadingRestaurants: boolean;
    setLoadingRestaurants: (loadingRestaurants: boolean) => void;
    getRestaurants: () => any;
    createOrderByRestaurant: (token:string, restaurant_id:number) => any;
}

export const useAddingRestaurantStore = create<OrderRestaurantState>((set)=>({
    restaurants: [],
    setRestaurants: (restaurants) => set({restaurants}),
    loadingRestaurants: false,
    setLoadingRestaurants: (loadingRestaurants) => set({loadingRestaurants}),
    getRestaurants: async() => {
        set({loadingRestaurants: true});
        try{
            const restaurants = await ApiManager("/auth/allRestaurant",{
                method:"GET",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                }
            });
            set({restaurants:restaurants.data});
        }catch(error){
            throw error;
        }
    },
    createOrderByRestaurant: async(token:string, restaurant_id:number) => {
        set({loadingRestaurants: true});
        try{
            const orders = await ApiManager("/auth/createOrder",{
                method:"POST",
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                data:{
                    restaurant_id
                }
            });
            set({loadingRestaurants:false});
        }catch(error){
            throw error;
        }
    }
}));