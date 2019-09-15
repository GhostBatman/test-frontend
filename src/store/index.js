import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = () => new Vuex.Store({

    state: {
        data: [],
        rate: 1,
        cart: []
    },
    getters: {
        totalPrice: state => {
            return state.cart.reduce((acc, { quantity, product }) => {
                return acc + (quantity * product.price * state.rate);
            }, 0);
        },
        cart: state => {
            return state.cart;
        },
        rate: state => {
            return state.rate;
        },
        getGoods: state => {
            if (state.data.Value) {
                return [...state.data.Value.Goods];
            }
            return [];
        }
    },
    mutations: {
        deleteCartItem(state, payload) {
            const index = state.cart.findIndex(({ product }) => product.id === payload);
            state.cart.splice(index, 1);
        },
        updateQuantity(state, { quantity, id }) {
            const cartItem = state.cart.find(({ product }) => product.id === id);
            cartItem.quantity = quantity;
        },
        addToCart(state, payload) {
            const cartItem = state.cart.find(({ product }) => product.id === payload.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                state.cart.push({
                    quantity: 1,
                    product: payload
                });
            }
        },
        updateData(state, payload) {
            state.data = payload;
        },
        updateRate(state, payload) {
            state.rate = payload;
        },
    },
    actions: {
        fetchData({ commit }) {
            axios.get('data.json')
                .then(response => {
                    commit('updateData', response.data);
                });
        }
    },
});

