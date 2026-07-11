import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  orderSuccess: null,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return {
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
      return { items: state.items.filter((i) => i.id !== itemId) };
    });
  },

  clearItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }));
  },

  clearCart: () => set({ items: [], orderSuccess: null }),

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getItemQuantity: (itemId) => {
    const item = get().items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  },

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isCheckoutOpen: false })),
  openCart: () => set({ isCartOpen: true, isCheckoutOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  setOrderSuccess: (order) => set({ orderSuccess: order, isCheckoutOpen: false, items: [] }),
  clearOrderSuccess: () => set({ orderSuccess: null }),
}));

export default useCartStore;
