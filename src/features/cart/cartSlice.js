import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            date: new Date().toLocaleString(),
            total: null,
            products: [],
            user: 'userLogged',
            id: 'id'
        }
    },
    reducers: {
        addItem: (state, { payload }) => {

            const productRepetead = state.value.products.find(
                (item) => item.id === payload.id
            )

            if (productRepetead) {

                const itemUpdate = state.value.products.map((item) => {

                    if (item.id === payload.id) {
                        item.quantity += payload.quantity
                        return item
                    }

                    return item
                })

                const total = itemUpdate.reduce(
                    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0
                )

                state.value = {
                    ...state.value, products: itemUpdate, total: total, date: new Date().toLocaleDateString()
                }
            } else {

                state.value.products.push(payload)

                const total = state.value.products.reduce(
                    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0
                )

                state.value = {
                    ...state.value, total: total, date: new Date().toLocaleDateString()
                }
            }
        },
        decreaceItem: (state, { payload })=> {
            const productRepetead = state.value.products.find(
                (item) => item.id === payload.id
            )

            if (productRepetead) {

                const itemUpdate = state.value.products.map((item) => {
                
                    if (item.id === payload.id) {
                        item.quantity -= payload.quantity;
                        return item.quantity > 0 ? item : null;
                    }
                    return item;

                }).filter(item => item !== null);

                const total = itemUpdate.reduce(
                    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0
                );

                state.value = {
                    ...state.value, products: itemUpdate, total: total, date: new Date().toLocaleDateString()
                }
            } 
        },
        removeItem: (state, { payload }) => {

            state.value.products = state.value.products.filter(
                (item) => item.id !== payload.id
            )

            const total = state.value.products.reduce(
                (acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0
            )

            state.value = {
                ...state.value, total: total, date: new Date().toLocaleDateString()
            }
        },
        clearCart: (state) => {
            state.value.total = null;
            state.value.products = [];
        },
    }
})

export const { addItem, decreaceItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer