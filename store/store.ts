import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BasketItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    items: {
        id: string;
        color: string;
        image: string;
    }
}

interface BasketState {
    items: BasketItem[];
    /**
     * Timestamp (ms since epoch) when the basket expires.
     * Used only for persistence; not read by UI components.
     */
    expiresAt: number | null;
    addItem: (item: BasketItem) => void;
    removeItem: (id: string) => void;
    removeItemCompletely: (id: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (id: string) => number;
    getGroupedItems: () => Record<string, BasketItem[]>;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            expiresAt: null,
            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    const expiresAt = Date.now() + ONE_DAY_MS;

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                            expiresAt,
                        };
                    }

                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                        expiresAt,
                    };
                }),
            removeItem: (id) =>
                set((state) => {
                    const items = state.items
                        .map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0);

                    return {
                        items,
                        expiresAt: items.length > 0 ? Date.now() + ONE_DAY_MS : null,
                    };
                }),
            removeItemCompletely: (id) =>
                set((state) => {
                    const items = state.items.filter((item) => item.id !== id);

                    return {
                        items,
                        expiresAt: items.length > 0 ? Date.now() + ONE_DAY_MS : null,
                    };
                }),
            clearBasket: () => set({ items: [], expiresAt: null }),
            getTotalPrice: () =>
                get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
            getItemCount: (id) =>
                get()
                    .items.filter((item) => item.id === id)
                    .reduce((count, item) => count + item.quantity, 0),
            getGroupedItems: () =>
                get().items.reduce((acc, item) => {
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
            storage: createJSONStorage(() => {
                if (typeof window === 'undefined') {
                    // No-op storage on the server; actual persistence happens in the browser.
                    const noopStorage: Storage = {
                        length: 0,
                        clear: () => { },
                        getItem: (_key: string) => null,
                        key: (_index: number) => null,
                        removeItem: (_key: string) => { },
                        setItem: (_key: string, _value: string) => { },
                    };
                    return noopStorage;
                }
                return window.localStorage;
            }),
            // Clear basket if persisted data is older than one day.
            merge: (persistedState, currentState) => {
                const persisted = persistedState as BasketState | undefined;

                if (!persisted || persisted.expiresAt == null) {
                    return { ...currentState, items: [], expiresAt: null };
                }

                const isExpired = Date.now() > persisted.expiresAt;

                if (isExpired) {
                    return { ...currentState, items: [], expiresAt: null };
                }

                return { ...currentState, ...persisted };
            },
        }
    )
);

export default useBasketStore;