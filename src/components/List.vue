<template>
    <div class="list">
        <h2 class="list__title">Товары</h2>
        <div class="list__items">
            <list-group
                v-for="group in groups"
                :key="group[0]"
                :group="group"
            />
        </div>
    </div>
</template>

<script>
import names from '../js/names';
import ListGroup from './ListGroup';

export default {
    name: 'List',
    components: { ListGroup },
    data: () => ({
        baseUrl: process.env.VUE_APP_BASE_URL,
        names: names,
        timer: {}
    }),
    created() {
        this.fetchData();
        this.updateRate(61);
    },
    mounted() {
        this.timer = setInterval(() => {
            const rate = Math.random() * 60 + 20;
            this.updateRate(rate);
            this.fetchData();
        }, 15000);
    },
    methods: {
        updateRate(rate) {
            this.$store.commit('updateRate', rate);
        },
        fetchData() {
            this.$store.dispatch('fetchData');
        }
    },
    computed: {
        groups() {
            return Object.entries(this.names);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
.list {
    display: flex;
    flex-direction: column;

    &__title {
        text-align: left;
    }

    &__items {
        flex-wrap: wrap;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
}
</style>