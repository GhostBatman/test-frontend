<template>
    <tr class="cart-item">
        <td class="cart-item__name">{{ item.name }}</td>
        <td class="cart-item__quantity">
            <input
                type="number"
                min="1"
                :value="quantity"
                @change="onQuantityChange" />
        </td>
        <td class="cart-item__price">{{ totalPrice }}</td>
        <td class="cart-item__delete">
            <button @click="deleteClickHandle">Удалить</button>
        </td>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CartItem',
    props: {
        item: { type: Object },
        quantity: { type: Number, default: () => (1) }
    },
    computed: {
        totalPrice() {
            return (this.item.price * this.quantity * this.rate).toFixed(2);
        },
        ...mapGetters(['rate'])
    },
    methods: {
        onQuantityChange(e) {
            const value = parseInt(e.target.value);
            this.$store.commit('updateQuantity', { quantity: value, id: this.item.id });
        },
        deleteClickHandle() {
            this.$store.commit('deleteCartItem', this.item.id);
        }
    }
};
</script>

<style scoped lang="scss">
.cart-item {
    margin-bottom: 30px;

    td {
        padding: 0 10px;
    }

    &__delete {
        button {
            border: none;
            background-color: lightcoral;
            transition: all .3s ease;
            cursor: pointer;
            height: 30px;
            width: 80px;
            border-radius: 3px;

            &:hover {
                background-color: #F05741;
            }
        }
    }

    &__name {
        width: 300px;
    }

    &__quantity {
        input {
            width: 100px;
        }
    }

    &__price {
        width: 100px;
    }
}

</style>