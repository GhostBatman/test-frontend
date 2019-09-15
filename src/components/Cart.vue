<template>
    <div class="cart" v-if="cart.length">
        <h2 class="cart__title">Корзина</h2>
        <div class="cart__items">
            <table>
                <thead>
                    <tr>
                        <th>Имя товар</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <cart-item
                        v-for="{product, quantity} in cart"
                        :key="product.id"
                        :item="product"
                        :quantity="quantity"
                    />
                </tbody>
            </table>
        </div>
        <div class="cart__total">Общая стоимость: {{ totalPrice.toFixed(2) }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from './CartItem';

export default {
    name: 'Cart',
    components: { CartItem },
    computed: {
        ...mapGetters(['cart', 'totalPrice'])
    }
};
</script>

<style scoped lang="scss">
.cart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    th {
        padding: 0 10px;
    }

    &__total {
        margin-left: auto;
    }

    &__items {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 20px;

        table {
            border-collapse:separate;
            border-spacing: 0 10px;
        }
    }
}
</style>