<template>
    <div class="group" v-if="products.length">
        <div class="group__name">{{ groupName }}</div>
        <product
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script>
import { ProductModel } from '../models/ProductModel';
import Product from './Product';
import { mapGetters } from 'vuex';

export default {
    name: 'ListGroup',
    components: { Product },
    props: {
        group: {
            type: Array
        }
    },
    computed: {
        items() {
            return this.group[1];
        },
        id() {
            return parseInt(this.group[0], 10);
        },
        groupName() {
            return this.items.G;
        },
        groupItems() {
            return this.items.B;
        },
        goods() {
            return this.getGoods.filter(item => item.G === this.id);
        },
        products() {
            return this.createProduct(this.goods, this.groupItems);
        },
        ...mapGetters(['getGoods'])
    },
    methods: {
        createProduct(goods, items) {
            return goods.map(item => {
                const matchedProduct = items[item.T];
                const product = new ProductModel;
                if (matchedProduct) {
                    product.name = matchedProduct.N;
                }
                product.quantity = item.P;
                product.id = item.T;
                product.price = item.C;
                return product;
            });
        }
    }
};
</script>

<style scoped lang="scss">
.group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    width: 45%;
    border-radius: 4px;
    border: 1px solid lightgray;
    overflow: hidden;

    &__name {
        font-size: 16px;
        padding: 10px;
        font-weight: bold;
        line-height: 20px;
        background-color: lightgray;
        width: 100%;
        text-align: left;
    }
}
</style>