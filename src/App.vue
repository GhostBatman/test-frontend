<template>
    <div id="app">
        <div class="rate">Курс доллара {{ ` ${rate.toFixed(2)} `}}</div>
        <list />
        <cart />
    </div>
</template>

<script>
import List from './components/List.vue';
import Cart from './components/Cart';
import { mapGetters } from 'vuex';

export default {
    name: 'app',
    components: {
        Cart,
        List
    },
    computed: {
        ...mapGetters(['rate'])
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 40px;

    .rate {
        align-self: flex-end;
    }

}
</style>
