import {create} from 'zustand';
import ApiManager from '../api/ApiManager';

export interface RestaurantProps {
    restaurant_id: number;
    name: string;
    phone_no: string;
    menu_image: string;
    location: string;
}

interface RestaurantState {
    restaurants: RestaurantProps[];
    setRestaurants: (restaurants: RestaurantProps[]) => void;
    loadingRestaurants: boolean;
    setLoadingRestaurants: (loadingRestaurants: boolean) => void;
    getRestaurants: () => any;
}

export const useRestaurantStore = create<RestaurantState>((set)=>({
    restaurants: [],
    setRestaurants: (restaurants) => set({restaurants}),
    loadingRestaurants: false,
    setLoadingRestaurants: (loadingRestaurants) => set({loadingRestaurants}),
    getRestaurants: async() => {
        set({loadingRestaurants: true});
        try{
            const restaurants = await ApiManager("/admin/allRestaurants",{
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
    }
}));
