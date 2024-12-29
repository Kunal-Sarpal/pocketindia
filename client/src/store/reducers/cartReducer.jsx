import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], // Stores all items in the cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (existingItem) {
                // If item already exists, update its quantity
                existingItem.quantity += 1;
            } else {
                // Add new item to cart with a quantity of 1
                state.cartItems.push({ ...newItem, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
