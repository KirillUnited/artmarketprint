import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BasketItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
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
        addItem: (item) => set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    )
                };
            }

            return { items: [...state.items, item] };
        }),
        removeItem: (id) => set((state) => {
            return { items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0) }
        }),
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