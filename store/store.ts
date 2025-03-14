import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BasketItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface BasketState {
    items: BasketItem[];
    addItem: (item: BasketItem) => void;
    removeItem: (id: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (id: string) => number;
    getGroupedItems: () => Record<string, BasketItem[]>;
}

const useBasketStore = create<BasketState>()(
    persist((set, get) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
        clearBasket: () => set({ items: [] }),
        getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        getItemCount: (id) => get().items.filter((item) => item.id === id).reduce((count, item) => count + item.quantity, 0),
        getGroupedItems: () => get().items.reduce((acc, item) => {
            const key = item.id;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, BasketItem[]>),
    }),
        {
            name: 'basket-store',
        }
    )
);

export default useBasketStore;