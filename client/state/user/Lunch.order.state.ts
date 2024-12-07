import { create } from "zustand";
import ApiManager from "../../api/ApiManager";

interface User {
    username: string;
}

interface LunchOrder {
    lunchOrder: string;
    tea: boolean;
    user: User;
}

interface LunchOrderState {
    Lunchorders: LunchOrder[];
    completeLunchOrders: LunchOrder[];
    loadingCompleteLunchOrders: boolean;
    setLoadingCompleteLunchOrders: (
        loadingCompleteLunchOrders: boolean
    ) => void;
    loadingLunchOrders: boolean;
    completingOrder: boolean;
    setCompletingOrder: (completingOrder: boolean) => void;
    setLoadingLunchOrders: (loadingLunchOrders: boolean) => void;
    addLunchOrder: (order: LunchOrder) => void;

    getLunchOrders: (token: string, order_id: number) => any;
    getCompleteOrders: (token: string, order_id: number) => any;
    completeOrder: (token: string, order_id: number) => any;

    addOrderLunch: (
        token: string,
        order_id: number,
        tea: boolean,
        lunchOrder: string
    ) => any;
    loadingAddOrder: boolean;
    setLoadingAddOrder: (loadingAddOrder: boolean) => void;
}

const useLunchOrderStore = create<LunchOrderState>((set) => ({
    Lunchorders: [],
    completeLunchOrders: [],
    loadingCompleteLunchOrders: false,
    loadingAddOrder: false,
    setLoadingAddOrder: (loadingAddOrder) => set({ loadingAddOrder }),
    setLoadingCompleteLunchOrders: (loadingCompleteLunchOrders) =>
        set({ loadingCompleteLunchOrders }),
    loadingLunchOrders: false,
    setLoadingLunchOrders: (loadingLunchOrders) => set({ loadingLunchOrders }),
    addLunchOrder: (order) =>
        set((state) => ({ Lunchorders: [...state.Lunchorders, order] })),
    completingOrder: false,
    setCompletingOrder: (completingOrder) => set({ completingOrder }),
    getLunchOrders: async (token: string, order_id: number) => {
        set({ loadingLunchOrders: true });
        try {
            const orders = await ApiManager("/auth/lunchOrders", {
                method: "POST",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    order_id: order_id,
                }),
            });
            set({ Lunchorders: orders.data });
        } catch (error) {
            throw error;
        }
    },

    completeOrder: async (token: string, order_id: number) => {
        set({ completingOrder: true });
        try {
            await ApiManager("/auth/completeOrder", {
                method: "POST",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    order_id: order_id,
                }),
            });
        } catch (error) {
            throw error;
        }
    },
    getCompleteOrders: async (token: string, order_id: number) => {
        set({ loadingCompleteLunchOrders: true });
        try {
            const orders = await ApiManager("/auth/lunchOrders", {
                method: "POST",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    order_id: order_id,
                }),
            });
            set({ completeLunchOrders: orders.data });
        } catch (error) {
            throw error;
        }
    },
    addOrderLunch: async (
        token: string,
        order_id: number,
        tea: boolean,
        lunchOrder: string
    ) => {
        try {
            await ApiManager("/auth/addOrder", {
                method: "POST",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    order_id: order_id,
                    tea: tea,
                    lunchOrder: lunchOrder,
                }),
            });
        } catch (error) {
            throw error;
        }
    },
}));

export default useLunchOrderStore;
