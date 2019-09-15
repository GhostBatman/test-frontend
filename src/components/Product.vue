<template>
    <div class="product"
         @click="productClickHandle">
        <div class="product__name">
            <span>
                {{ product.name }}{{ `(${product.quantity})` }}
            </span>
        </div>
        <div
            class="product__price"
            :class="[rateTrend]"
        >
            <span>
                {{ convertedPrice }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    data: () => ({
        rateTrend: 'normal'
    }),
    computed: {
        convertedPrice() {
            return (this.product.price * this.rate).toFixed(2);
        },
        ...mapGetters(['rate'])
    },
    watch: {
        rate(newRate, oldRate) {
            this.rateTrend = newRate > oldRate ? 'up' : newRate < oldRate ? 'down' : 'normal';
        }
    },
    methods: {
        productClickHandle() {
            this.$store.commit('addToCart', this.product);
        }
    }
};
</script>

<style scoped lang="scss">
.product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        background-color: lightcyan;
    }

    &:not(:last-child) {
        border-bottom: 1px solid lightgray;
    }

    &__name {
        text-align: left;
        padding: 10px;
    }

    &__price {
        width: 100px;
        min-height: 100%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: lightblue;
        transition: all .3s linear;
        font-weight: bold;
        padding: 10px 0;

        &.up {
            background-color: lightcoral;
        }

        &.down {
            background-color: lightgreen;
        }
    }
}
</style>