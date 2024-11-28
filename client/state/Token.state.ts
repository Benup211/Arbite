import {create} from 'zustand';

interface TokenState {
    token: string;
    setToken: (token: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    adminToken: string;
    setAdminToken: (adminToken: string) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
    token: '',
    setToken: (token) => set({token}),
    loading: true,
    setLoading: (loading) => set({loading}),
    adminToken: '',
    setAdminToken: (adminToken) => set({adminToken}),
}));